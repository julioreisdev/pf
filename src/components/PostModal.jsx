import { Button, Dialog, DialogContent } from "@mui/material";
import { TextArea } from "../style";
import { useContext, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { colors } from "../utils";
import axios from "axios";
import { GlobalContext } from "./Context";

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

  const context = useContext(GlobalContext);

  function isVideo(file) {
    return file && file.type.startsWith("video/");
  }

  function post() {
    setLoading(true);
    const payload = new FormData();

    if (imageFile) {
      payload.append("midia", imageFile);
    }
    payload.append("user_id", localStorage.getItem("user_id"));
    payload.append("user_is_ong", localStorage.getItem("is_ong"));
    payload.append("description", description);
    axios
      .post("https://pf-back-gpex.onrender.com/posts", payload)
      .then((res) => {
        context.updatePostsFunction();
        setDescription("");
        setImageFile(null);
        setSelectedImage(null);
        onClose();
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }

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
              {isVideo(imageFile) ? (
                <video style={{ width: "200px" }} controls autoPlay loop>
                  <source src={selectedImage} type="video/mp4" />
                  Seu navegador não suporta o elemento de vídeo.
                </video>
              ) : (
                <>
                  {selectedImage ? (
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
                  ) : (
                    <div
                      style={{
                        width: "200px",
                        cursor: "pointer",
                        height: "200px",
                        border: "1px dashed #fff",
                        borderRadius: "5px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                      }}
                    >
                      <p>Clique para selecionar</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </label>
          <input
            id="image-input"
            type="file"
            accept="image/*, video/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          {imageFile && (
            <Button
              variant="outlined"
              size="small"
              loading={loading}
              onClick={() => {
                setImageFile(null);
                setSelectedImage(null);
              }}
              type="submit"
            >
              Limpar
            </Button>
          )}
          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="O que você está pensando?"
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
            onClick={post}
          >
            Postar
          </LoadingButton>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PostModal;
