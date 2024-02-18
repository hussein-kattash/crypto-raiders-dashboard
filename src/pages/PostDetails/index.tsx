import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import CardDetails from "../../components/CardDetails";
import { Box } from "@mui/material";
import { useGetPostById } from "../../hooks/useGetPostById";
import { useEffect } from "react";

const PostDetails = () => {
  const { id } = useParams();
  const { loading ,error ,  getPostById } = useGetPostById(id);

  useEffect(()=>{
    getPostById();
  },[])

  return (
    <div>
      <Navbar />
      <Box
        m={"50px"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <CardDetails
          error={error}
          loading={loading}
        />
      </Box>
    </div>
  );
};

export default PostDetails;
