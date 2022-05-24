import React from "react";

import { Box, Typography, Modal } from "@mui/material";
import AddCamera from "../../components/forms/addCamera";
import DetailCamera from "../forms/detailCamera";

import "./BasicModal.scss";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "500px",
  overflow: "scroll",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ open, handleClose, data }) {
  if (open) {
    //console.log(data);
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-descripcion"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {open ? data.map((res) => res.name) : "nvr"}
          </Typography>

          <DetailCamera item={data} />
        </Box>
      </Modal>
    </div>
  );
}
