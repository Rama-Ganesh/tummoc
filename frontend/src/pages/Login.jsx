import {
  Button,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const google = () => {
    window.open("http://localhost:8000/auth/google", "_self");
  };

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
      onSubmit={(values) => {
        axios
          .post("http://localhost:8000/api/users/login", values, {
            headers: {
              "Content-type": "application/json",
            },
          })
          .then((res) => {
            console.log(res)
            dispatch(setUser(res.data));
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
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={2} maxWidth="450px" sx={{ margin: "auto" }}>
            <Grid item xs={12}>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="username"
                label="Email Address"
                name="username"
                required
                fullWidth
                autoFocus
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
                Sign In
              </Button>
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
      )}
    </Formik>
  );
};

export default Login;
