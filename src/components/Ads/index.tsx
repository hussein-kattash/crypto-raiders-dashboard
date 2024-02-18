import { Box, Button, Card, Tooltip, Link} from '@mui/material'
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteDialog from '../DeleteDialog';
import { useGetAllAds } from '../../hooks/useGetAllAds';
import { UseDeleteAds } from '../../hooks/useDeleteAds';
import { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props{
    id:string;
    image: string,
    link: string
}

const Ads = ({image, id, link}:Props) => {
    const { getAllAds } = useGetAllAds();
  const { loading, deleteAds } = UseDeleteAds(id);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const notify = () =>
    toast.success("تم حذف الإعلان بنجاح", {
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
    const res = await deleteAds();
    if (res === 200) {
      notify();
      handleClose();
      setTimeout(() => {
        getAllAds();
      }, 3000);
    } else {
      notify2();
      handleClose();
    }
  }

  return (
    <Card>
        <Box sx={{width:"100%", bgcolor:"red", height:"140px"}}>
            <Link href={link}><img src={image} style={{width:'100%', height:"100%"}}/></Link>
        </Box>
        <Box width={'100%'} height={"50px"} display={'flex'} alignItems={'center'} justifyContent={'start'}>
        <Tooltip title="حذف هذا الإعلان" arrow>
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
        <ToastContainer/>
        </Box>
    </Card>
  )
}

export default Ads;