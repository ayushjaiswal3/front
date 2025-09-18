import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUsersPosts } from "../Services/post-service"; 
import { Spinner } from "reactstrap";
import { Link, Button } from "@mui/material";
import CallToAction from "./CallToAction";
import CommentSection from "../Components/CommentSection";

function Postspage() {
  const { postId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);

  useEffect(() => {
    setLoading(true);
    getUsersPosts(postId)
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch post:", err);
        setError(true);
        setLoading(false);
      });
  }, [postId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to load post. Please try again.
      </div>
    );
  }

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif mx-auto max-w-2xl lg:text-4xl">
        {post?.title}
      </h1>
      <Link
        to={`/search?category=${post && post.category}`}
        className="self-center mt-5"
      >
        <Button color="gray" pill size="xs">
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.image}
        alt={post && post.title}
        className="mt-10 p-3 max-h-[600px] w-full object-cover"
      />
      <div className="flex justify-between p-3 vorder-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        <span>{post && new Date(post.date).toLocaleDateString()}</span>
        <span className="italic">{post && (post.content.length/1000).toFixed(0)} mins read</span>
      </div>
      <div className='p-3 max-w-2xl mx-auto w-full post-content' dangerouslySetInnerHTML={{__html: post&&post.content}}>
        
      </div>
      <div className="max-w-4xl mx-auto w-full">
        <CallToAction/>
      </div>
      <CommentSection postId={postId}/>
    </main>
  );
}

export default Postspage;
