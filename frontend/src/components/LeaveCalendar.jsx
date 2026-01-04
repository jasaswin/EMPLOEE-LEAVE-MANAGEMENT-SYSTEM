
import {
  Paper,
  Typography,
  Grid,
  Chip,
  Stack,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import api from "../services/api";
import dayjs from "dayjs";

const LeaveCalendar = () => {
  const [leaves, setLeaves] = useState([]);

  const today = dayjs();

  useEffect(() => {
    api.get("/leave/calendar").then((res) => {
      setLeaves(res.data);
    });
  }, []);

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Employee Leave Availability
      </Typography>

      {leaves.length === 0 && (
        <Typography>No employees are on leave currently.</Typography>
      )}

      <Grid container spacing={2}>
        {leaves.map((leave) => {
          const isOnLeave =
            today.isAfter(dayjs(leave.startDate).subtract(1, "day")) &&
            today.isBefore(dayjs(leave.endDate).add(1, "day"));

          return (
            <Grid item xs={12} md={6} key={leave._id}>
              <Paper
                sx={{
                  p: 2,
                  borderLeft: `6px solid ${
                    isOnLeave ? "#e53935" : "#43a047"
                  }`,
                }}
              >
                <Stack spacing={1}>
                  <Typography>
                    👤 <strong>{leave.userId.name}</strong>
                  </Typography>

                  <Typography>
                    📅 {dayjs(leave.startDate).format("DD MMM YYYY")} →{" "}
                    {dayjs(leave.endDate).format("DD MMM YYYY")}
                  </Typography>

                  <Box>
                    {isOnLeave ? (
                      <Chip
                        label="ON LEAVE"
                        color="error"
                        sx={{ fontWeight: "bold" }}
                      />
                    ) : (
                      <Chip
                        label="UPCOMING / COMPLETED"
                        color="success"
                        sx={{ fontWeight: "bold" }}
                      />
                    )}
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
};

export default LeaveCalendar;
