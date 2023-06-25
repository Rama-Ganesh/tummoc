import { Avatar } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import axios from "axios";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser, setUser } from "../redux/userSlice";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const handleLogout = async () => {
    window.open("http://localhost:8000/auth/logout", "_self");
    await axios
      .post("http://localhost:8000/api/users/logout", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res, "res");
        dispatch(logoutUser());
      })
      .catch((err) => console.log(err));
  };

  console.log(user, "user");

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
              img: resObject.user.photos[0],
            })
          );
          console.log(resObject.user, "user");
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, [dispatch]);

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
              <Avatar src={user?.img?.value} />
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Box
        margin="auto"
        alignItems="center"
        marginTop="50px"
        maxWidth="sm"
        display="flex"
        flexDirection="column"
        columnGap="12px"
      >
        <Avatar
          src={user?.img?.value}
          sx={{
            height: "150px",
            width: "150px",
          }}
        />
        <Typography variant="h3" sx={{ mt: "50px" }}>
          {user?.username}
        </Typography>
      </Box>
    </Box>
  );
}

export default Navbar;
