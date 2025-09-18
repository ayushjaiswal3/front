import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { getBlogById, updateBlog } from "../Services/post-service";
import { getToken } from "../Auth";
import Nav_bar from "../Header/Nav_bar";

function UpdateBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({ title: "", content: "" });

  useEffect(() => {
    getBlogById(id).then((res) => {
      setBlog({
        title: res.data.title,
        content: res.data.content,
      });
    });
  }, [id]);

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const token = getToken();
      await updateBlog(token, id, blog);
      alert("Blog updated successfully!");
      navigate("/user/user-dashboard"); 
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("Failed to update blog.");
    }
  };

  return (
    <>
    <Nav_bar/>
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 5 }}>
      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Update Blog
        </Typography>

        <TextField
          fullWidth
          name="title"
          label="Blog Title"
          value={blog.title}
          onChange={handleChange}
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          name="content"
          label="Content"
          value={blog.content}
          onChange={handleChange}
          multiline
          rows={6}
          sx={{ mb: 3 }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdate}
          sx={{ borderRadius: 2, px: 4, py: 1 }}
        >
          Save Changes
        </Button>
      </Paper>
    </Box>
    </>
  );
}

export default UpdateBlog;
