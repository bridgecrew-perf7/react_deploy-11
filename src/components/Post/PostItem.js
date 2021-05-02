import React from 'react';

function PostItem({ post, postId, deletePost }) {
  const { title, body } = post;

  const handleClick = () => {
    deletePost(postId);
  }

  return (
    <div>
      <h1>{title}</h1>
      <p>{body}</p>
      <input type="button" value="삭제" onClick={handleClick} />
    </div>
  );
}

export default PostItem;
