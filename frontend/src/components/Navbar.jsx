import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";

function Navbar() {
  const [user, setUser] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:8000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  console.log(user, "user");
  const logout = () => {
    window.open("http://localhost:8000/auth/logout", "_self");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Practice project
          </Typography>
          {user === null ? (
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
            </Button>
          ) : (
            <Box gap="12px" display="flex" alignItems="center">
              <Avatar src={user?.photos[0].value} />
              <Typography variant="h6">{user.displayName}</Typography>
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
