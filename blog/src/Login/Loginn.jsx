import React, { useState } from "react";
import { Card, TextField, Button, Checkbox, FormControlLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { loginUser } from "../Services/user-service";
import { doLogin } from "../Auth";
import Nav_bar from "../Header/Nav_bar";

function Loginn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      console.log("Backend response:", response);

      doLogin(response);

      toast.success("User logged in successfully");
      navigate("/user/user-dashboard");
    } catch (error) {
      if (error.response?.status === 400 || error.response?.status === 404) {
        toast.error("Invalid Email or Password");
      } else {
        toast.error("Something went wrong! Please try again.");
      }
      console.log(error);
    }
  };

  return (
    <div>
      <Nav_bar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Card className="w-[26rem] p-8 shadow-xl">
          <h2 className="text-3xl font-bold text-center text-gray-800">Sign In</h2>
          <p className="text-center font-semibold text-gray-500 mb-6">
            Welcome back! Please sign in to continue.
          </p>
          <div className="w-[22rem] mx-auto">
            <div className="flex flex-col gap-5 mx-auto">
              <TextField
                label="Email Address"
                type="email"
                fullWidth
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex justify-start pr-40">
                <FormControlLabel control={<Checkbox />} label="Remember me" />
              </div>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                className="mb-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                onClick={handleSubmit}
              >
                Sign In
              </Button>
            </div>
            <p className="text-center text-gray-600">
              Don't have an account? <a href="/sign-up" className="text-blue-500">Sign up</a>
            </p>
          </div>
        </Card>
        <ToastContainer position="bottom-center" autoClose={3000} />
      </div>
    </div>
  );
}

export default Loginn;
