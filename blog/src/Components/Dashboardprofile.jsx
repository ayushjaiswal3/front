import React, { useEffect, useState, useRef } from "react";
import { TextField, Button } from "@mui/material";
import { getCurrentUserDetail } from "../Auth";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

function Dashboardprofile() {
  const navigate = useNavigate();
  const currentUser = getCurrentUserDetail() || {};
  const [user, setUser] = useState(currentUser);
  const [email, setEmail] = useState(currentUser.email || "");
  const [name, setName] = useState(currentUser.name || "");
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState("");
  const filePickerRef = useRef();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!currentUser || !currentUser.email) navigate("/sign-in");
  }, [currentUser, navigate]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "16px",
    p: 5,
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("data");
    navigate("/sign-in");
  };

  return (
    <div className="mx-auto p-4 sm:p-6 w-full max-w-md">
      <h2 className="text-center text-3xl font-extrabold text-indigo-600 mb-6">
        My Profile
      </h2>

      <div className="bg-white shadow-xl rounded-3xl p-6 flex flex-col items-center gap-6">
        {/* Profile Image */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
       <div
  className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full cursor-pointer overflow-hidden 
             shadow-lg transform transition duration-300 hover:scale-105"
  onClick={() => filePickerRef.current.click()}
>
  <div className="absolute inset-0 rounded-full p-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
    <div className="w-full h-full rounded-full overflow-hidden bg-white">
      <img
        src={imageFileUrl || "/default-profile.png"}
        alt=""
        className="w-full h-full object-cover rounded-full"
      />
    </div>
  </div>

  <div className="absolute inset-0 rounded-full bg-black bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white font-semibold text-sm">
    Change
  </div>
</div>


        <TextField
          label="Name"
          fullWidth
          value={name}
          disabled
          InputProps={{
            readOnly: true,
          }}
          sx={{ backgroundColor: "#f9fafb", borderRadius: 2 }}
        />

        <TextField
          label="Email"
          fullWidth
          value={email}
          disabled
          InputProps={{
            readOnly: true,
          }}
          sx={{ backgroundColor: "#f9fafb", borderRadius: 2 }}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            background: "linear-gradient(to right, #EC4899, #A855F7, #6366F1)",
            fontWeight: "bold",
            borderRadius: "12px",
            py: 1.5,
            textTransform: "none",
            boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
            "&:hover": {
              transform: "scale(1.03)",
              boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
            },
          }}
          onClick={() => setOpen(true)}
        >
          Sign Out
        </Button>
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Typography className="text-center mb-4">
            <HiOutlineExclamationCircle className="text-6xl mx-auto text-gray-400" />
          </Typography>
          <Typography className="text-gray-700 text-center text-lg mb-6">
            Are you sure you want to sign out?
          </Typography>
          <div className="flex justify-center gap-6">
            <Button
              variant="contained"
              sx={{
                bgcolor: "red",
                px: 4,
                "&:hover": { bgcolor: "#b91c1c" },
              }}
              onClick={handleLogout}
            >
              Yes
            </Button>
            <Button
              variant="contained"
              sx={{
                bgcolor: "green",
                px: 4,
                "&:hover": { bgcolor: "#15803d" },
              }}
              onClick={() => setOpen(false)}
            >
              No
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default Dashboardprofile;
