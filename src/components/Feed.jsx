import styled from "styled-components";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import { colors, imgBuffer, videoBuffer } from "../utils";
import { GlobalContext } from "./Context";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState([]);

  const context = useContext(GlobalContext);
  useEffect(() => {
    setPostsLoading(true);
    axios
      .get("https://pf-back-gpex.onrender.com/posts")
      .then((res) => {
        setPosts(res.data);
      })
      .catch(() => {})
      .finally(() => {
        setPostsLoading(false);
      });
  }, [context.updatePosts]);
  return (
    <div style={{ padding: "3rem 0", backgroundColor: "#0f1b2b" }}>
      {postsLoading && (
        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <TailSpin width={60} height={60} color={colors.main} />
        </div>
      )}

      {posts.map((post) => (
        <>
          {post.midia ? (
            <FeedContainer>
              <div
                style={{
                  position: "absolute",
                  top: "0",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.3rem",
                  background:
                    "linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                  }}
                >
                  <UserImg
                    src={
                      post.image
                        ? imgBuffer(post.image)
                        : "https://icons.iconarchive.com/icons/elegantthemes/beautiful-flat/256/Profile-icon.png"
                    }
                  />
                  <h6>{post.name}</h6>
                </div>
              </div>
              {post.mime.includes("video") ? (
                <video style={{ width: "100%" }} controls autoPlay loop>
                  <source src={videoBuffer(post.midia)} type="video/mp4" />
                  Seu navegador não suporta o elemento de vídeo.
                </video>
              ) : (
                <MediaImg src={imgBuffer(post.midia)} alt="" />
              )}

              {post.description && (
                <Description>
                  <p>{post.description}</p>
                </Description>
              )}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  padding: "1rem 1rem 1rem 1rem",
                }}
              >
                {post.user_is_ong && (
                  <a
                    href={`https://wa.me/${
                      post.phone
                    }?text=Olá, vim do *Patinhas Felizes*\n Contexto: \n ${
                      post.description ? post.description : "Postagem"
                    }`}
                  >
                    <Button variant="contained">Saiba Mais</Button>
                  </a>
                )}
              </div>
            </FeedContainer>
          ) : (
            <FeedContainer>
              <div
                style={{
                  position: "absolute",
                  top: "0",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.3rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                  }}
                >
                  <UserImg
                    src={
                      post.image
                        ? imgBuffer(post.image)
                        : "https://icons.iconarchive.com/icons/elegantthemes/beautiful-flat/256/Profile-icon.png"
                    }
                  />
                  <h6>{post.name}</h6>
                </div>
              </div>

              <OnlyDescription style={{ paddingTop: "2.5rem" }}>
                {post.description}
              </OnlyDescription>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  padding: "1rem 1rem 1rem 1rem",
                }}
              >
                {post.user_is_ong && (
                  <a
                    href={`https://wa.me/${
                      post.phone
                    }?text=Olá, vim do *Patinhas Felizes*\n Contexto: \n ${
                      post.description ? post.description : "Postagem"
                    }`}
                  >
                    <Button variant="contained">Saiba Mais</Button>
                  </a>
                )}
              </div>
            </FeedContainer>
          )}
        </>
      ))}
    </div>
  );
};

export const UserImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
`;

export const MediaImg = styled.img`
  width: 100%;
  object-fit: contain;
`;

export const FeedContainer = styled.div`
  width: 100%;
  background-color: #121212;
  color: aliceblue;
  position: relative;
  margin-bottom: 0.5rem;
`;

export const Description = styled.div`
  padding: 2rem 0.3rem 1rem 0.3rem;
  p {
    font-size: 0.7rem;
    color: #838383;
    font-weight: bold;
  }
`;

export const OnlyDescription = styled.div`
  padding: 2rem 0.3rem 1rem 0.3rem;

  p {
    font-size: 0.9rem;
    color: #838383;
    font-weight: bold;
    background-color: #494949;
    padding: 0.5rem;
    border-radius: 5px;
  }
`;

export default Feed;
