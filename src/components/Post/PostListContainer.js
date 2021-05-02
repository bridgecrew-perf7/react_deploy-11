import React, { useEffect, useState } from 'react';
import { 
  useSelector, 
  useDispatch 
} from 'react-redux';
import {
  getPosts,
  addPost,
} from '../../modules/posts';
import PostList from './PostList';

function PostListContainer() {
  // redux 내장 함수 정의
  const dispatch = useDispatch();

  // 리덕스에 등록된 상태 정의
  const { data, loading, error } = useSelector(state => state.postsReducer.posts);
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault(); // Submit 이벤트 발생했을 때 새로고침 방지
    dispatch(addPost({ 
      title: text, 
      body: description 
    }));
    setText('');
    setDescription('');
    dispatch(getPosts());
  }

  // 컴포넌트를 mount 시켜서 데이터를 가져온다
  useEffect (() => {
    dispatch(getPosts());
  }, [dispatch]);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;

  return (
    <PostList
      posts={data}
      text={text}
      description={description}
      onTextChange={handleTextChange}
      onDescriptionChange={handleDescriptionChange}
      onSubmit={onSubmit}
    />
  );
}

export default PostListContainer;
