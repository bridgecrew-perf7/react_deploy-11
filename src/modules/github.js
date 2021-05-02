// github API 함수 가져오기
import { call, put, takeEvery } from '@redux-saga/core/effects';
import * as githubAPI from '../api/github';

// 액션 타입
export const GET_USER_PROFILE = 'github/GET_USER_PROFILE';
export const GET_USER_PROFILE_SUCCESS = 'github/GET_USER_PROFILE_SUCCESS';
export const GET_USER_PROFILE_ERROR = 'github/GET_USER_PROFILE_ERROR';

export const ADD_USER_PROFILE = 'ADD_USER_PROFILE';
export const ADD_USER_PROFILE_SUCCESS = 'ADD_USER_PROFILE_SUCCESS';
export const ADD_USER_PROFILE_ERROR = 'ADD_USER_PROFILE_ERROR';

export const GET_USER_PROFILE_LIST = 'GET_USER_PROFILE_LIST';
export const GET_USER_PROFILE_LIST_SUCCESS = 'GET_USER_PROFILE_LIST_SUCCESS';
export const GET_USER_PROFILE_LIST_ERROR = 'GET_USER_PROFILE_LIST_ERROR';

export const DELETE_USER_PROFILE = 'DELETE_USER_PROFILE';
export const DELETE_USER_PROFILE_SUCCESS = 'DELETE_USER_PROFILE_SUCCESS';
export const DELETE_USER_PROFILE_ERROR = 'DELETE_USER_PROFILE_ERROR';

export const SET_ERROR_NULL='github/SET_ERROR_NULL';

// 액션 생성 함수
export const getUserProfile =(name) => ({
  type: GET_USER_PROFILE,
  payload: name,
});
export const getUserProfileSuccess = () => ({
  type: GET_USER_PROFILE_SUCCESS
});
export const getUserProfileError = () => ({
  type: GET_USER_PROFILE_ERROR
});

export const getUserProfileList =() => ({
  type: GET_USER_PROFILE_LIST,
});
export const getUserProfileListSuccess = () => ({
  type: GET_USER_PROFILE_LIST_SUCCESS
});
export const getUserProfileListError = () => ({
  type: GET_USER_PROFILE_LIST_ERROR
});

export const addUserProfile =(data) => ({
  type: ADD_USER_PROFILE,
  payload: data,
});
export const addUserProfileSuccess = () => ({
  type: ADD_USER_PROFILE_SUCCESS
});
export const addUserProfileError = () => ({
  type: ADD_USER_PROFILE_ERROR
});

export const deleteUserProfile =(data, id) => ({
  type: DELETE_USER_PROFILE,
  payload: {
    id,
    data,
  },
});
export const deleteUserProfileSuccess = () => ({
  type: DELETE_USER_PROFILE_SUCCESS,
});
export const deleteUserProfileError = () => ({
  type: DELETE_USER_PROFILE_ERROR
});

export const setErrorNull = () => ({
  type: SET_ERROR_NULL,
});

function* getUserProfileSaga(action) {
  try {
    const name = action.payload;
    // API 함수에 넣어주고 싶은 인자는 call 함수의 두번째 인자부터 순서대로 넣어주면 됩니다.
    const profile = yield call(githubAPI.getUserProfile, name);
    yield put({
      type: GET_USER_PROFILE_SUCCESS,
      payload: profile,
    })
  } catch (error) {
    yield put({
      type: GET_USER_PROFILE_ERROR,
      error: true,
      payload: error,
    })
  }
}

function* getUserProfileListSaga() {
  try {
    const profileList = yield call(githubAPI.getGithubProfileList);
    yield put({
      type: GET_USER_PROFILE_LIST_SUCCESS,
      payload: profileList,
    })
  } catch (error) {
    yield put({
      type: GET_USER_PROFILE_LIST_ERROR,
      error: true,
      payload: error,
    })
  }
}

