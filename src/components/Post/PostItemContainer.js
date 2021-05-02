import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPost, deletePost } from '../../modules/posts';
import PostItem from './PostItem';

function PostItemContainer({ match, history }) {
  const { data, loading, error } = useSelector(state => state.postsReducer.post);
  const dispatch = useDispatch();

  const { id } = match.params; // URL 파라미터 조회하기

  const handleDeletePost = (id) => {
    dispatch(deletePost(data, id));
    history.push('/posts');
  }

  useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch]);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;

  return <PostItem post={data} postId={id} deletePost={handleDeletePost} />;
}

export default PostItemContainer;