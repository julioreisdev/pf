import { Link, useNavigate } from "react-router-dom";
import { ContainerLogin, FormLogin, Input } from "../style";
import { colors } from "../utils";
import { useEffect, useState } from "react";
import axios from "axios";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { LoadingButton } from "@mui/lab";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [invalidUser, setInvalidUser] = useState(false);
  const [business, setBusiness] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messageError, setMessageError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("authenticated") === "true") {
      navigate("/dashboard/feed");
    }
  }, []);

  function register() {
    setLoading(true);
    const payload = {
      email,
      name,
      password,
      is_ong: business,
    };

    if (phone) {
      payload["phone"] = phone;
    }

    axios
      .post("http://localhost:8008/register", payload)
      .then((res) => {
        localStorage.setItem("authenticated", "true");
        localStorage.setItem("name", res.data.name);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("user_id", res.data.user_id);
        localStorage.setItem("is_ong", res.data.is_ong);
        navigate("/dashboard/feed");
      })
      .catch((error) => {
        setInvalidUser(true);
        if (error.response.status === 409) {
          setMessageError("Usuário já existe!");
        } else {
          setMessageError("Algo deu errado!");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <ContainerLogin
      style={{
        backgroundColor: "#121212",
        color: colors.main,
        fontWeight: "bold",
      }}
    >
      <FormLogin
        onSubmit={(e) => {
          e.preventDefault();
          register();
        }}
      >
        <h1 style={{ color: colors.main }}>Cadastro</h1>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome"
          required
          type="text"
        />
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
          required
          type="email"
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          required
          type="password"
        />
        {business && (
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Telefone"
            required
            type="tel"
          />
        )}
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                value={business}
                onChange={() => setBusiness(!business)}
              />
            }
            label="Perfil empresarial"
          />
        </FormGroup>
        {invalidUser && <p style={{ color: "red" }}>{messageError}</p>}

        <LoadingButton
          sx={{ backgroundColor: colors.main, width: "100%" }}
          variant="contained"
          size="small"
          loading={loading}
          type="submit"
        >
          Cadastrar
        </LoadingButton>
        <Link style={{ color: colors.main }} to={"/login"}>
          Já tem uma conta? Faça login!
        </Link>
      </FormLogin>
    </ContainerLogin>
  );
}

export default Register;
