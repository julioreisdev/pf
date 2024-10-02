import { Dialog, DialogContent } from "@mui/material";
import { Input } from "../style";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { colors } from "../utils";

const ProfileEdit = ({ open, onClose, update }) => {
  const [name, setName] = useState("Júlio Cezar dos Reis Pais");
  const [phone, setPhone] = useState("89981043496");
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
            <img
              style={{
                width: "100px",
                cursor: "pointer",
                height: "100px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
              src={
                selectedImage ||
                "https://icons.iconarchive.com/icons/elegantthemes/beautiful-flat/128/Profile-icon.png"
              }
              alt="Profile"
            />
          </label>
          <input
            id="image-input"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome"
            type="text"
          />
          {localStorage.getItem("is_ong") === "true" && (
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Telefone"
              required
              type="tel"
            />
          )}
          <LoadingButton
            sx={{
              backgroundColor: colors.main,
              width: "100%",
              "&.Mui-disabled": {
                border: "1px solid #1c324f",
                color: "#244268", // Cor do texto quando desabilitado
              },
            }}
            disabled={
              !name || (localStorage.getItem("is_ong") === "true" && !phone)
            }
            variant="contained"
            size="small"
            loading={loading}
            type="submit"
          >
            Salvar
          </LoadingButton>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfileEdit;
