import { React, useEffect, useState } from 'react';
import "../../src/index.css";
import "./css/common.css";
import "./css/main.css";
import { useNavigate } from 'react-router-dom';


function IndexPage(){
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [diaries, setDiaries] = useState([]);


  // localStorage에서 일기 목록 불러오기
  useEffect(()=> {
    const storedDiaries = JSON.parse(localStorage.getItem('diaries')) || [];
    setDiaries(storedDiaries);
  }, []);

  const today = new Date();
  const TodayDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;

  const loginBtn  = function(){
    navigate('/login');
  }

  // form이 submit 될때 
  const submitBtn = function(e){
    e.preventDefault();
    if(!title || !content){
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    // 저장하기위해 새로운 객체 생성
    const newDiary = {
      id : Date.now(),
      title : title,
      content: content,
      data: TodayDate
    };

    // 새로운 다이어리 만들기
    const updatedDiaries = [...diaries, newDiary];
    setDiaries(updatedDiaries);

    // 로컬에 새로운 다이어리 저장
    localStorage.setItem('diaries', JSON.stringify(updatedDiaries));

    // 저장 후 제목과 내용을 비우기
    setTitle('');
    setContent('');
  }

  return (
    <div>
      <header className="header">
        <div className="max-width">
          <h1>
            <a href="./">
              <img src="/img/logo.svg" alt="두근두근 비밀일기" />
            </a>
          </h1>
          <div className="login-text">
            <p>환영합니다 <strong>게스트</strong>님!</p>
            <button onClick={loginBtn} type="button" className="btn-logout">로그인</button>
          </div>
        </div>
      </header>
      <main className="main max-width">
        <section className="main-form">
          <h2 className="heart-title">{TodayDate} 오늘의 비밀일기</h2>
          <form className="form" onSubmit={submitBtn}>
            <div>
              <label htmlFor="diary-title" className="a11y-hidden">제목</label>
              <input 
                id="diary-title" 
                type="text" 
                placeholder="제목" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="diary-content" className="a11y-hidden">내용</label>
              <textarea 
                id="diary-content" 
                placeholder="오늘의 비밀은 무엇인가요?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required 
              >
              </textarea>
            </div>
            <button type="submit">작성하기</button>
          </form>
        </section>
        <section className="main-diary">
          <h2 className="a11y-hidden">일기 목록</h2>

          <ol className="list">
            {diaries.map(diary => (

              <li key={diary.id}>
              <article className="diary-article">
                <header>
                  <h3 className="article-title">{diary.title}</h3>
                  <time className="article-time" datetime="2023-02-24">{diary.data}</time>
                </header>
                <p className="article-content">{diary.content}</p>
                <div className="button-group">
                  <button type="button">
                    <img src="/img/icon-edit.svg" alt="수정" />
                  </button>
                  <span></span>
                  <button type="button">
                    <img src="/img/icon-delete.svg" alt="삭제" />
                  </button>
                </div>
              </article>
            </li>
            ))}
          </ol>
        </section>
      </main>
    </div>
  );
}

export default IndexPage;

