import styled from "styled-components";
import MediaPreview from "./MediaPreview";
import { useEffect, useState } from "react";
import ProfileEdit from "./ProfileEdit";
import axios from "axios";
import { useParams } from "react-router-dom";
import { imgBuffer } from "../utils";

const PersonalProfile = () => {
  const [previewIsOpen, setPreviewIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [media, setMedia] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState(0);
  const [myProfile, setMyProfile] = useState(false);
  const [update, setUpdate] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    if (id === localStorage.getItem("user_id")) {
      setMyProfile(true);
    }
  }, [id]);

  useEffect(() => {
    axios.get(`http://localhost:8008/profile/${id}`).then((res) => {
      setUser(res.data.user);
      setPosts(res.data.posts);
      setLikes(res.data.likes_count);

      const image = res.data.user.image;
      setProfileImg(imgBuffer(image));
    });
  }, [id, update]);

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
            onClick={() => {
              if (myProfile) {
                setEditIsOpen(true);
              }
            }}
            src={
              profileImg ||
              "https://icons.iconarchive.com/icons/elegantthemes/beautiful-flat/128/Profile-icon.png"
            }
            alt={user}
          />
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            {" "}
            <Tag>
              <h5>Posts</h5>
              <p>{posts.length}</p>
            </Tag>
            <Tag>
              <h5>Likes</h5>
              <p>{likes}</p>
            </Tag>
          </div>
        </div>
        <UserName>{user.name || "carregando..."}</UserName>
        <UserEmail>{user.email || "carregando..."}</UserEmail>
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
        {/* <MicroPostImage
          onClick={() => {
            setMedia(
              "data:image/webp;base64,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"
            );
            setPreviewIsOpen(true);
          }}
          src="data:image/webp;base64,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"
        /> */}
        {/* <MicroPostVideo
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
        </MicroPostVideo> */}
      </div>
      <MediaPreview
        open={previewIsOpen}
        onClose={() => setPreviewIsOpen(false)}
        media={media}
      />
      <ProfileEdit
        open={editIsOpen}
        onClose={() => setEditIsOpen(false)}
        update={() => {
          setUpdate(!update);
        }}
        user={user}
        userImg={profileImg}
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

export const UserImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserName = styled.h5`
  color: #fff;
`;

const UserEmail = styled.p`
  color: #fff;
  font-size: 0.8rem;
`;

export default PersonalProfile;
