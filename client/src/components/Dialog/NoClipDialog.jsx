import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function NoClipDialog({ isOpen }) {
  const [open, setOpen] = React.useState(isOpen);

  let navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
    navigate("/games");
  };
  const submitClip = () => {};

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Bạn đã xem hết video</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Chúng tôi sẽ liên tục cập nhật thêm video để thoả mãn nhu cầu của
            bạn
          </DialogContentText>
        </DialogContent>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Bạn cũng có thể gửi video của bạn cho chúng tôi bằng cách{" "}
            <span
              style={{ color: "red", cursor: "pointer" }}
              onClick={submitClip}
            >
              Click vào đây
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Trở về</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default NoClipDialog;
