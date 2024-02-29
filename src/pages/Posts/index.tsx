// import React from 'react'
import Navbar from "../../components/Navbar";
import PostCard from "../../components/Card";
import "./index.scss";
import { Alert, Box, CircularProgress, Pagination } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useGetAllPosts } from "../../hooks/useGetAllPosts";
import { PostModel } from "../../hooks/useGetAllPosts";
import { Link, useNavigate } from "react-router-dom";
import { PostsContext } from "../../context/PostsContext";
import { useContext, useEffect, useState } from "react";
import SearchInput from "../../components/SearchInput";

const Posts = () => {
  const { posts,totalPages } = useContext(PostsContext);
  const { loading, error, getAllPost } = useGetAllPosts();
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    event.preventDefault();
    setPage(value);
  };

  const navigate = useNavigate();
  // State to manage search text
  const [searchText, setSearchText] = useState("");

  // Filtered posts based on searchText
  const filteredPosts = posts.filter((post) =>
    post.title.ar.toLowerCase().includes(searchText.toLowerCase())
  );

  useEffect(() => {
    getAllPost(page);
  }, [page, setPage]);

  return (
    <div className="posts">
      <Navbar />
      {error && (
        <Alert sx={{ mt: "10px" }} severity="error">
          {error}
        </Alert>
      )}
      {loading && (
        <Box
          sx={{
            height: "400px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress size={100} />
        </Box>
      )}
      {(posts.length > 0 && !loading) && (
        <Box
          width={"100%"}
          mt={"20px"}
          display={"flex"}
          justifyContent={"center"}
        >
          <SearchInput onSearch={(searchText) => setSearchText(searchText)} />
        </Box>
      )}
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 3, sm: 9, md: 12, lg: 8 }}
        className="cards"
        sx={{ padding: "30px", placeItems: "center" }}
      >
        {filteredPosts.length > 0 &&
          !loading &&
          filteredPosts.map((post: PostModel) => (
            <Grid xs={3} sm={4} md={4} lg={2} key={post._id}>
              <PostCard
                categories={post.category.ar}
                createdAt={post.updatedAt ? post.updatedAt : post.createdAt}
                id={post._id}
                onNavigate={() => navigate(`/posts/${post._id}`)}
                image={post.image}
                title={post.title.ar}
              />
            </Grid>
          ))}
        {filteredPosts.length === 0 && !loading && (
          <Box
            sx={{
              m: "30px auto",
              width: "80%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Alert
              sx={{
                height: "60px",
                display: "flex",
                alignItems: "center",
                fontSize: "20px",
                width: "100%",
              }}
              severity="info"
            >
              لا توجد مقالات في الوقت الحالي{" "}
              <Link to="/add-post">اضغط هنا</Link> لإضافة مقالة جديدة
            </Alert>
          </Box>
        )}
      </Grid>
      {!loading && (
        <Box display={"flex"} justifyContent={"center"} my={"20px"}>
          <Pagination
            page={page}
            onChange={handleChange}
            count={totalPages}
            variant="outlined"
            shape="rounded"
          />
        </Box>
      )}
    </div>
  );
};

export default Posts;
