import { React, useEffect, useState } from 'react';
import "../../src/index.css";
import "./css/common.css";
import "./css/main.css";
import { useNavigate } from 'react-router-dom';


function IndexPage(){
    const navigate = useNavigate();
    const loginBtn = () => navigate('/login');
    const Today = new Date();
    const TodayDate = `
        ${Today.getFullYear()}.${(Today.getMonth() + 1).toString().padStart(2, "0")}.${(Today.getDate()).toString().padStart(2, "0")}
    `;
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // localStorage에서 일기 목록 불러오기


    // form이 submit 될때 
    const submitBtn = function(e){
        e.preventDefailt();
        if(!title || !content){
            alert("제목과 내용을 모두 입력하세요.");
            return;
        }

        if(editId) {
        // 수정 중인 경우, 기존 일기를 업데이트

        } else {

        // 새로운 객체 생성(for 저장)
        const newDiary = {
            id : Date.now(),
            title : title,
            content : content,
            data : TodayDate            
        };

        // 새로운 일기
        

        // 로컬에 새 일기 저장

        }
        // 저장 후 => 제목과 내용 칸 비우기
        setTitle('');
        setContent('');
    }

  // 수정버튼 클릭시
    function editBtn(id){

    }

  // 삭제버튼 클릭시
    function delBtn(id){

    }

  // 취소버튼 틀릭시 폼 초기화


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
                  <time className="article-time" datetime="2023-02-24">{diary.data}</time>
                </header>
                <p className="article-content">{diary.content}</p>
                <div className="button-group">
                  {/* <button type="button" onClick={() => console.log(diary.id)}> */}
                  <button type="button">
                    <img src="/img/icon-edit.svg" alt="수정" />
                  </button>
                  <span></span>
                  <button type="button" >
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

