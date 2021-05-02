import React from 'react';
import { Link } from 'react-router-dom';


function PostList({ posts, text, onTextChange, onDescriptionChange, onSubmit, description }) {
  return (
    <>
      <form onSubmit={onSubmit}>
        <input onChange={onTextChange} value={text} />
        <input onChange={onDescriptionChange} value={description} />
        <button type="submit">등록</button>        
      </form>
      <ul>
          {posts.map(post => (
            <div key={post.id}>
              <li 
              >
                <Link to={`/posts/${post.id}`}>{post.title}</Link>
              </li>
            </div>
          ))}
        </ul>
    </>
  );
}

export default PostList;
