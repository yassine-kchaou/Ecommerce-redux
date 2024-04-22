// import React from 'react'
// import { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {resetPass} from "../services/Authservice";

// function ResetPassword() {
// const [password, setPassword] = useState()
// const navigate = useNavigate()

// const {id, token} = useParams()
// const handleSubmit = async (e) => {
// e.preventDefault()
// await resetPass(id,token,password)
// .then(res => {
// if(res.data.Status === "Success") {
// navigate('/login')
// }
// }).catch(err => console.log(err))
// }
// return(

// <div className="d-flex justify-content-center align-items-center bg-
// secondary vh-100">

// <div className="bg-white p-3 rounded w-25">
// <h4>Reset Password</h4>
// <form onSubmit={handleSubmit}>
// <div className="mb-3">
// <label htmlFor="email">
// <strong>New Password</strong>
// </label>
// <input
// type="password"
// placeholder="Enter Password"
// autoComplete="off"
// name="password"
// className="form-control rounded-0"
// onChange={(e) => setPassword(e.target.value)}
// />
// </div>
// <button type="submit" className="btn btn-success w-100 rounded-0">
// Update
// </button>
// </form>
// </div>
// </div>
// )
// }
// export default ResetPassword;
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Link from "@mui/material/Link";

import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {resetPass} from "../services/Authservice";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "react-bootstrap";
function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }
  const defaultTheme = createTheme();
  

const ResetPassword = () => {
    const [password, setPassword] = useState()
const navigate = useNavigate()

const {id, token} = useParams()
const handleSubmit = async (e) => {
e.preventDefault()
await resetPass(id,token,password)
.then(res => {
if(res.data.Status === "Success") {
navigate('/login')
}
}).catch(err => console.log(err))
}
  return (
    <ThemeProvider theme={defaultTheme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
        New Password
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={(event) => handleSubmit(event)}
          >
            Update
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  </ThemeProvider>
  )
}

export default ResetPassword
