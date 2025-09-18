

import React, { useEffect, useState } from "react";
import { FaLaptopCode, FaHeart, FaGlobe, FaUtensils } from "react-icons/fa";
import Nav_bar from "../Header/Nav_bar";
import { getAllPost } from "../Services/post-service";
import { useNavigate } from "react-router-dom";


function Home() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(5); // page size
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
      console.error("Error fetching posts:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <Nav_bar />

      <div className="min-h-screen bg-gradient-to-r from-gray-400 to-gray-600 flex flex-col items-center justify-center text-center px-6 lg:px-8">
        <h1 className="text-6xl font-extrabold text-white mb-10">
          Welcome to <span className="text-white">MY BLOG</span>
        </h1>
        <p className="text-2xl text-gray-200 max-w-4xl font-semibold">
          Discover amazing stories, share your thoughts, and engage with a
          community of passionate writers.
        </p>
        <div className="mt-12 mb-10 space-x-4 sm:flex sm:flex-col sm:gap-3">
         <button
  onClick={() => navigate("/blogs")}
  className="bg-gradient-to-r from-indigo-500 via-purple-300 to-pink-300 text-gray-900 px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-yellow-400 transition"
>
  Explore Blogs
</button>

         <button
  onClick={() =>
    navigate("/user/user-dashboard", { state: { component: "create-blog" } })
  }
  className="bg-white text-gray-900 px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-gray-100 transition"
>
  Write a Blog
</button>

        </div>
      </div>

      <section
        id="latest"
        className="px-5 lg:px-20 pt-10 bg-gray-100 py-20 transition-all duration-500"
      >
        <h1 className="text-4xl font-bold text-black py-3 pb-10 text-center">
          Recent Posts
        </h1>

  {loading ? (
  <p className="text-center text-gray-500 animate-pulse text-lg">Loading posts...</p>
) : posts.length === 0 ? (
  <p className="text-center text-gray-500 text-lg">No posts available</p>
) : (
  <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    {posts.map((post) => (
      <div
        key={post.id}
        className="relative flex flex-col justify-between p-6 rounded-xl bg-white shadow-md border border-gray-200 hover:shadow-lg transition-transform transform hover:-translate-y-1 duration-200"
      >
        <span className="absolute top-4 right-4 bg-gray-200 text-gray-600 text-xs font-medium px-3 py-1 rounded-full shadow-sm">
          New
        </span>

        <h2 className="text-xl font-semibold mb-2 text-gray-900 hover:text-gray-700 transition-colors duration-200">
          {post.title}
        </h2>

        <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3 text-sm sm:text-base">
          {post.content.length > 120 ? `${post.content.substring(0, 120)}...` : post.content}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 mt-4 border-t pt-3">
          <span className="flex items-center gap-1 font-medium">
            <FaLaptopCode className="text-gray-500" /> {post.authorName}
          </span>
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
          className="mt-4 w-full bg-gray-900 text-white py-2.5 rounded-lg font-medium shadow hover:bg-gray-800 transition-colors"
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
      </section>

<footer className="bg-gray-900 text-gray-300 px-5 lg:px-20 py-12">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
    <div>
      <h1 className="text-2xl font-bold text-white mb-3">Omnify Blog</h1>
      <p className="text-sm leading-relaxed">
        Your daily dose of insights, stories, and updates across technology,
        lifestyle, health, travel, and more. Stay connected and keep learning.
      </p>
    </div>

    <div>
      <h2 className="text-lg font-semibold text-white mb-4">Quick Links</h2>
      <ul className="space-y-2">
        <li>
          <a href="/" className="hover:text-indigo-400 transition">
            Home
          </a>
        </li>
        <li>
          <a href="/about" className="hover:text-indigo-400 transition">
            About
          </a>
        </li>
        <li>
          <a href="/blogs" className="hover:text-indigo-400 transition">
            Blogs
          </a>
        </li>
        <li>
          <a href="/contact" className="hover:text-indigo-400 transition">
            Contact
          </a>
        </li>
      </ul>
    </div>

    <div>
      <h2 className="text-lg font-semibold text-white mb-4">Follow Us</h2>
      <div className="flex space-x-5 text-2xl">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-indigo-400 transition"
        >
          <i className="fab fa-facebook"></i>
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-indigo-400 transition"
        >
          <i className="fab fa-twitter"></i>
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-indigo-400 transition"
        >
          <i className="fab fa-instagram"></i>
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-indigo-400 transition"
        >
          <i className="fab fa-linkedin"></i>
        </a>
      </div>
    </div>
  </div>

  <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm">
    <p>
      © {new Date().getFullYear()} Omnify Blog. All rights reserved. | Made with
      ❤️ by Team Omnify
    </p>
  </div>
</footer>

    </div>
  );
}

export default Home;

