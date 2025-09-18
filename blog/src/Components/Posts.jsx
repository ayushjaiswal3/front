import React, { useEffect, useState } from "react";
import { getCurrentUserDetail } from "../Auth";
import { deletePostById, getUsersPosts } from "../Services/post-service";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function Posts() {
  const user = getCurrentUserDetail();
  const userId = user?.id;
  const [userPosts, setUserPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      getUsersPosts(userId).then((response) => {
        console.log("Fetched posts:", response);
        setUserPosts(response.data || []); 
      });
    } else {
      console.log("No fetching userID");
      console.log(user);
    }
  }, [userId]);

  const deletePost = (id) => {
    deletePostById(id)
      .then(() => {
        setUserPosts((prevPosts) =>
          prevPosts.filter((post) => (post.blogId || post.id) !== id)
        );
      })
      .catch((error) => console.log(error));
  };

  const formatDate = (arr) => {
    if (!arr) return "";
    return new Date(
      arr[0],
      arr[1] - 1,
      arr[2],
      arr[3],
      arr[4],
      arr[5]
    ).toLocaleString();
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, maxWidth: "900px", mx: "auto" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", textAlign: "center", color: "primary.main" }}
      >
        My Posts
      </Typography>

      {userPosts.length > 0 ? (
        userPosts.map((post, index) => (
          <Card
            key={post.blogId || post.id || index} 
            sx={{
              mb: 3,
              boxShadow: 4,
              borderRadius: 3,
              transition: "0.3s",
              "&:hover": { boxShadow: 8, transform: "translateY(-3px)" },
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                {post.title}
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                sx={{ mb: 2 }}
              >
                {formatDate(post.createdAt)}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  mb: 2,
                  color: "text.secondary",
                  lineHeight: 1.6,
                  whiteSpace: "pre-line",
                }}
              >
                {post.content}
              </Typography>

              <Divider sx={{ mb: 2 }} />

              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{
                    textTransform: "none",
                    borderRadius: 2,
                    px: 3,
                    py: 1,
                    fontWeight: "bold",
                  }}
                  onClick={() =>
                    navigate(`/update-blog/${post.blogId || post.id}`)
                  }
                >
                  Update Post
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  sx={{
                    textTransform: "none",
                    borderRadius: 2,
                    px: 3,
                    py: 1,
                    fontWeight: "bold",
                  }}
                  onClick={() => deletePost(post.blogId || post.id)}
                >
                  Delete Post
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textAlign: "center", mt: 5 }}
        >
          No posts found.
        </Typography>
      )}
    </Box>
  );
}

export default Posts;
