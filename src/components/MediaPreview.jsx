import { Dialog, DialogContent } from "@mui/material";
import { isVideo } from "../utils";

const MediaPreview = ({ open, onClose, media }) => {
  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogContent sx={{ padding: "0.5rem", backgroundColor: "#0f1b2b" }}>
          <div style={{ overflowY: "auto", maxHeight: "400px" }}>
            {isVideo(media) ? (
              <video style={{ width: "250px" }} controls>
                <source
                  src="https://www.w3schools.com/html/mov_bbb.mp4"
                  type="video/mp4"
                />
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
