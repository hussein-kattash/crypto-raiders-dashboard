import { Box, Button, Card, Tooltip, Link, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteDialog from "../DeleteDialog";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UseDeletePartner } from "../../hooks/useDeletePartner";
import { useGetAllPartners } from "../../hooks/useGetAllPartners";

interface Props {
  id: string;
  image: string;
  link: string;
  name: string;
}

const Partner = ({ image, id, link, name }: Props) => {
  const { getAllPartners } = useGetAllPartners();
  const { loading, deletePartner } = UseDeletePartner(id);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const notify = () =>
    toast.success("تم حذف الشراكة بنجاح", {
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
    toast.error("الإعلان غير موجود", {
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
    const res = await deletePartner();
    if (res === 200) {
      notify();
      handleClose();
      setTimeout(() => {
        getAllPartners();
      }, 3000);
    } else {
      notify2();
      handleClose();
    }
  }

  return (
    <Card>
      {image && (
        <Box sx={{ width: "100%", height: "140px" }}>
          <Link href={link}>
            <img src={image} style={{ width: "100%", height: "100%" }} />
          </Link>
        </Box>
      )}
      <Typography p={"10px"}>{name}</Typography>
      <Box
        width={"100%"}
        height={"50px"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"start"}
      >
        <Tooltip title="حذف هذه الشراكة" arrow>
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
      </Box>
    </Card>
  );
};

export default Partner;
