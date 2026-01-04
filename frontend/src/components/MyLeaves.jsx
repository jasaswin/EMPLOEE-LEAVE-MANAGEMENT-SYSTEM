
import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useEffect, useState } from "react";
import api from "../services/api";

const MyLeaves = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    api.get("/leave/my").then((res) => {
      setLeaves(res.data);
    });
  }, []);

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        My Leave Requests
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {leaves.map((leave) => (
            <TableRow key={leave._id}>
              <TableCell>{leave.leaveType}</TableCell>
              <TableCell>{leave.startDate.slice(0, 10)}</TableCell>
              <TableCell>{leave.endDate.slice(0, 10)}</TableCell>
              <TableCell>{leave.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default MyLeaves;
