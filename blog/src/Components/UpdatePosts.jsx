import React, { useState, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { Button, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { createPost, loadPost, UpdatePost, uploadPostImage, uploadUpdatedImage } from '../Services/post-service';
import { getCategories } from '../Services/category-service';
import { getCurrentUserDetail } from '../Auth';
import { toast,ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
function UpdatePosts() {
  const [file, setFile] = useState(null);
  const [content, setContent] = useState(""); 
  const [title,setTitle] = useState("");
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const user = getCurrentUserDetail();
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const { postId } = useParams();

  const [post,setPosts] = useState(null);


  useEffect(() => {
    if (!postId) return; 
    loadPost(postId)
      .then((response) => {
        setPosts(response);
        setTitle(response.title || "");  
        setContent(response.content || "");  
        setCategory(response.category?.category_id || ""); 
      })
      .catch((error) => {
        console.error("Error loading post:", error);
      });
  }, [postId]);  
  
  

  const handleSubmit=()=>{
    const data={
      title,
      content
    }
    console.log('The category is',category);
    if (!postId) return; 
   UpdatePost(data,category,postId).then(response=>{
        uploadUpdatedImage(file,postId,category).then(()=>{
          toast.success("post created");
          setFile(null);
          setCategory(null);
          setTitle("");
          setContent("");
        })
      }).catch((error)=>{
        console.log(error);
        toast.error("Something Went Wrong!!")
      })
  
  }

  useEffect(() => {
    getCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);
  console.log(category);

  

  return (
    <div className="p-0 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-center text-4xl my-12 font-bold text-indigo-600">
        Update a  Blog Post
      </h1>

      <form className="flex flex-col gap-6">
        <div className="w-full sm:w-[90%] lg:w-[80%] mx-auto">
          <TextField label="Title" type="text" fullWidth variant="outlined" value={title}  onChange={(e) => setTitle(e.target.value)}/>
        </div>

      
        <div className="w-full sm:w-[90%] lg:w-[80%] mx-auto">
          <FormControl fullWidth>
          <InputLabel id="category-label">Category</InputLabel>
            <Select 
              labelId="category-label" 
              id="category-select" 
              value={category || ""} 
              onChange={(e) => setCategory(e.target.value)}
              label="Category"
            >
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <MenuItem key={cat.category_id} value={cat.category_id}>
                    {cat.category_title}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No Categories Found</MenuItem>
              )}
            </Select>
          </FormControl>
        </div>

        <div className="w-full lg:w-[80%] flex flex-row gap-5 items-center border-2 border-dashed border-indigo-400 p-4 rounded-lg">
          <label className="cursor-pointer flex flex-row justify-between items-center">
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:shadow-lg hover:opacity-90 transition-all duration-300">
              {file ? "Change File" : "Choose File"}
            </span>
            <input type="file" className="hidden" accept="image/*"  onChange={handleFileChange} />
          </label>
          {file && <p className="text-xl font-bold text-gray-800">{file.name}</p>}
         {post?.image && !file && (
           <p className="text-xl font-bold text-white">{post.image}</p>
          )}
        </div>

       <div className="w-full lg:w-[80%] flex flex-row gap-5 items-center">
       <TextField
  label="Content"
  type="text"
 
  fullWidth
  multiline
  minRows={7} 
  maxRows={10} 
  variant="outlined"
  value={content || ""}
  onChange={(e) => setContent(e.target.value)}
/>

       </div>

       <Button
          variant="contained"
          color="primary"
          className="mb-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full lg:w-[80%]"
          onClick={handleSubmit}
       >
         Update
        </Button>
        <ToastContainer position="bottom-center" autoClose={3000} />
      </form>
    </div>
  );
}

export default UpdatePosts;
