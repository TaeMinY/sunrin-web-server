import styled, { css } from "styled-components";
import IntroImage from "../assets/images/intro.svg";
import { useState } from "react";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignInContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const SignInTitle = styled.div`
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
`;

const SignInText = styled.div`
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
`;

function SignIn() {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const signInUser = async () => {
    try {
      if (id == "" || password == "") {
        alert("빈칸을 모두 채워주세요.");
        return;
      }

      const response = await axios.post("http://localhost:3000/user/signin", {
        id: id,
        password: password,
      });

      localStorage.setItem("accessToken", response.data.data.accessToken);
      localStorage.setItem("refreshToken", response.data.data.refreshToken);

      navigate("/");
    } catch (e) {
      alert("아이디와 패스워드를 확인해주세요.");
    }
  };

  return (
    <SignInContainer>
      <img src={IntroImage} alt="" />
      <SignInTitle>로그인</SignInTitle>
      <SignInText>나만의 영어 단어장을 만들어보세요!</SignInText>
      {/* INPUT 컴퍼넌트 사용 ( 아이디, 비밀번호 ) */}
      <Input
        value={id}
        onChange={(e) => {
          setId(e.target.value);
        }}
        placeholder="아이디"
        style={css`
          margin-bottom: 4px;
          margin-top: 8px;
        `}
      ></Input>
      <Input
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="비밀번호"
        type="password"
        style={css`
          margin-bottom: 24px;
        `}
      ></Input>
      {/* 로그인, 회원가입 버튼 */}
      <Button
        onClick={signInUser}
        type="main"
        style={css`
          margin-bottom: 4px;
        `}
      >
        로그인
      </Button>
      <Button
        onClick={() => {
          navigate("/signup");
        }}
        type="main-reversal"
      >
        회원가입
      </Button>
    </SignInContainer>
  );
}

export default SignIn;
