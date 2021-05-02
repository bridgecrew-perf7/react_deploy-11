import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, getUserProfileList, addUserProfile, deleteUserProfile, setErrorNull } from '../../modules/github';
import GithubProfile from './GithubProfile';
import GithubProfileList from './GithubProfileList';
import { notification } from 'antd';

function GithubProfileContainer({history}) {
  const dispatch = useDispatch();
  const { profileData, profileLoading, profileError } = useSelector(state => state.githubReducer.profile);
  const { profileListData, profileListLoading, profileListError } = useSelector(state => state.githubReducer.profileList);
  const [name, setName] = useState('');
  const [profile, setProfile] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleNameSubmit = (event) => {
    event.preventDefault(); // Submit 이벤트 발생했을 때 새로고침 방지
    dispatch(getUserProfile(name));
  };

  const handleProfileAdd = useCallback((event) => {
    event.preventDefault(); // Submit 이벤트 발생했을 때 새로고침 방지
    const alreadyProfile = Array.isArray(profileListData) && profileListData.filter(profileListData => profileListData.id === profile.id);
    if (alreadyProfile.length !== 0) {
      notification['error']({
        message: '프로필 등록 실패',
        description: `${name} 님의 프로필이 이미 존재합니다.`
      });
    } else {
      dispatch(addUserProfile({ 
        profile,
      }));
      notification['success']({
        message: '프로필 등록',
        description: `${name} 님의 프로필이 추가되었습니다.`
      });
    }
    dispatch(getUserProfileList());
  }, [dispatch, profile, name, profileListData]);

  const handleClick = () => {
    dispatch(setErrorNull());
  };

  const handleDeleteProfile = (data, id) => {
    dispatch(deleteUserProfile(data, id));
    const deletedProfile = Array.isArray(data) && data.filter(data => data.id === id);
    notification['info']({
      message: '프로필 삭제',
      description: `${deletedProfile[0].login} 님의 프로필이 삭제되었습니다.`
    });
    dispatch(getUserProfileList());
  }

  useEffect(() => {
    if (profileData) {
      setProfile(profileData);
    }
  } , [setProfile, profileData]);

  useEffect(() => {
    dispatch(getUserProfileList());
  }, [dispatch]);

  return (
    <>
      <GithubProfile
        name={name}
        profileData={profileData}
        profileLoading={profileLoading}
        profileError={profileError}
        history={history}
        onNameChange={handleNameChange}
        onNameSubmit={handleNameSubmit}
        handleClick={handleClick}
        handleProfileAdd={handleProfileAdd}
        setProfile={setProfile}
        dispatch
      />
      <GithubProfileList 
        profileListData={profileListData}
        profileListLoading={profileListLoading}
        profileListError={profileListError}
        handleDeleteProfile={handleDeleteProfile}
        deleteUserProfile={deleteUserProfile}
        dispatch={dispatch}
      />
    </>
  );
}

export default GithubProfileContainer;