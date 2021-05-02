import React from 'react';
import './Github.css';
import 'antd/dist/antd.css';
import { Spin,  Divider } from 'antd';


function GithubProfileList(
  { profileListLoading, profileListError, profileListData, handleDeleteProfile, getUserProfileList, dispatch}
) {

  const handleDeleteClick = (id) => {
    handleDeleteProfile(profileListData, id);
  };

  if (profileListLoading) return <div className="GithubProfile"><Spin className="loading"/></div>;
  if (profileListError) return;

  return (
    <div>
      <h2>사용자 목록</h2>
      {profileListData && profileListData.forEach(profile => (
        profile ? 
        <>
          <div className="GithubProfile" key={profile.id}>
            <div className="profile-head">
              <img className="image" src={profile.avatar_url} alt="user thumbnail" />
              <div className="description">
                <div className="name">{'이름:'} { profile.name}</div>
                <div className="location">{'지역:'}{profile.location ? profile.location:'몰랑!'}</div>
                <div className="college">{'학교:'}{profile.company}</div>
              </div>
            </div>
          <p>{profile.bio}</p>
          <div className="additional">
            <div>{profile.blog !== '' && <a href={profile.blog}>블로그</a>}</div>
            <button
              className="addButton" 
              type="input"
              onClick={() => handleDeleteClick(profile.id)}
              >
                {'삭제'}
            </button>
          </div>
        </div>
          <div className="divide">
          <Divider/>
        </div>
        </>
    : <></>))}
    </div>
  );
}

export default GithubProfileList;
