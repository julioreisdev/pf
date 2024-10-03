import { useEffect, useState } from "react";
import styled from "styled-components";
import { Input } from "../style";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { imgBuffer } from "../utils";

const Search = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8008/users`).then((res) => {
      setUsers(res.data);
      console.log(res.data);
    });
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div
      style={{
        padding: "3rem 0.5rem",
        backgroundColor: "#0f1b2b",
        color: "#fff",
      }}
    >
      <Input
        placeholder="Pesquisar"
        type="text"
        style={{ marginBottom: "0.5rem" }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div
        style={{
          maxHeight: "78vh",
          overflowY: "scroll",
        }}
      >
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            onClick={() => navigate(`/dashboard/profile/${user.id}`)}
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
              src={
                imgBuffer(user.image) ||
                "https://icons.iconarchive.com/icons/elegantthemes/beautiful-flat/128/Profile-icon.png"
              }
              alt=""
            />
            <div>
              <UserName>{user.name}</UserName>
              <UserEmail>{user.email}</UserEmail>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const UserImage = styled.img`
  width: 30px;
  height: 30px;
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

export default Search;
