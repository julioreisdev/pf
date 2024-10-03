import { Dialog, DialogContent } from "@mui/material";
import { isVideoBuffer } from "../utils";

const MediaPreview = ({ open, onClose, media }) => {
  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogContent sx={{ padding: "0.5rem", backgroundColor: "#0f1b2b" }}>
          <div style={{ overflowY: "auto", maxHeight: "400px" }}>
            {isVideoBuffer(media) ? (
              <video style={{ width: "250px" }} controls>
                <source src={media} type="video/mp4" />
                Seu navegador não suporta o elemento de vídeo.
              </video>
            ) : (
              <img style={{ width: "250px" }} src={media} alt="" />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MediaPreview;