function* addUserProfileSaga(action) {
  try {
    const data = action.payload.profile;
    // API 함수에 넣어주고 싶은 인자는 call 함수의 두번째 인자부터 순서대로 넣어주면 됩니다.
    const profile = yield call(githubAPI.addGithubProfile, data);
    yield put({
      type: ADD_USER_PROFILE_SUCCESS,
      payload: profile,
    })
  } catch (error) {
    yield put({
      type: ADD_USER_PROFILE_ERROR,
      error: true,
      payload: error,
    })
  }
}

function* deleteUserProfileSaga(action) {
  try {
    const id = action.payload.id;
    const profileList = action.payload.data;
    // API 함수에 넣어주고 싶은 인자는 call 함수의 두번째 인자부터 순서대로 넣어주면 됩니다.
    yield call(githubAPI.deleteGithubProfile, id);
    yield put({
      type: DELETE_USER_PROFILE_SUCCESS,
      payload: {
        id,
        profileList,
      },
    })
  } catch (error) {
    yield put({
      type: DELETE_USER_PROFILE_ERROR,
      error: true,
      payload: error,
    })
  }
}

function* setErrorNullSaga() {
  try {
    yield put({
      type: SET_ERROR_NULL,
    })
  } catch (error) {
    console.log(error);
  }
}

export function* githubSaga() {
  yield takeEvery(GET_USER_PROFILE, getUserProfileSaga);
  yield takeEvery(ADD_USER_PROFILE, addUserProfileSaga);
  yield takeEvery(SET_ERROR_NULL, setErrorNullSaga);
  yield takeEvery(GET_USER_PROFILE_LIST, getUserProfileListSaga);
  yield takeEvery(DELETE_USER_PROFILE, deleteUserProfileSaga);
}

const initialState = {
  profile: {
    profileLoading: false,
    profileData: null,
    profileError: null
  },
  profileList: {
    profileListLoading: false,
    profileListData: null,
    profileListError: null
  }
}

export default function githubReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_PROFILE:
      return {
        ...state,
        profile: {
          profileLoading: true,
          profileData: null,
          profileError: null,
        }
      }

    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        profile: {
          profileLoading: false,
          profileData: action.payload,
          profileError: null
        }
      }

    case GET_USER_PROFILE_ERROR:
      return {
        ...state,
        profile: {
          profileLoading: false,
          profileData: null,
          profileError: action.error,
        }
      }

    case GET_USER_PROFILE_LIST:
      return {
        ...state,
        profileList: {
          profileListLoading: true,
          profileListData: null,
          profileListError: null,
        }
      }

    case GET_USER_PROFILE_LIST_SUCCESS:
      return {
        ...state,
        profileList: {
          profileListLoading: false,
          profileListData: action.payload,
          profileListError: null
        }
      }

    case GET_USER_PROFILE_LIST_ERROR:
      return {
        ...state,
        profileList: {
          profileListLoading: false,
          profileListData: null,
          profileListError: action.error,
        }
      }

    case ADD_USER_PROFILE:
      return {
        ...state,
        profileList: {
          profileListLoading: true,
          profileListData: null,
          profileListError: null,
        }
      }

    case ADD_USER_PROFILE_SUCCESS:
      const profile = action.payload;

      return {
        ...state,
        profileList: {
          ...state.profileList,
          profile
        }
      }

    case ADD_USER_PROFILE_ERROR:
      return {
        ...state,
        profileList: {
          profileListLoading: false,
          profileListData: null,
          profileListError: action.error,
        }
      }

    case DELETE_USER_PROFILE:
      return {
        ...state,
        profileList: {
          profileListLoading: true,
          profileListData: null,
          profileListError: null,
        }
      }

    case DELETE_USER_PROFILE_SUCCESS:
      const id = action.payload.id;
      const profileList = action.payload.profileList;
      const filteredProfileList = profileList.filter(profile => profile.id !== id);

      return {
        ...state,
        profileList: {
          ...filteredProfileList,
        }
      }

    case DELETE_USER_PROFILE_ERROR:
      return {
        ...state,
        profileList: {
          profileListLoading: false,
          profileListData: null,
          profileListError: action.error,
        }
      }

    case SET_ERROR_NULL:
      return {
        ...state,
        profile: {
          profileLoading: false,
          profileData: null,
          profileError: null
        }
      }

    default:
      return state;
  }
}