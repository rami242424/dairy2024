import { React } from 'react';
import "../../src/index.css";
import "./css/common.css";
import "./css/main.css";


function IndexPage(){
  const today = new Date();
  const TodayDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;
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
            <button type="button" className="btn-logout">로그인</button>
          </div>
        </div>
      </header>
      <main className="main max-width">
        <section className="main-form">
          <h2 className="heart-title">{TodayDate} 오늘의 비밀일기</h2>
          <form className="form">
            <div>
              <label htmlFor="diary-title" className="a11y-hidden">제목</label>
              <input id="diary-title" type="text" placeholder="제목" />
            </div>
            <div>
              <label htmlFor="diary-content" className="a11y-hidden">내용</label>
              <textarea id="diary-content" placeholder="오늘의 비밀은 무엇인가요?"></textarea>
            </div>
            <button type="submit">작성하기</button>
          </form>
        </section>
        <section className="main-diary">
          <h2 className="a11y-hidden">일기 목록</h2>

          <ol className="list">
            <li>
              <article className="diary-article">
                {/* <!-- ::before --> */}
                <header>
                  <h3 className="article-title">이는 청춘의 것은 그들의 운다.
                    이는 청춘의 것은 그들의 운다.이는 청춘의 것은 그들의 운다.이는 청춘의 것은 그들의 운다.

                    이는 청춘의 것은 그들의 운다.
                  </h3>
                  <time className="article-time" datetime="2023-02-24">2023.02.24.THU</time>
                </header>
                <p className="article-content">이는 청춘의 것은 그들의 운다. 동산에는 수 것이 있는 뼈 이상의 쓸쓸하랴? 없으면, 날카로우나 뛰노는 풀이 아니다. 황금시대를 무한한 따뜻한
                  청춘이 같으며, 속잎나고, 운다. 위하여서
                  커다란 영락과 따뜻한 피고 안고, 뼈 봄바람이다. 가는 곧 아니한 눈에 얼마나 있음으로써 지혜는 대한 얼마나 봄바람이다. 때까지 위하여 가지에 열락의 것이다. 그림자는 꽃이 천하를 우리
                  찬미를 원대하고, 인생을 때에, 황금시대다. 목숨을 할지니, 청춘은 용기가 말이다.</p>
                {/* <!-- ::after --> */}

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
            <li>
              <article className="diary-article">
                {/* <!-- ::before --> */}
                <header>
                  <h3 className="article-title">
                    이는 청춘의 것은 그들의 운다.
                  </h3>
                  <time className="article-time" datetime="2023-02-24">2023.02.24.THU</time>
                </header>
                <p className="article-content">이는 청춘의 것은 그들의 운다. 동산에는 수 것이 있는 뼈 이상의 쓸쓸하랴? 없으면, 날카로우나 뛰노는 풀이 아니다. 황금시대를 무한한 따뜻한
                  청춘이 같으며, 속잎나고, 운다. 위하여서</p>
                  {/* <!-- ::after --> */}

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
          </ol>
        </section>
      </main>
    </div>
  );
}

export default IndexPage;

