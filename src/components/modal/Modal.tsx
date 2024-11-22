import { Box, Modal, Typography } from "@mui/material"

interface ModalProps {
  onClose?:() => void;
  open:boolean;
  children: React.ReactNode;
  title:string;
  width?:number;
}

export const CustomModal = (props:ModalProps) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: props.width || 800,
    bgcolor: 'background.paper',
    border: '2px solid var(--darkGray)',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  return <Modal
    open={props.open}
    onClose={props.onClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
  <Box sx={style}>
    {props.title != "" ? <Typography id="modal-modal-title" variant="h6" component="h2">
      {props.title}
    </Typography> : <></>}
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      {props.children}
    </Typography>
  </Box>
  </Modal>
}