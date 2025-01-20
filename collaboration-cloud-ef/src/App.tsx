import React from'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/LoginOrRegister';
import './App.scss';
import ItemCenter from './component/ItemCenter';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        {/** 子路由 */}
        <Route path="/Home" element={<Home />} >
          <Route path="" element={<Navigate to="item-center" />} />
          <Route path="item-center" element={<ItemCenter/>} />
          <Route path="my-projects" element={<div>我的项目组</div>} />
          <Route path="discussion-center" element={<div>交流中心</div>} />
          <Route path="personal-center" element={<div>个人中心</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
