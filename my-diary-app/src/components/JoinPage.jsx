import React, { useState, useEffect } from "react";
import "./css/common.css";
import { useNavigate, Link } from "react-router-dom";
import LogoSVG from "../assets/LogoSVG"; 

function JoinPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    // 컴포넌트가 처음 렌더링될 때 로컬스토리지에서 사용자 데이터를 가져옴
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  // 로그인폼 유효성 검사
  const validateLoginForm = (currentUsers) => {
    const errors = {}; // 유효성 검사에서 발생한 오류를 객체로 저장

    if (!emailRegex.test(email)) {
      errors.email = "올바른 이메일 형식을 입력하세요.";
    }

    if (password.length < 6) {
      errors.password = "비밀번호는 최소 6자 이상이어야 합니다.";
    }

    if (nickname.length < 2) {
      errors.nickname = "닉네임은 최소 2자 이상이어야 합니다.";
    }

    // 중복된 이메일 검증
    if (currentUsers.some((user) => user.email === email)) {
      errors.email = "이미 사용중인 이메일입니다.";
    }

    // 중복된 닉네임 검증
    if (currentUsers.some((user) => user.nickname === nickname)) {
      errors.nickname = "이미 사용중인 닉네임입니다.";
    }

    setErrors(errors); // 오류 상태 업데이트
    return Object.keys(errors).length === 0; // 오류가 없으면 true 반환
  };

  // 사용자가 폼을 제출했을 때 실행 (유효성검사>통과시 사용자 데이터를 로컬스토리지에 저장>로그인페이지로 이동)
  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    if (validateLoginForm(storedUsers)) {
      // 유효성 검사를 통과하면 로컬 스토리지에 저장
      const newUser = { email, password, nickname };
      const updatedUsers = [...storedUsers, newUser];

      localStorage.setItem("users", JSON.stringify(updatedUsers));
      localStorage.setItem("nickname", nickname); // 닉네임 저장
      localStorage.setItem("isLoggedIn", "true"); // 로그인 상태 저장

      navigate("/"); // 메인 페이지로 이동
    }
  };

  return (
    <div>
      <header className="header">
        <div className="max-width">
          <h1>
            <Link to="/">
              <img src="./img/logo.svg" alt="두근두근 비밀일기" />
            </Link>
          </h1>
          <button onClick={() => navigate("/login")} className="btn-login">
            로그인
          </button>
        </div>
      </header>
      <main className="login max-width">
        <h2 className="main-title">
          <LogoSVG />
          <strong>회원가입</strong>
        </h2>

        <form className="form">
          <div>
            <label htmlFor="user-email">이메일</label>
            <input
              id="user-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="user-pw">비밀번호</label>
            <input
              id="user-pw"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div>
            <label htmlFor="user-nick">닉네임</label>
            <input
              id="user-nick"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임 입력"
            />
            {errors.nickname && <p className="error">{errors.nickname}</p>}
          </div>
          <button onClick={handleSubmit} type="submit">
            회원가입
          </button>
        </form>
      </main>
      <footer className="footer">
        <p>Copyright 2023. WENIV All rights reserved.</p>
      </footer>
    </div>
  );
}

export default JoinPage;
