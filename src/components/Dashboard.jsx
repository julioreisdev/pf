import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../utils";
import PetsIcon from "@mui/icons-material/Pets";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import LoupeIcon from "@mui/icons-material/Loupe";
import SearchIcon from "@mui/icons-material/Search";
import { logout } from "../utils/logout";
import PostModal from "./PostModal";

const Dashboard = ({ children }) => {
  const [postIsOpen, setPostIsOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("authenticated") !== "true") {
      navigate("/");
    }
  }, []);
  return (
    <Container style={{ backgroundColor: "#0f1b2b" }}>
      <Header style={{ color: colors.main }}>
        <PetsIcon />
        <LogoutIcon onClick={logout} />
      </Header>
      <Content>{children}</Content>
      <Footer style={{ color: colors.main }}>
        <DynamicFeedIcon onClick={() => navigate("feed")} />
        <SearchIcon onClick={() => navigate("search")} />
        <LoupeIcon onClick={() => setPostIsOpen(true)} />
        <AccountCircleIcon
          onClick={() => navigate(`profile/${localStorage.getItem("user_id")}`)}
        />
      </Footer>
      <PostModal
        open={postIsOpen}
        onClose={() => setPostIsOpen(false)}
        update={() => {}}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const Content = styled.div`
  width: 100%;
`;

const Header = styled.header`
  width: 100%;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  background-color: #0f1b2b;
  z-index: 9999;
`;

const Footer = styled.footer`
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  background-color: #0f1b2b;
  width: 100%;
  border-radius: 8px 8px 0 0;
`;

export default Dashboard;
