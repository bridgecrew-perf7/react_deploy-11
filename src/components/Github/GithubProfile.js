import React from 'react';
import './Github.css';
import 'antd/dist/antd.css';
import { Spin } from 'antd';
import { Result, Button } from 'antd';

function GithubProfile(
  { name, onNameChange, profileLoading, profileError, onNameSubmit, profileData, handleClick, handleProfileAdd}
) {

  if (profileLoading) return <div className="GithubProfileInfo"><Spin className="loading"/></div>;
  if (profileError) return <div className="GithubProfileInfo">
    <Result
      status="500"
      title="500"
      subTitle="검색 결과가 없습니다"
      extra={
        <Button 
          type="primary"
          onClick={handleClick}
        >
        재검색
        </Button>}
    />,
  </div>;

  return (
    <div>
      <form 
        className="GithubUsernameForm"
        onSubmit={onNameSubmit}
      >
        <input 
          onChange={onNameChange} 
          value={name} />
        <button 
          type="submit"
        >검색</button>   
      </form>

      {profileData
        ? 
          <>
          <h2><strong>{profileData.login}</strong> 검색 결과</h2>
          <div className="GithubProfileInfo">
            <div className="profile-head">
              <img className="image" src={profileData.avatar_url} alt="user thumbnail" />
              <div className="description">
                <div className="name">{'이름:'} { profileData.name}</div>
                <div className="location">{'지역:'}{profileData.location ? profileData.location:'몰랑!'}</div>
                <div className="college">{'학교:'}{profileData.company}</div>
              </div>
            </div>
            <p>{profileData.bio}</p>
            <div className="additional">
              <div>{profileData.blog !== '' && <a href={profileData.blog}>블로그</a>}</div>
                <button 
                    className="addButton" 
                    type="input"
                    onClick={handleProfileAdd}
                  >{'추가'}</button>
              </div>
            </div>
          </>
        : null}
    </div>
  );
}

export default GithubProfile;
