import { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import { Input } from "../style";
import { debounce } from "../utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [users, setUsers] = useState([]);
  const search = useRef();
  const debouncedSearch = useCallback(
    debounce(() => {
      axios.get("http://localhost:8008/buscar", {
        params: { search: search.current.value },
      });
    }, 800),
    []
  );

  const navigate = useNavigate();

  return (
    <div
      style={{
        padding: "3rem 0.5rem",
        backgroundColor: "#0f1b2b",
        color: "#fff",
      }}
    >
      <Input
        ref={search}
        placeholder="Pesquisar"
        type="text"
        style={{ marginBottom: "0.5rem" }}
        onKeyUp={debouncedSearch}
      />

      <div
        onClick={() => navigate("/dashboard/profile/1")}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          cursor: "pointer",
          padding: "0.3rem",
          backgroundColor: "#121212",
        }}
      >
        <UserImage
          src="https://icons.iconarchive.com/icons/elegantthemes/beautiful-flat/128/Profile-icon.png"
          alt=""
        />
        <div>
          <UserName>Palloma</UserName>
          <UserEmail>pallominha@gmail.com</UserEmail>
        </div>
      </div>
      <div
        onClick={() => navigate("/dashboard/profile/2")}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          cursor: "pointer",
          padding: "0.3rem",
          backgroundColor: "#121212",
        }}
      >
        <UserImage
          src="https://icons.iconarchive.com/icons/elegantthemes/beautiful-flat/128/Profile-icon.png"
          alt=""
        />
        <div>
          <UserName>Júlio</UserName>
          <UserEmail>julio@gmail.com</UserEmail>
        </div>
      </div>
    </div>
  );
};

const UserImage = styled.img`
  width: 30px;
  height: 30px;
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

export default Search;
