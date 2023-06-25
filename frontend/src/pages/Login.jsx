import {
  Box,
  Button,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Container from "@mui/material/Container";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios from "axios";
import { Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { setUser } from "../redux/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const defaultTheme = createTheme();
  const { user } = useSelector((state) => state.user);

  const google = (e) => {
    e.preventDefault();
    window.open("http://localhost:8000/auth/google", "_self");
  };

  React.useEffect(() => {
    if (user !== null) {
      navigate("/");
    }
  });

  console.log(user);

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string().required("Email address is required"),
        password: Yup.string().required("password is required"),
      })}
      onSubmit={async (values) => {
        await axios
          .post(
            "http://localhost:8000/api/users/login",
            values,
            {
              withCredentials: true,
            },
            {
              headers: {
                "Content-type": "application/json",
              },
            }
          )
          .then((res) => {
            console.log(res);
            dispatch(
              setUser({
                username: res.data.username,
                img: {
                  value: res.data.img ? res.data.img : "",
                },
              })
            );
            navigate("/");
          })
          .catch((err) => console.log(err));
        console.log(values);
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        touched,
        values,
      }) => (
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <Grid
                container
                spacing={2}
                sx={{ margin: "auto", alignItems: "center" }}
              >
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography component="h1" variant="h5">
                      Sign in
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="username"
                    label="Email Address"
                    name="username"
                    required
                    fullWidth
                    value={values.username}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(
                      touched.username && errors.username && (
                        <FormHelperText error id="username-helper-text">
                          {errors.username}
                        </FormHelperText>
                      )
                    )}
                  />
                  {touched.username && errors.username && (
                    <FormHelperText error id="username-helper-text">
                      {errors.username}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="password"
                    label="Password"
                    name="password"
                    required
                    fullWidth
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(
                      touched.password && errors.password && (
                        <FormHelperText error id="password-helper-text">
                          {errors.password}
                        </FormHelperText>
                      )
                    )}
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="password-helper-text">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" fullWidth variant="contained">
                    Login
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                    }}
                  >
                    Don't have an account ? &nbsp;
                    <Link
                      to="/register"
                      variant="body2"
                      style={{ textDecoration: "none" }}
                    >
                      Register
                    </Link>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type=""
                    fullWidth
                    color="error"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={google}
                  >
                    Google login
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Container>
        </ThemeProvider>
      )}
    </Formik>
  );
};

export default Login;
