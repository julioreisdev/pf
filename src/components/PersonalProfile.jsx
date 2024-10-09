import styled from "styled-components";
import MediaPreview from "./MediaPreview";
import { useEffect, useState } from "react";
import ProfileEdit from "./ProfileEdit";
import axios from "axios";
import { useParams } from "react-router-dom";
import { colors, imgBuffer } from "../utils";
import { TailSpin } from "react-loader-spinner";

const PersonalProfile = () => {
  const [previewIsOpen, setPreviewIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [post, setPost] = useState({});
  const [profileImg, setProfileImg] = useState("");
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);

  const [loading, setLoading] = useState(false);

  const [myProfile, setMyProfile] = useState(false);
  const [update, setUpdate] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    if (id === localStorage.getItem("user_id")) {
      setMyProfile(true);
    }
  }, [id]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://pf-back-gpex.onrender.com/profile/${id}`)
      .then((res) => {
        setUser(res.data.user);
        setPosts(res.data.posts);

        const image = res.data.user.image;
        setProfileImg(imgBuffer(image));
      })
      .finally(() => {
        setLoading(false);
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
          </div>
        </div>
        <UserName>{user.name}</UserName>
        <UserEmail>{user.email}</UserEmail>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.2rem",
          flexWrap: "wrap",
        }}
      >
        {loading ? (
          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <TailSpin width={60} height={60} color={colors.main} />
          </div>
        ) : (
          <>
            {posts.map((p) => (
              <>
                {!p.midia ? (
                  <MicroPostText
                    onClick={() => {
                      setPost(p);
                      setPreviewIsOpen(true);
                    }}
                  >
                    <h5>T</h5>
                  </MicroPostText>
                ) : (
                  <>
                    {" "}
                    {p.mime.includes("image") ? (
                      <>
                        <MicroPostImage
                          onClick={() => {
                            setPost(p);
                            setPreviewIsOpen(true);
                          }}
                          src={imgBuffer(p.midia)}
                        />
                      </>
                    ) : (
                      <>
                        <MicroPostVideo
                          onClick={() => {
                            setPost(p);
                            setPreviewIsOpen(true);
                          }}
                        >
                          <source src={imgBuffer(p.midia)} type="video/mp4" />
                          Seu navegador não suporta o elemento de vídeo.
                        </MicroPostVideo>
                      </>
                    )}
                  </>
                )}
              </>
            ))}
          </>
        )}
      </div>
      <MediaPreview
        open={previewIsOpen}
        onClose={() => setPreviewIsOpen(false)}
        post={post}
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

const MicroPostText = styled.div`
  width: 24%;
  height: 24vw;
  border-radius: 5px;
  background-color: #443f60;
  display: flex;
  align-items: center;
  justify-content: center;

  h5 {
    font-size: 2rem;
  }
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
