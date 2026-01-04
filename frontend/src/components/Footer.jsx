
import { Box, Typography } from "@mui/material";
import "../styles/footer.css";


const Footer = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 2,
        borderTop: "1px solid #333",
      }}
    >
      

      <div className="footer">
  © 2026 LeaveZen — Smart Leave Management
</div>

    </Box>
  );
};

export default Footer;
