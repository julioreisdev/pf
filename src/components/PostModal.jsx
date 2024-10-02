import { Dialog, DialogContent } from "@mui/material";
import { TextArea } from "../style";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { colors, isVideo } from "../utils";

const PostModal = ({ open, onClose, update }) => {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
      setImageFile(e.target.files[0]);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogContent
          sx={{
            padding: "0.5rem",
            backgroundColor: "#0f1b2b",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <label htmlFor="image-input">
            <div style={{ overflowY: "auto", maxHeight: "400px" }}>
              {isVideo(selectedImage) ? (
                <video style={{ width: "200px" }} controls>
                  <source src={selectedImage} type="video/mp4" />
                  Seu navegador não suporta o elemento de vídeo.
                </video>
              ) : (
                <img
                  style={{
                    width: "200px",
                    cursor: "pointer",
                    height: "200px",
                    objectFit: "cover",
                  }}
                  src={selectedImage || "/public/fundo.png"}
                  alt="Profile"
                />
              )}
            </div>
          </label>
          <input
            id="image-input"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Nome"
            type="text"
          />

          <LoadingButton
            sx={{
              backgroundColor: colors.main,
              width: "100%",
              "&.Mui-disabled": {
                border: "1px solid #1c324f",
                color: "#244268", // Cor do texto quando desabilitado
              },
            }}
            disabled={!imageFile && !description}
            variant="contained"
            size="small"
            loading={loading}
            type="submit"
          >
            Postar
          </LoadingButton>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PostModal;
