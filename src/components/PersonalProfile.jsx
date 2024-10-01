import styled from "styled-components";
import MediaPreview from "./MediaPreview";
import { useState } from "react";

const PersonalProfile = () => {
  const [previewIsOpen, setPreviewIsOpen] = useState(false);
  const [media, setMedia] = useState("");
  return (
    <div
      style={{
        padding: "3rem 0.5rem",
        backgroundColor: "#0f1b2b",
        color: "#fff",
      }}
    >
      <div style={{ marginBottom: "1rem" }}>
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          <UserImage
            src="https://icons.iconarchive.com/icons/elegantthemes/beautiful-flat/128/Profile-icon.png"
            alt=""
          />
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            {" "}
            <Tag>
              <h5>Posts</h5>
              <p>0</p>
            </Tag>
            <Tag>
              <h5>Likes</h5>
              <p>0</p>
            </Tag>
          </div>
        </div>
        <UserName>Júlio Cezar dos Reis Pais</UserName>
        <UserEmail>julio@gmail.com</UserEmail>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.2rem",
          flexWrap: "wrap",
        }}
      >
        {" "}
        <MicroPostImage
          onClick={() => {
            setMedia(
              "https://diariodonordeste.verdesmares.com.br/image/contentid/policy:1.3152323:1635252750/Tatu.jpg?f=default&$p$f=1abbdf5"
            );
            setPreviewIsOpen(true);
          }}
          src="https://diariodonordeste.verdesmares.com.br/image/contentid/policy:1.3152323:1635252750/Tatu.jpg?f=default&$p$f=1abbdf5"
        />
        <MicroPostVideo
          onClick={() => {
            setMedia("https://www.w3schools.com/html/mov_bbb.mp4");
            setPreviewIsOpen(true);
          }}
        >
          <source
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            type="video/mp4"
          />
          Seu navegador não suporta o elemento de vídeo.
        </MicroPostVideo>
      </div>
      <MediaPreview
        open={previewIsOpen}
        onClose={() => setPreviewIsOpen(false)}
        media={media}
      />
    </div>
  );
};

const MicroPostImage = styled.img`
  width: 24%;
  height: 24vw;
  border-radius: 5px;
  object-fit: cover;
`;

const MicroPostVideo = styled.video`
  width: 24%;
  height: 24vw;
  border-radius: 5px;
  object-fit: cover;
`;

const Tag = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    font-size: 0.8rem;
    font-weight: bold;
  }
`;

const UserImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: contain;
`;

const UserName = styled.h5`
  color: #fff;
`;

const UserEmail = styled.p`
  color: #fff;
  font-size: 0.8rem;
`;

export default PersonalProfile;
