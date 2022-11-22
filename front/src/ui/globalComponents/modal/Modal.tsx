import * as React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

interface FormModalProps {
  content: React.ReactNode;
  handleClose(): void;
  isOpen: boolean;
}
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const FormModal: React.FC<FormModalProps> = ({
  content,
  handleClose,
  isOpen,
}) => {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={style}>{content}</Box>
    </Modal>
  );
};
