import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/userSlice";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  React.useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  });

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
          dispatch(
            setUser({
              username: resObject.user.displayName,
            })
          );
          console.log(resObject.user, "user");
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

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
              <Avatar />
              {/* src={user?.photos[0].value} */}
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
