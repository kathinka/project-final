import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Loading } from "../reusables/Loading";
import styled from "styled-components";
import { EgoButton } from "../reusables/Button"
import Globe from "../assets/Globe-ego.svg";
import logo from "../assets/globe-logo.svg";


const Container = styled.div`
overflow: hidden;
  color: var(--ego-dark);
  display: grid;
	grid-template-columns: 1vw  98vw 1vw;
	grid-template-rows: 50vh 50vh;
  background-color: var(--ego-white);
  grid-template-areas:
  "leftColumn leftColumn leftColumn"
  "rightColumn rightColumn rightColumn";

  @media (min-width: 1200px) {
    grid-template-columns: 50vw 50vw;
    grid-template-rows: 10vh 80vh 10vh;
    grid-template-areas:
    "leftColumn rightColumn"
 "leftColumn rightColumn"
  "leftColumn rightColumn";

  }
`;

const LeftColumn = styled.div`
  background: var(--ego-gradient-cutoff-mob2);
grid-area: leftColumn;
  display: grid;
  grid-template-columns: 1fr 10fr 1fr;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    ". . logo"
    "img img img"
    "img img img";

  @media (min-width: 1200px) {
background: var(--ego-gradient-cutoff-dt2);
  grid-template-areas:
    "logo "
    "img"
    ". ";
grid-column: 1;
grid-row: 1 /span 4;
  }
`;

const RightColumn = styled.div`
grid-area: rightColumn;
display:grid;
grid-template-columns: 1fr 10fr 1fr;
grid-template-rows: 1fr 2fr 1fr;
grid-template-areas:
  "title title title"
  "form form form"
  "link link link";
align-self:center;
  @media (min-width: 1200px) {
grid-column: 2;
grid-row: 2;

grid-template-areas:
  ". title . "
  ". form . "
  ". link . ";
  }
`;



const StyledLogo = styled.img`
grid-area: logo;
grid-column: 3;
max-width: 15vw;
height: auto;
margin:2vh 0 0 -15vw;
z-index: 3;
  @media (min-width: 1200px) {
grid-column:1;
margin:2vh -10vw 0 2vh;
  }

`;

const StyledImage = styled.img`
grid-area: image;
grid-column: 1/span 4;
grid:row: 1;
  z-index: 2;
  width: 115vw;
  margin: 0 0 0 -10vw;
  align-self: center;


  @media (min-width: 768px) {

  width: 100vw;
    margin: -5vh 0 0 0;
  }



  @media (min-width: 1200px) {
width: 50vw;
margin: 5vh 0 0 -2vw;
grid-row:1/span 2;
  }
`;



const FormContainer = styled.div`

grid-area: form;
align-self: center;
justify-self: center;
width: 60vw;
  @media (min-width: 1200px) {
 width:20vw;
  }
`;

const StyledH1 = styled.h1`
grid-area: title;
grid-column: 2;
grid-row: 1;
text-align: center;
justify-self: center;
align-self: center;
font-size: 2em;
color: var(--ego-dark);
  @media (min-width: 1200px) {
grid-column: 2;
grid-row: 1;

  }
`;

const FormGroup = styled.div`
  margin-top: 10px;
`;

const Input = styled.input`
  outline: none;
  border: none;
  width: 100%;
  padding: 10px 10px 10px 24px;
  color: var(--ego-dark);
  box-sizing: border-box;
  border-radius: 24px;
  border: 1px solid transparent;
  background: var(--ego-gradient-reversed);
  &:focus, &:active {
    background-color: var(--ego-lgt-green);
    border: 1px solid var(--ego-green);
  }
`;

const ErrorMessage = styled.div`
  margin-bottom: 15px;
  padding: 10px;
  color: var(--ego-dark);
  border-radius: 7px;
  border: 3px solid var(--ego-error);
`;

const BottomText = styled.div`
grid-area: link;
grid-row: 3;
grid-column:2;
font-size: 0.6em;
align-self: center;

  color: var(--ego-dark);
  p {
    text-align: center;
    margin: 5px 0;
  }
  a {
    color: var(--ego-dark);
    text-decoration: none;
    font-weight: bold;

    &:hover {
      color: var(--ego-purple);
    }
  }
  @media (min-width: 1200px) {
    grid-row: 4;
  position:fixed;
  bottom: 5vh;
 align-self: end;
 justify-self: center;
  }
`;

export const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const apikey = import.meta.env.VITE_API_KEY;
  const API = `${apikey}/user`;

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setMessage("Please fill in all fields");
      return;
    }
    if (password.length < 8) {
      setMessage("Password must be at least 8 characters long");
      return;
    } else if (password.length > 30) {
      setMessage("Password must be at most 30 characters long");
      return;
    }
    if (username.length < 3) {
      setMessage("Username must be at least 3 characters long");
      return;
    }
    if (username.length > 30) {
      setMessage("Username must be at most 30 characters long");
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setMessage("Email is invalid");
      return;
    } else if (email.length > 30) {
      setMessage("Email must be at most 30 characters long");
      return;
    }
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(API, {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (!response.ok) {
        setMessage(data.message);
        setLoading(false);
        return;
      }

      console.log(data);
      setMessage("Registration successful");
      setUsername("");
      setEmail("");
      setPassword("");
      navigate("/login");
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <LeftColumn>
        <StyledLogo src={logo} alt="logo" />
          <StyledImage src={Globe} alt="globe" />
      </LeftColumn>
      <RightColumn>
      <StyledH1>Sign up</StyledH1>
        <FormContainer>
          
          <form onSubmit={handleRegister}>
            {/* displayed on top of form as in figma design */}
            {message && <ErrorMessage>{message}</ErrorMessage>}
            <FormGroup>
              <Input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Name"
                required
                disabled={loading}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                disabled={loading}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                disabled={loading}
              />
            </FormGroup>
            {loading ? (
              <Loading />
            ) : (
              <EgoButton type="submit">Sign up</EgoButton>
            )}

          </form>
        </FormContainer>
        <BottomText>
          <p>
            Already have an account? <Link to="/login"> Log in </Link>
          </p>
        </BottomText>
      </RightColumn>
    </Container>
  );
};
