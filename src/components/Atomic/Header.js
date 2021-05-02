import React from 'react';
import { Link } from 'react-router-dom';
import './Atomic.css';

function Header() {

  return (
    <div className="header">
      {/* <Link to="/counter">{'카운터'}</Link>
      <Link to="/todos">{'투두스'}</Link>
      <Link to="/posts">{'포스트'}</Link> */}
      <div className="title">{'github 프로필 검색 및 CRUD'}</div>
    </div>
  );
}

export default Header;
