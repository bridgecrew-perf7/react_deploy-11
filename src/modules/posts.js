// posts API 함수 가져오기
import { call, put, takeEvery } from '@redux-saga/core/effects';
import * as postsAPI from '../api/posts';

// 비동기 액션 타입
const GET_POSTS = 'GET_POSTS';
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
const GET_POSTS_ERROR = 'GET_POSTS_ERROR';

const GET_POST = 'GET_POST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_ERROR = 'GET_POST_ERROR';

const DELETE_POST = 'DELETE_POST';
const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
const DELETE_POST_ERROR = 'DELETE_POST_ERROR';

const ADD_POST = 'ADD_POST';
const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
const ADD_POST_ERROR = 'ADD_POST_ERROR';

// 액션 생성 함수
export const getPosts = () => ({
  type: GET_POSTS,
});
export const getPost = (id) => ({
  type: GET_POST,
  payload: id,
  meta: id,
});
export const deletePost = (data, id) => ({
  type: DELETE_POST,
  payload: {
    data,
    id,
  },
})
export const addPost = (data) => ({
  type: ADD_POST,
  payload: data,
})


// 제너레이터 사가 함수 정의
function* getPostsSaga() {
  try {
    const posts = yield call(postsAPI.getPosts);
    yield put({
      type: GET_POSTS_SUCCESS,
      payload: posts,
    })
  } catch (error) {
    yield put({
      type: GET_POSTS_ERROR,
      error: true,
      payload: error,
    })
  }
}
function* getPostSaga(action) {
  const param = action.payload;
  const id = action.meta;
  try {
    // API 함수에 넣어주고 싶은 인자는 call 함수의 두번째 인자부터 순서대로 넣어주면 됩니다.
    const post = yield call(postsAPI.getPostById, param);
    yield put({
      type: GET_POST_SUCCESS,
      payload: post,
      meta: id
    });
  }catch(error) {
    yield put({
      type: GET_POST_ERROR,
      error: true,
      payload: error,
      meta: id
    });
  }
}
function* deletePostSaga(action) {
  const id = action.payload.id;
  const post = action.payload.data
  yield call(postsAPI.deletePost, id);
  try {
    yield put({
      type: DELETE_POST_SUCCESS,
      payload: {
        id,
        post,
      }
    })
  } catch(error) {
    yield put({
      type: DELETE_POST_ERROR,
    })
  }
}
function* addPostSaga(action) {
  const data = action.payload;
  const post = yield call(postsAPI.addPost, data);
  try {
    yield put({
      type: ADD_POST_SUCCESS,
      payload: post,
    })
  } catch (error) {
    yield put({
      type: ADD_POST_ERROR,
      error: true,
      payload: error,
    })
  }
}

// 모니터링 사가 정의
export function* postsSaga() {
  yield takeEvery(GET_POSTS, getPostsSaga);
  yield takeEvery(GET_POST, getPostSaga);
  yield takeEvery(DELETE_POST, deletePostSaga);
  yield takeEvery(ADD_POST, addPostSaga);
}

const initialState = {
  posts: {
    loading: false,
    data: null,
    error: null
  },
  post: {
    loading: false,
    data: null,
    error: null
  }
};

export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: {
          loading: true,
          data: null,
          error: null
        }
      };
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: {
          loading: false,
          data: action.payload,
          error: null
        }
      };
    case GET_POSTS_ERROR:
      return {
        ...state,
        posts: {
          loading: false,
          data: null,
          error: action.error
        }
      };

    case GET_POST:
      return {
        ...state,
        post: {
          loading: true,
          data: null,
          error: null
        }
      };
    case GET_POST_SUCCESS:
      return {
        ...state,
        post: {
          loading: false,
          data: action.payload,
          error: null
        }
      };
    case GET_POST_ERROR:
      return {
        ...state,
        post: {
          loading: false,
          data: null,
          error: action.error
        }
      };

    case DELETE_POST:
      return {
        ...state,
        posts: {
          loading: true,
          data: null,
          error: null
        }
      };
    case DELETE_POST_SUCCESS:
      return { 
        ...state,
        posts: {
          loading: false,
          data: null,
          error: null
        }
      };
      
    case DELETE_POST_ERROR:
      return {
        ...state,
        posts: {
          loading: false,
          data: null,
          error: action.error
        }
      };

    case ADD_POST:
      return {
        ...state,
        posts: {
          loading: true,
          data: null,
          error: null
        }
      };
    case ADD_POST_SUCCESS:
      const post = action.payload;
      return { 
        ...state,
        posts: { 
          ...state.posts.data,
          post
        },
      };
      
    case ADD_POST_ERROR:
      return {
        ...state,
        posts: {
          loading: false,
          data: null,
          error: action.error
        }
      };
    default:
      return state;
  }
}