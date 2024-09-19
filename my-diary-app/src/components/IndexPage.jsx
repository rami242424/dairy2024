import { React, useEffect, useState } from 'react';
import "../../src/index.css";
import "./css/common.css";
import "./css/main.css";
import { useNavigate } from 'react-router-dom';

function IndexPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [diaries, setDiaries] = useState([]);
  const [editId, setEditId] = useState(null); 

  // 로그인한 유저의 닉네임 가져오기
  const nickname = localStorage.getItem('nickname') || '게스트'; 
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; 

  // 로그아웃 처리
  const handleLogout = () => {
    localStorage.removeItem('nickname');
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  useEffect(() => {
    const storedDiaries = JSON.parse(localStorage.getItem('diaries')) || [];
    setDiaries(storedDiaries);
  }, []);

  const today = new Date();
  const TodayDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${today.getDate().toString().padStart(2, '0')}`;

  const submitBtn = (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    if (editId) {
      const updatedDiaries = diaries.map(diary => 
        diary.id === editId ? { ...diary, title, content, data: TodayDate } : diary
      );
      setDiaries(updatedDiaries);
      localStorage.setItem('diaries', JSON.stringify(updatedDiaries));
      setEditId(null);
    } else {
      const newDiary = {
        id: Date.now(),
        title,
        content,
        data: TodayDate,
      };
      const updatedDiaries = [...diaries, newDiary];
      setDiaries(updatedDiaries);
      localStorage.setItem('diaries', JSON.stringify(updatedDiaries));
    }
    setTitle('');
    setContent('');
  };

  // 수정버튼 클릭 시
  const editBtn = (id) => {
    const diaryEdit = diaries.find(diary => diary.id === id);
    if (diaryEdit) {
      setTitle(diaryEdit.title);
      setContent(diaryEdit.content);
      setEditId(id);
    }
  };

  // 삭제버튼 클릭 시
  const delBtn = (id) => {
    const updatedDiaries = diaries.filter(diary => diary.id !== id);
    setDiaries(updatedDiaries);
    localStorage.setItem('diaries', JSON.stringify(updatedDiaries));
    setTitle(''); 
    setContent('');
    setEditId(null);
  };

  // 취소 버튼 클릭 시 폼 초기화
  const cancelEdit = () => {
    setTitle('');
    setContent('');
    setEditId(null);
  };

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
            <p>환영합니다 <strong>{nickname}</strong>님!</p>
            {isLoggedIn ? (
              <button onClick={handleLogout} className="btn-logout">로그아웃</button>
            ) : (
              <button onClick={() => navigate('/login')} className="btn-login">로그인</button>
            )}
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
            <div className="form-button">
              <button type="submit">작성하기</button>
              {editId && (
                <button type="button" onClick={cancelEdit}>취소</button>
              )}
            </div>
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
                    <time className="article-time" dateTime={diary.data}>{diary.data}</time>
                  </header>
                  <p className="article-content">{diary.content}</p>
                  <div className="button-group">
                    <button type="button" onClick={() => editBtn(diary.id)}>
                      <img src="/img/icon-edit.svg" alt="수정" />
                    </button>
                    <span></span>
                    <button type="button" onClick={() => delBtn(diary.id)}>
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
