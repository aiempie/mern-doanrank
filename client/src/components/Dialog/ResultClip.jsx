import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Slide,
} from "@mui/material";
import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ResultClip({ isOpen, result, refreshClip, refreshNoLog }) {
  const [open, setOpen] = React.useState(isOpen);

  const handleClose = () => {
    setOpen(false);
    refreshClip();
  };
  const handleNoTimes = () => {
    setOpen(false);
    refreshNoLog();
  };
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ color: result.PlusScore === -2 ? "red" : "green" }}>
          {result.message}
        </DialogTitle>

        <DialogActions>
          {result.isNoTimes ? (
            <Button onClick={handleNoTimes}>Đã hiểu</Button>
          ) : (
            <Button onClick={handleClose}>Clip tiếp theo</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ResultClip;
