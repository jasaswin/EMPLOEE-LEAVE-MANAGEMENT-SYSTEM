
import { Paper, Typography, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../services/api";

const LeaveBalance = () => {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    api.get("/leave/balance").then((res) => {
      setBalance(res.data);
    });
  }, []);

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Leave Balance
      </Typography>

      {balance ? (
        <Stack spacing={1}>
          <Typography>Vacation: {balance.vacation} days</Typography>
          <Typography>Sick: {balance.sick} days</Typography>
        </Stack>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Paper>
  );
};

export default LeaveBalance;
