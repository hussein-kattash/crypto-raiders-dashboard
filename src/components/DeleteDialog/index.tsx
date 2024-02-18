import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

 
interface Props{
    loading: boolean;
    open: boolean;
    handleClose: ()=> void;
    confirmDelete: ()=> void
}

export default function DeleteDialog({loading, open, handleClose, confirmDelete}:Props) {

  return (
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle style={{width:"400px"}}>{"هل أنت متأكد؟"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          لن تكون قادرًا على التراجع عن هذا!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>لا</Button>
          <Button disabled={loading} variant='contained' color='error' onClick={confirmDelete}>نعم</Button>
        </DialogActions>
      </Dialog>
  );
}
