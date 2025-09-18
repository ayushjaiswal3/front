

import { myAxios, privateAxios } from './Const';
export const createPost=async (postData,category,userId)=>{
    const response = await privateAxios.post(`/blogs`, postData);
    return response.data;
};

export const getAllPost = async (page, size) => {
    try {
        const response = await myAxios.get(`/blogs?page=${page}&size=${size}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
};

export const getBlogById = (id) => {
  return myAxios.get(`/blogs/${id}`);
};

export const updateBlog = (token, id, blogData) => {
  return myAxios.put(`/blogs/${id}`, blogData, {
    headers: {
      Authorization: token,
    },
  });
};

export const getUsersPosts = async (userId) => {
  try {
        const res = await privateAxios
            .get(`/blogs/user/${userId}`);
        return res.data;
    } catch (err) {
        console.error("Error fetching posts:", err);
        throw err;
    }
};


export const loadPost=async (postId)=>{
    const response = await myAxios.get(`/api/${postId}/post`);
    return response.data;
}

export const uploadPostImage = async (image) => {
    let formData = new FormData();
    formData.append("image", image);

    const response = await privateAxios.post(`/api/upload1`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};

export const getPostImage=async (imageUrl)=>{
    const response = await myAxios.get(`/api/post/img/${imageUrl}`);
    return response.data;
}

export const deletePostById=async (postId)=>{
    const response = await privateAxios.delete(`/blogs/${postId}`);
    return response.data;
}

export const UpdatePost=async (data,categoryId,postId)=>{
    const response = await privateAxios.put(`/api/${postId}/${categoryId}/post`, data);
    return response.data;
}

export const uploadUpdatedImage=async (image,postId,categoryId)=>{
    let formData = new FormData();
    formData.append("file", image);
    const response = await privateAxios.post(`/api/update/${postId}/${categoryId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
}

export const getPostById = async (id) => {
  try {
    const response = await myAxios.get(`/blogs/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching post by id:", error);
    throw error;
  }
};
