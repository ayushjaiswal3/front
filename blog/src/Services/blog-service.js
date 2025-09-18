import { myAxios, privateAxios } from "./Const";

export const createBlog = (postData) =>
  privateAxios.post("/blogs", postData).then(res => res.data);

export const getAllBlogs = (page=0, size=5) =>
  myAxios.get(`/blogs?page=${page}&size=${size}`).then(res => res.data);

export const getBlogById = (id) =>
  myAxios.get(`/blogs/${id}`).then(res => res.data);

export const updateBlog = (id, postData) =>
  privateAxios.put(`/blogs/${id}`, postData).then(res => res.data);

export const deleteBlog = (id) =>
  privateAxios.delete(`/blogs/${id}`).then(res => res.data);
