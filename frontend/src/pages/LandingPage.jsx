
import { Box, Typography, Paper, Fade } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";

import { useState, useEffect } from "react";

import "../styles/landing.css";

const LandingPage = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <>
      <Header />

      <Fade in={show} timeout={1200}>
        <Box
          sx={{
            minHeight: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 4,
          }}
        >
          <Paper
            sx={{
              p: 5,
              maxWidth: 700,
              textAlign: "center",
            }}
          >
          

            <div className="landing-wrapper">
  <div className="landing-card">
    <h1 className="landing-title">LeaveZen</h1>
    <p className="landing-text">
      A calm, transparent, and intelligent way to manage employee leave —
      built for clarity, trust, and efficiency.
    </p>
  </div>
</div>


            <Typography variant="body1" color="text.secondary">
              Employees request leave effortlessly. Managers approve with
              confidence. Everyone stays informed with a shared leave calendar.
            </Typography>
          </Paper>
        </Box>
      </Fade>

      <Footer />
    </>
  );
};

export default LandingPage;
