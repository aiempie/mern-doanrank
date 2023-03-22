import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import {
  DialogTitle,
  IconButton,
  Slide,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./OpenDialog.module.css";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs(props) {
  const { gameName, ranks } = props;

  const [open, setOpen] = useState(false);
  const [trueRank, setTrueRank] = useState({
    rankImage: "rankImage",
    rankName: "rankName",
  });
  const [chooseRank, setChooseRank] = useState({
    rankImage: "rankImage",
    rankName: "rankName",
  });
  const [wrongRank, setWrongRank] = useState({
    rankImage: "rankImage",
    rankName: "rankName",
  });

  useEffect(() => {
    setTrueRank(ranks.find((rank) => rank.order === 3));
    setChooseRank(ranks.find((rank) => rank.order === 4));
    setWrongRank(ranks.find((rank) => rank.order === 5));
  }, [ranks]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Xem Luật Chơi
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        TransitionComponent={Transition}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {gameName}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <h3>Cách chơi</h3>
          <p>Đoán mức rank cho clip vê game {gameName}</p>
          <ul>
            <li>Nhận số điểm dựa trên lựa chọn của bạn</li>
            <li>Nhận được 1 điểm nếu đoán đúng trong khoảng cách 1 rank</li>
            <li>Nhận được 3 điểm nếu đoán chính xác được rank</li>
            <li>Bị trừ 2 điểm nếu đoán sai từ 2 khoảng cách</li>
            <li>Mỗi lượt đoán sẽ mất đi 1 trái tim</li>
          </ul>
          <h3>Ví dụ</h3>
          <TableContainer>
            <Table sx={{ minWidth: 350 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <div className={styles.table_item}>Lựa chọn đúng</div>
                  </TableCell>
                  <TableCell>
                    <div className={styles.table_item}>Lựa chọn của bạn</div>
                  </TableCell>
                  <TableCell>
                    <div className={styles.table_item}>Điểm nhận</div>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell className={styles.no_padding}>
                    <div className={styles.table_item}>
                      <img
                        src={trueRank.rankImage}
                        className={styles.table_image}
                        alt={trueRank.rankName}
                      />
                      <span>{trueRank.rankName}</span>
                    </div>
                  </TableCell>
                  <TableCell className={styles.no_padding}>
                    <div className={styles.table_item}>
                      <img
                        src={chooseRank.rankImage}
                        className={styles.table_image}
                        alt={chooseRank.rankName}
                      />
                      <span>{chooseRank.rankName}</span>
                    </div>
                  </TableCell>
                  <TableCell className={styles.no_padding}>
                    <div className={styles.table_item}>
                      <span>1</span>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={styles.no_padding}>
                    <div className={styles.table_item}>
                      <img
                        src={trueRank.rankImage}
                        className={styles.table_image}
                        alt={trueRank.rankName}
                      />
                      <span>{trueRank.rankName}</span>
                    </div>
                  </TableCell>
                  <TableCell className={styles.no_padding}>
                    <div className={styles.table_item}>
                      <img
                        src={trueRank.rankImage}
                        className={styles.table_image}
                        alt={trueRank.rankName}
                      />
                      <span>{trueRank.rankName}</span>
                    </div>
                  </TableCell>
                  <TableCell className={styles.no_padding}>
                    <div className={styles.table_item}>
                      <span>3</span>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={styles.no_padding}>
                    <div className={styles.table_item}>
                      <img
                        src={trueRank.rankImage}
                        className={styles.table_image}
                        alt={trueRank.rankName}
                      />
                      <span>{trueRank.rankName}</span>
                    </div>
                  </TableCell>
                  <TableCell className={styles.no_padding}>
                    <div className={styles.table_item}>
                      <img
                        src={wrongRank.rankImage}
                        className={styles.table_image}
                        alt={wrongRank.rankName}
                      />
                      <span>{wrongRank.rankName}</span>
                    </div>
                  </TableCell>
                  <TableCell className={styles.no_padding}>
                    <div className={styles.table_item}>
                      <span>-2</span>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Đã hiểu
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
