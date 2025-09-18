import React, { useState } from 'react';
import { Button, TextField } from "@mui/material";
import { createPost } from '../Services/post-service';
import { toast, ToastContainer } from "react-toastify";

function CreateBlog() {
  const [content, setContent] = useState(""); 
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { title, content };

    createPost(data)
      .then((response) => {
        toast.success("Post created successfully!");
        setTitle("");
        setContent("");
      })
      .catch((error) => {
        toast.error("Something went wrong!");
      });
  };

  return (
    <div className="p-0 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-center text-4xl my-6 font-bold text-indigo-600">
        Create a New Blog Post
      </h1>

      <form className="flex flex-col gap-6">
        <div className="w-full sm:w-[90%] lg:w-[80%] mx-auto">
          <TextField 
            label="Title" 
            type="text" 
            fullWidth 
            variant="outlined" 
            value={title}  
            onChange={(e) => setTitle(e.target.value)} 
          />
        </div>

        <div className="w-full sm:w-[90%] lg:w-[80%] mx-auto">
          <TextField
            label="Content"
            type="text"
            fullWidth
            multiline
            minRows={7} 
            maxRows={10} 
            variant="outlined"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <Button
          variant="contained"
          color="primary"
          className="sm:w-[90%] lg:w-[80%] mx-auto mb-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full lg:w-[80%]"
          onClick={handleSubmit}
        >
          Publish
        </Button>
        <ToastContainer position="bottom-center" autoClose={3000} />
      </form>
    </div>
  );
}

export default CreateBlog;
