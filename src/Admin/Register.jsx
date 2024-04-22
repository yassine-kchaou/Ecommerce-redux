import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/AuthSlice";
import { useState } from "react";
// import { buildFormData } from "../utils/ConvertFormData";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import axios from "axios";

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

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();
const Register = () => {
  const [file, setFile] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const { user, isSuccess, isError } = useSelector((state) => state.auth);
  const [avatar, setAvatar] = useState();
  const [errorPassword, setErrorPassword] = useState();
  const [errorPassword2, setErrorPassword2] = useState();
  const [errorFirstName,setErrorFirstName] = useState()
  const [errorLastName,setErrorLastName] = useState()
  const [erroremail, setErroremail] = useState();
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length > 0; // Check for both format and emptiness
  };
  
  const validatePassword = (password) => {
    return password.length >= 8; // Enforce minimum password length
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    let hasError = false;
    if (!firstName){
      hasError = true
      setErrorFirstName('Enter First Name')
    }else{
      setErrorFirstName('')
      
    }
    if (!lastName){
      hasError = true
      setErrorLastName('Enter Last Name')
    }else{
      setErrorLastName('')
      
    }

    if (!validateEmail(email)) {
      setErroremail('Invalid email format');
      hasError = true;
    } else {
      setErroremail(''); // Clear error if valid
    }
  
    if (!validatePassword(password)) {
      setErrorPassword('Password must be at least 8 characters long');
      setErrorPassword2('Password must be at least 8 characters long')
      hasError = true;}
      else{
        setErrorPassword('')
      }
      if(password !== password2 ){
setErrorPassword2('Password do not match')
hasError=true
    }
     if (hasError == false) {
      console.log(avatar);
      const userData = {
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password,
        avatar: avatar,
      };
      dispatch(register(userData));
      navigate("/login");
    }
  };
  // hanlde upload

  // server options
  const serverOptions = () => {
    console.log("server pond");
    return {
      load: (source, load, error, progress, abort, headers) => {
        var myRequest = new Request(source);
        fetch(myRequest).then(function (response) {
          response.blob().then(function (myBlob) {
            load(myBlob);
          });
        });
      },
      process: (fieldName, file, metadata, load, error, progress, abort) => {
        console.log(file);
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "firstuse");
        data.append("cloud_name", "dliykgknn");
        data.append("public_id", file.name);

        axios
          .post("https://api.cloudinary.com/v1_1/dliykgknn/image/upload", data)

          .then((response) => response.data)
          .then((data) => {
            console.log(data);
            setAvatar(data.url);
            load(data);
          })
          .catch((error) => {
            console.error("Error uploading file:", error);
            error("Upload failed");
            abort();
          });
      },
    };
  };
  //result handle upload
 

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
            Sign up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  helperText={errorFirstName}
              error={!!errorFirstName}
                  onChange={(event) => setFirstName(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  helperText={errorLastName}
              error={!!errorLastName}
                  onChange={(event) => setLastName(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(event) => setEmail(event.target.value)}
                  helperText={erroremail}
              error={!!erroremail}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(event) => setPassword(event.target.value)}
                  helperText={errorPassword}
              error={!!errorPassword}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password2"
                  label="confirm Password"
                  type="password"
                  id="password2"
                  autoComplete="new-password"
                  onChange={(event) => setPassword2(event.target.value)}
                  helperText={errorPassword2}
              error={!!errorPassword2}
                />
              </Grid>
              <Grid item xs={12}>
                <FilePond
                  files={file}
                  allowMultiple={false}
                  onupdatefiles={setFile}
                  labelIdle='<span className="filepond--label-action">BrowseOne</span>'
                  server={serverOptions()}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              // disabled={!firstName || !lastName || !email || !password || !password2 }
              onClick={(event) => handleSubmit(event)}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};

export default Register;
