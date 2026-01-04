
import { Box, Typography, Grid } from "@mui/material";
import Header from "../components/Header";
import LeaveBalance from "../components/LeaveBalance";
import LeaveForm from "../components/LeaveForm";
import MyLeaves from "../components/MyLeaves";

const EmpDash = () => {
  return (
    <>
      <Header />

      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Employee Dashboard
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <LeaveBalance />
          </Grid>

          <Grid item xs={12} md={8}>
            <LeaveForm />
          </Grid>

          <Grid item xs={12}>
            <MyLeaves />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default EmpDash;
