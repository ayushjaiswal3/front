import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPost } from "../Services/post-service";
import Nav_bar from "../Header/Nav_bar"; // <-- import Navbar

function BlogsPage() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const fetchPosts = async (pageNumber) => {
    try {
      setLoading(true);
      const response = await getAllPost(pageNumber, size, "createdAt", "desc");
      setPosts(response.data || []);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-[Poppins]">
      <Nav_bar />  {/* <-- Add this */}
      <div className="px-5 lg:px-20 py-12">
        <h1 className="text-4xl font-bold text-center mb-10">All Blogs</h1>

        {loading ? (
          <p className="text-center text-gray-500 animate-pulse text-lg">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No posts available</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="relative flex flex-col justify-between p-6 rounded-2xl bg-white shadow-lg border border-gray-200 hover:shadow-2xl transition-transform transform hover:-translate-y-2 hover:scale-[1.03] duration-300"
              >
                <h2 className="text-2xl font-extrabold mb-3 text-gray-900 hover:text-indigo-600 transition-colors duration-300">
                  {post.title}
                </h2>
                <p className="text-gray-700 mb-5 leading-relaxed line-clamp-3 text-sm sm:text-base">
                  {post.content.length > 120 ? `${post.content.substring(0, 120)}...` : post.content}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 mt-4 border-t pt-3">
                  <span className="font-medium">{post.authorName}</span>
                  <span className="text-gray-400 text-xs">
                    {new Date(
                      post.createdAt[0],
                      post.createdAt[1] - 1,
                      post.createdAt[2],
                      post.createdAt[3],
                      post.createdAt[4]
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <button
                  onClick={() => navigate(`/blogs/${post.id}`)}
                  className="mt-6 w-full bg-indigo-500 text-white py-2.5 rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
                >
                  Read More
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-10 space-x-4">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            disabled={page === 0}
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default BlogsPage;
