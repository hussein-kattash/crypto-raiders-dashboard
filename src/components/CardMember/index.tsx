import {
  Box,
  Button,
  Card,
  CardActions,
  Tooltip,
  Typography,
} from "@mui/material";
import TelegramIcon from "@mui/icons-material/Telegram";
import LinkedinIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/X";
import GoogleIcon from "@mui/icons-material/Google";
import YoutubeIcon from "@mui/icons-material/YouTube";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DeleteDialog from "../DeleteDialog";
import { useState } from "react";
import { UseDeleteMember } from "../../hooks/useDeleteMember";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetAllMembers } from "../../hooks/useGetAllMembers";
import { useNavigate } from "react-router-dom";


interface Props {
  id:string;
  image: string;
  name: string;
  role: string;
  telegram: string;
  twitter: string;
  linkedin: string;
  youtube: string;
  gmail: string;
}

const CardMember = ({
  id,
  image,
  name,
  role,
  telegram,
  twitter,
  linkedin,
  youtube,
  gmail,
}: Props) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { getAllMembers } = useGetAllMembers();
  const { loading, deleteMember } = UseDeleteMember(id);
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const notify = () =>
  toast.success("تم حذف العضو بنجاح", {
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
  toast.error("العضو غير موجود", {
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
    const res = await deleteMember();
    if (res === 200) {
      notify();
      handleClose();
      setTimeout(() => {
        getAllMembers();
      }, 3000);
    } else {
      notify2();
      handleClose();
    }
  }

  return (
    <Card
      sx={{
        height: "340px",
        width: "300px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <Box
        width={"150px"}
        height={"150px"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <img
          src={image}
          style={{ width: "100%", height: "100%", borderRadius: "50%" }}
        />
      </Box>
      <Box mt={"20px"}>
        <Typography variant="h5">{name}</Typography>
        <Typography fontSize={"14px"}>{role}</Typography>
      </Box>
      <Box
        mt={"20px"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {telegram && (
          <a href={telegram}>
            <TelegramIcon />
          </a>
        )}
        {twitter && (
          <a href={twitter}>
            <TwitterIcon />
          </a>
        )}
        {linkedin && (
          <a href={linkedin}>
            <LinkedinIcon />
          </a>
        )}
        {youtube && (
          <a href={youtube}>
            <YoutubeIcon />
          </a>
        )}
        {gmail && (
          <a href={gmail}>
            <GoogleIcon />
          </a>
        )}
      </Box>
      <CardActions
        sx={{
          width: "100%",
          mt: "auto",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Tooltip title="حذف هذا العضو" arrow>
          <Button
            onClick={handleClickOpen}
            sx={{ marginLeft: "5px" }}
            variant="contained"
          >
            <DeleteIcon />
          </Button>
        </Tooltip>
        <Tooltip title="تعديل بيانات هذا العضو" arrow>
          <Button
            onClick={()=> navigate(`/edit-member/${id}`)}
            sx={{ marginLeft: "5px" }}
            variant="contained"
          >
            <EditIcon />
          </Button>
        </Tooltip>
      </CardActions>
      <DeleteDialog
          loading={loading}
          confirmDelete={confirmDelete}
          open={open}
          handleClose={handleClose}
        />
      <ToastContainer/>
    </Card>
  );
};

export default CardMember;


