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
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

const Register = () => {
  const navigate = useNavigate();
  const defaultTheme = createTheme();

  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
        img: "",
        city: "",
        phone: "",
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string().required("Username is required"),
        email: Yup.string().required("Email address is required"),
        password: Yup.string().required("password is required"),
        img: Yup.string().required("Photo is required"),
        city: Yup.string().required("City is required"),
        phone: Yup.string().required("Phone is required"),
      })}
      onSubmit={async (values) => {
        try {
          let formData = new FormData();
          formData.append("file", values.img);
          await axios
            .post("http://localhost:8000/api/upload", formData, {
              headers: {
                "Content-type": "multipart/form-data",
              },
            })
            .then((res) =>
              axios
                .post(
                  "http://localhost:8000/api/cities/create",
                  {
                    city: values.city,
                  },
                  {
                    headers: {
                      "Content-type": "application/json",
                    },
                  }
                )
                .then((res) => {
                  console.log(res);
                  axios
                    .post("http://localhost:8000/api/users/register", values, {
                      headers: {
                        "Content-type": "application/json",
                      },
                    })
                    .then((res) => {
                      console.log(res, "res");
                      navigate("/login");
                    })
                    .catch((err) => console.log(err));
                })
                .catch((err) => console.log(err))
            );
        } catch (error) {
          console.log(error);
        }

        console.log(values.img);
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        touched,
        values,
        setFieldValue,
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
                    label="Username"
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
                    id="email"
                    label="Email Address"
                    name="email"
                    required
                    fullWidth
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(
                      touched.email && errors.email && (
                        <FormHelperText error id="email-helper-text">
                          {errors.email}
                        </FormHelperText>
                      )
                    )}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="email-helper-text">
                      {errors.email}
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
                  <TextField
                    id="img"
                    placeholder="img"
                    name="img"
                    type="file"
                    required
                    fullWidth
                    onBlur={handleBlur}
                    onChange={(e) => {
                      setFieldValue("img", e.target.files[0]);
                    }}
                    error={Boolean(
                      touched.img && errors.img && (
                        <FormHelperText error id="img-helper-text">
                          {errors.img}
                        </FormHelperText>
                      )
                    )}
                  />
                  {touched.img && errors.img && (
                    <FormHelperText error id="img-helper-text">
                      {errors.img}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="city"
                    label="city"
                    name="city"
                    required
                    fullWidth
                    value={values.city}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(
                      touched.city && errors.city && (
                        <FormHelperText error id="city-helper-text">
                          {errors.city}
                        </FormHelperText>
                      )
                    )}
                  />
                  {touched.city && errors.city && (
                    <FormHelperText error id="city-helper-text">
                      {errors.city}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="phone"
                    label="phone"
                    name="phone"
                    required
                    fullWidth
                    value={values.phone}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(
                      touched.phone && errors.phone && (
                        <FormHelperText error id="phone-helper-text">
                          {errors.phone}
                        </FormHelperText>
                      )
                    )}
                  />
                  {touched.phone && errors.phone && (
                    <FormHelperText error id="phone-helper-text">
                      {errors.phone}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" fullWidth variant="contained">
                    Register
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
                    Already have an account ? &nbsp;
                    <Link
                      to="/login"
                      variant="body2"
                      style={{ textDecoration: "none" }}
                    >
                      Login
                    </Link>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Container>
        </ThemeProvider>
      )}
    </Formik>
  );
};

export default Register;
