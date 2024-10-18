import { Button, Dialog, DialogContent } from "@mui/material";
import {
  Description,
  FeedContainer,
  MediaImg,
  OnlyDescription,
  UserImg,
} from "./Feed";
import { imgBuffer, videoBuffer } from "../utils";

const MediaPreview = ({ open, onClose, post }) => {
  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogContent sx={{ padding: "0.5rem", backgroundColor: "#0f1b2b" }}>
          <div style={{ overflowY: "auto", maxHeight: "550px" }}>
            {post.midia ? (
              <FeedContainer style={{ width: "250px" }}>
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
                      "linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0))",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem",
                    }}
                  >
                    <UserImg src="https://icons.iconarchive.com/icons/elegantthemes/beautiful-flat/256/Profile-icon.png" />
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
                    <UserImg src="https://icons.iconarchive.com/icons/elegantthemes/beautiful-flat/256/Profile-icon.png" />
                    <h6>{post.name}</h6>
                  </div>
                </div>

                <OnlyDescription style={{ width: "250px" }}>
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
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MediaPreview;
