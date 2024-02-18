import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Chip, Tooltip } from "@mui/material";
import DeleteDialog from "../DeleteDialog";
import { useState } from "react";
import { useDeletePost } from "../../hooks/useDeletePost";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetAllPosts } from "../../hooks/useGetAllPosts";
import noImage from "../../assets/no-image-placeholder-6f3882e0.webp";

interface Props {
  id: string;
  image: string;
  title: string;
  categories:string[],
  createdAt: string;
  onNavigate: () => void;
}

export default function PostCard({
  id,
  image,
  title,
  categories,
  createdAt = "",
  onNavigate,
}: Props) {
  const { getAllPost } = useGetAllPosts();
  const { loading, deletePost } = useDeletePost(id);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const date = createdAt.split("T");

  const notify = () =>
    toast.success("Post deleted successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const notify2 = () =>
    toast.error("Post not found!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  async function confirmDelete() {
    const res = await deletePost();
    if (res === 200) {
      notify();
      handleClose();
      setTimeout(() => {
        getAllPost();
      }, 3000);
    } else {
      notify2();
      handleClose();
    }
  }

  return (
    <Card
      sx={{
        cursor: "pointer",
        position: "relative",
        width: "100%",
        height: "100%",
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px;",
      }}
    >
      <CardMedia
        component="img"
        alt={title}
        height="150"
        image={image ? image : noImage}
        onClick={onNavigate}
      />
      <CardContent onClick={onNavigate}>
        <Box gap={1} display={'flex'} flexWrap={'wrap'}>
          {
            categories.map((category)=>(
              <Chip label={category} key={category} color="primary" sx={{height:'25px'}}/>
            ))
          }
        </Box>
        <Typography  gutterBottom variant="h5" component="div">
          {title}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          mb: "auto",
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Tooltip title="حذف هذه المقالة" arrow>
          <Button
            onClick={handleClickOpen}
            sx={{ marginLeft: "5px" }}
            variant="contained"
          >
            <DeleteIcon />
          </Button>
        </Tooltip>
        <DeleteDialog
          loading={loading}
          confirmDelete={confirmDelete}
          open={open}
          handleClose={handleClose}
        />
        <ToastContainer />
        <Typography mr="20px" fontSize={"12px"} color={"gray"}>
          {date[0]}:{date[1].split(":")[0]}:{date[1].split(":")[1]}
        </Typography>
      </CardActions>
    </Card>
  );
}
