import React, { useEffect, useState } from "react";
import { getAllPost } from "../Services/post-service";
import {
  Col,
  Row,
  Pagination,
  PaginationItem,
  PaginationLink,
  Container,
} from "reactstrap";
import Posts from "./Posts";
import { toast } from "react-toastify";

function Feeds() {
  const [postContent, setPostContent] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5;

  useEffect(() => {
    fetchPosts(currentPage);
    window.scroll(0,0);
  }, [currentPage]);

  const fetchPosts = (page) => {
    getAllPost(page, pageSize)
      .then((data) => {
        setPostContent(data);
        console.log(data);
      })
      .catch((error) => {
        toast.error("Error fetching posts: " + error);
      });
  };

  const changePage = (page) => {
    if (page >= 0 && page < postContent.totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container">
      <Row>
        <Col md={{ size: 10, offset: 1 }}>
          <h1>Blogs Count: {postContent?.totalElements}</h1>

          {postContent?.content?.map((post) => (
            <Posts key={post.id} postId={post.postId} title={post.title} content={post.content} />
          ))}
        </Col>
      </Row>
    </div>
  );
}

export default Feeds;
