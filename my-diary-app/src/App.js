import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import IndexPage from './components/IndexPage';
import LoginPage from './components/LoginPage';
import JoinPage from './components/JoinPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<IndexPage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/join' element={<JoinPage/>} />
      </Routes>
    </Router>


  );
}

export default App;
