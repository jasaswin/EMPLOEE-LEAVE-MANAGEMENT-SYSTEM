
import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import api from "../services/api";

const PendingLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [comment, setComment] = useState("");

  const fetchLeaves = () => {
    api.get("/leave/pending").then((res) => {
      setLeaves(res.data);
    });
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleApprove = async (id) => {
    await api.post(`/leave/approve/${id}`, {
      managerComment: comment,
    });
    fetchLeaves();
  };

  const handleReject = async (id) => {
    await api.post(`/leave/reject/${id}`, {
      managerComment: comment,
    });
    fetchLeaves();
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Pending Leave Requests
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Employee</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            <TableCell>Reason</TableCell>
            <TableCell>Comment</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {leaves.map((leave) => (
            <TableRow key={leave._id}>
              <TableCell>{leave.userId.name}</TableCell>
              <TableCell>{leave.leaveType}</TableCell>
              <TableCell>{leave.startDate.slice(0, 10)}</TableCell>
              <TableCell>{leave.endDate.slice(0, 10)}</TableCell>
              <TableCell>{leave.reason}</TableCell>

              <TableCell>
                <TextField
                  size="small"
                  placeholder="Optional comment"
                  onChange={(e) => setComment(e.target.value)}
                />
              </TableCell>

              <TableCell>
                <Button
                  color="success"
                  variant="contained"
                  size="small"
                  sx={{ mr: 1 }}
                  onClick={() => handleApprove(leave._id)}
                >
                  Approve
                </Button>

                <Button
                  color="error"
                  variant="contained"
                  size="small"
                  onClick={() => handleReject(leave._id)}
                >
                  Reject
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {leaves.length === 0 && (
        <Typography sx={{ mt: 2 }}>No pending requests 🎉</Typography>
      )}
    </Paper>
  );
};

export default PendingLeaves;
