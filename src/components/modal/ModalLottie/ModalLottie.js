import React from "react";
import { Box, Typography, Modal } from "@mui/material";
import Loader from "../../Loader";

const style = {
  position: "absolute",
  width: "600px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "200px",
};

export default function ModalLottie({ open, handleClose }) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-descripcion"
      >
        <Box sx={style}>
          <Loader />
        </Box>
      </Modal>
    </div>
  );
}
