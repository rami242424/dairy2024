import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/common.css";
import LogoSVG from "../assets/LogoSVG"; 

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 로그인 버튼 클릭 시 실행되는 함수
  const handleLogin = (e) => {
    e.preventDefault();

    // 로컬 스토리지에서 가입된 유저 정보 가져오기
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    // 입력된 이메일과 비밀번호가 저장된 유저 정보와 일치하는지 확인
    const user = storedUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      // 로그인 성공: 가입된 사용자 정보에서 닉네임 가져와서 저장
      localStorage.setItem("nickname", user.nickname); // 'nickname'으로 저장된 닉네임을 저장
      localStorage.setItem("isLoggedIn", "true"); // 로그인 상태 저장

      // 메인 페이지로 이동
      navigate("/");
    } else {
      // 로그인 실패: 경고 메시지 표시
      alert("이메일 또는 비밀번호가 잘못되었습니다.");
    }
  };

  const handleJoin = () => {
    navigate("/join"); // 회원가입 페이지로 이동
  };

  return (
    <div>
      <header className="header">
        <div className="max-width">
          <h1>
            <a href="/">
              <img src="./img/logo.svg" alt="두근두근 비밀일기" />
            </a>
          </h1>

          <button onClick={handleJoin} className="btn-join">
            회원가입
          </button>
        </div>
      </header>
      <main className="login max-width">
        <h2 className="main-title">
          <LogoSVG />
          <strong>로그인</strong>
        </h2>

        {/* form 시작 */}
        <form className="form" onSubmit={handleLogin}>
          <div>
            <label htmlFor="user-email">이메일</label>
            <input
              id="user-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="user-pw">비밀번호</label>
            <input
              id="user-pw"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">로그인</button>
        </form>
      </main>
      <footer className="footer">
        <p>Copyright 2023. WENIV All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LoginPage;
