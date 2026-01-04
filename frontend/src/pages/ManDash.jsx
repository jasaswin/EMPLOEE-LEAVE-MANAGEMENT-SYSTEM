

import { Box, Typography } from "@mui/material";
import Header from "../components/Header";
import PendingLeaves from "../components/PendingLeaves";

const ManDash = () => {
  return (
    <>
      <Header />

      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Manager Dashboard
        </Typography>

        <PendingLeaves />
      </Box>
    </>
  );
};

export default ManDash;
