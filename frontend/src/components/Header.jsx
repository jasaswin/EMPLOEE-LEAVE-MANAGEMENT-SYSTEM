


import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/header.css";

const Header = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, role, logout } = useAuth();

  return (
    <>
      <AppBar position="sticky" elevation={0} className="header">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          
          
          <Typography
            variant="h5"
            className="logo"
            onClick={() => navigate("/")}
          >
            LeaveZen
          </Typography>

          
          <Box>
            {!isAuthenticated && (
              <>
                <Button color="secondary" onClick={() => navigate("/signup")}>
                  Signup
                </Button>
                <Button color="secondary" onClick={() => navigate("/login")}>
                  Login
                </Button>
              </>
            )}


            <IconButton onClick={() => setOpen(true)}>
              <MenuIcon sx={{ color: "secondary.main" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 250 }}>
          <List>
            {role === "EMPLOYEE" && (
              <ListItem button onClick={() => navigate("/employee")}>
                <ListItemText primary="Employee Dashboard" />
              </ListItem>
            )}

            {role === "MANAGER" && (
              <ListItem button onClick={() => navigate("/manager")}>
                <ListItemText primary="Manager Dashboard" />
              </ListItem>
            )}

            {isAuthenticated && (
              <ListItem button onClick={() => navigate("/calendar")}>
                <ListItemText primary="Leave Calendar" />
              </ListItem>
            )}

            {isAuthenticated && (
              <ListItem
                button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                <ListItemText primary="Logout" />
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
