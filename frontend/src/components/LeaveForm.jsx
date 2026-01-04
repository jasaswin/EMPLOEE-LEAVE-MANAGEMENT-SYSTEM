
import {
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Stack,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";
import api from "../services/api";
import dayjs from "dayjs";

const LeaveForm = () => {
  const [form, setForm] = useState({
    leaveType: "VACATION",
    startDate: null,
    endDate: null,
    reason: "",
  });

  const [balance, setBalance] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch leave balance
  useEffect(() => {
    api.get("/leave/balance").then((res) => {
      setBalance(res.data);
    });
  }, []);

  // Calculate leave days
  const leaveDays =
    form.startDate && form.endDate
      ? dayjs(form.endDate).diff(dayjs(form.startDate), "day") + 1
      : 0;

  const isBalanceInsufficient =
    (form.leaveType === "VACATION" &&
      balance &&
      leaveDays > balance.vacation) ||
    (form.leaveType === "SICK" &&
      balance &&
      leaveDays > balance.sick);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await api.post("/leave/apply", {
        leaveType: form.leaveType,
        startDate: dayjs(form.startDate).format("YYYY-MM-DD"),
        endDate: dayjs(form.endDate).format("YYYY-MM-DD"),
        reason: form.reason,
      });

      setMessage("Leave request submitted successfully");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to apply leave");
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Apply for Leave
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          {/* Leave Type */}
          <TextField
            select
            label="Leave Type"
            value={form.leaveType}
            onChange={(e) =>
              setForm({ ...form, leaveType: e.target.value })
            }
          >
            <MenuItem value="VACATION">Vacation</MenuItem>
            <MenuItem value="SICK">Sick</MenuItem>
          </TextField>

          {/* Start Date */}
          <DatePicker
            label="Start Date"
            value={form.startDate}
            onChange={(value) =>
              setForm({ ...form, startDate: value })
            }
          />

          {/* End Date */}
          <DatePicker
            label="End Date"
            minDate={form.startDate}
            value={form.endDate}
            onChange={(value) =>
              setForm({ ...form, endDate: value })
            }
          />

          {/* Reason */}
          <TextField
            label="Reason"
            value={form.reason}
            onChange={(e) =>
              setForm({ ...form, reason: e.target.value })
            }
            required
          />

          {/* Leave days info */}
          {leaveDays > 0 && (
            <Typography>
              Total Leave Days: <strong>{leaveDays}</strong>
            </Typography>
          )}

          {/* Balance warning */}
          {isBalanceInsufficient && (
            <Typography color="error">
              Insufficient {form.leaveType.toLowerCase()} leave balance
            </Typography>
          )}

        
          <Button
            type="submit"
            variant="contained"
            disabled={isBalanceInsufficient || leaveDays <= 0}
          >
            Submit Leave
          </Button>

          
          {message && <Typography>{message}</Typography>}
        </Stack>
      </form>
    </Paper>
  );
};

export default LeaveForm;
