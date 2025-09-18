import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById } from "../Services/post-service";
import Nav_bar from "../Header/Nav_bar";

function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await getPostById(id);
      setPost(response.data); 
      setLoading(false);
    } catch (error) {
      console.error("Error fetching post:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 animate-pulse text-lg">
        Loading post...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-lg">
        Post not found
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen font-[Poppins]">
      <Nav_bar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 py-12">
        {post.imageUrl && (
          <div className="mb-10">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-64 sm:h-80 lg:h-[28rem] object-cover rounded-2xl shadow-lg"
            />
          </div>
        )}

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight text-center">
          {post.title}
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-gray-500 text-sm mb-8 border-b pb-4">
          <span className="mb-2 sm:mb-0 text-center sm:text-left flex items-center gap-2">
            ✍️ <span className="font-medium">{post.authorName}</span>
          </span>
          <span className="text-center sm:text-right text-gray-400 text-sm">
            {new Date(
              post.createdAt[0],
              post.createdAt[1] - 1,
              post.createdAt[2],
              post.createdAt[3],
              post.createdAt[4]
            ).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>

     
        <div className="prose prose-indigo max-w-none text-gray-800 leading-relaxed bg-white rounded-2xl p-6 sm:p-10 shadow-md hover:shadow-lg transition-shadow duration-300">
          {post.content.split("\n").map((para, index) => (
            <p key={index}>{para}</p>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-[1.03] transition-transform"
          >
            ← Back to Blogs
          </button>
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;
