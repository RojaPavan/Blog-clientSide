import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async (type = "login") => {
    const res = await axios
      .post(`https://long-erin-abalone-hose.cyclic.cloud/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    console.log(data);
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    if (isSignUp) {
      sendRequest("signup")
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"));
    } else {
      sendRequest()
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"));
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Box
        display="flex"
        flexDirection={"column"}
        alignItems="center"
        justifyContent={"center"}
        boxShadow="10px 10px 20px grey"
        padding={3}
        margin="auto"
        marginTop={5}
        borderRadius={5}
        maxWidth={400}
      >
        <Typography variant="h2">{isSignUp ? "SignUp" : "Login"}</Typography>
        {isSignUp && (
          <TextField
            onChange={handleChange}
            name="name"
            value={inputs.name}
            placeholder="Name"
            margin="normal"
            padding={3}
            textAlign="center"
          />
        )}{" "}
        <TextField
          onChange={handleChange}
          name="email"
          value={inputs.email}
          type={"email"}
          placeholder="Email"
          margin="normal"
        />
        <TextField
          onChange={handleChange}
          value={inputs.password}
          name="password"
          type={"password"}
          placeholder="Password"
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ borderRadius: 3, marginTop: 3 }}
          color="warning"
        >
          Submit
        </Button>
        <Button
          onClick={() => setIsSignUp(!isSignUp)}
          sx={{ borderRadius: 3, marginTop: 3 }}
        >
          Change to {isSignUp ? "Login" : "Signup"}
        </Button>
      </Box>
    </form>
  );
};

export default Login;
