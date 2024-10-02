import styled from "styled-components";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Button } from "@mui/material";

const Feed = () => {
  return (
    <div style={{ padding: "3rem 0", backgroundColor: "#0f1b2b" }}>
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
            <h6>Patinhas Felizes</h6>
          </div>
          <Like>
            <FavoriteIcon />
          </Like>
        </div>
        <MediaImg
          src="https://petanjo.com/blog/wp-content/uploads/2021/03/labrador-retriever-3.png"
          alt=""
        />
        <Description>
          <p>
            {" "}
            Oi pessoal! Essa é a Lilica, diga tchau, Lilica! Lilica está
            disponível para adoção no centro de adoções de São Raimundo Nonato
            😘
          </p>
        </Description>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: "0 1rem 1rem 1rem",
          }}
        >
          <Button variant="contained">Saiba Mais</Button>
        </div>
      </FeedContainer>
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
            <h6>Júlio Cezar Reis</h6>
          </div>
          <Like>
            <FavoriteBorderIcon />
          </Like>
        </div>

        <OnlyDescription>
          <p> Estou a procura de um pet 🐶</p>
        </OnlyDescription>
      </FeedContainer>
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
            <h6>Polícia Militar Rural</h6>
          </div>
          <Like>
            <FavoriteIcon />
          </Like>
        </div>
        <MediaImg
          src="https://diariodonordeste.verdesmares.com.br/image/contentid/policy:1.3152323:1635252750/Tatu.jpg?f=default&$p$f=1abbdf5"
          alt=""
        />
      </FeedContainer>
    </div>
  );
};

export const UserImg = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  object-fit: contain;
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

export const Like = styled.div``;

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
