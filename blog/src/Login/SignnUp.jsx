import React, { useState } from "react";
import {
  Card,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { signUp } from "../Services/user-service";
import Nav_bar from "../Header/Nav_bar";
function SignnUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
   const navigate = useNavigate();
  const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
          name,
          email,
          password,
          about
        };
        console.log(data);
        signUp(data)
          .then((resp) => {
            console.log(resp);
            console.log("Success log");
            toast.success("User is registered successfully please start loging");
            setTimeout(() => navigate("/sign-in"), 2000);
            setEmail("");
            setAbout("");
            setName("");
            setPassword("");
          })
          .catch((error) => {
            console.log(error);
            console.log("Error");
            toast.error("Something went wrong! Please try again.");
          });
      };
  
  return (
   <div>
    <Nav_bar/>
     <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-[28rem] p-8 shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Sign Up
        </h2>
        <p className="text-center font-semibold text-gray-500 mb-6">
          Create a new account to get started!
        </p>

        <div className="w-[24rem] mx-auto">
          <form className="flex flex-col gap-5 mx-auto">
          
          <TextField
            label="Full Name"
            type="text"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
       

       
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
      

       
          <TextField
            label="About You (Optional)"
            type="text"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
       

       
          <FormControlLabel
            control={<Checkbox />}
            label="I agree to the Terms & Conditions"
          />
      

        <Button
          variant="contained"
          color="primary"
          fullWidth
          className="mb-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          onClick={handleSubmit}
       >
          Sign Up
        </Button>
          </form>
        </div>

        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <a href="sign-in" className="text-blue-500">
            Sign in
          </a>
        </p>
      </Card>
        <ToastContainer position="top-right" autoClose={3000} />
    </div>
   </div>
  );
}

export default SignnUp;
