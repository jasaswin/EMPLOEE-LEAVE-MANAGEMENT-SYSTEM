
import { Box, Typography } from "@mui/material";
import Header from "../components/Header";
import LeaveCalendar from "../components/LeaveCalendar";

const CalendarPage = () => {
  return (
    <>
      <Header />

      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Leave Calendar
        </Typography>

        <LeaveCalendar />
      </Box>
    </>
  );
};

export default CalendarPage;
