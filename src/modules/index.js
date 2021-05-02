import { combineReducers } from 'redux';
import counterReducer, { counterSaga } from './counter';
import todosReducer from './todos';
import postsReducer, { postsSaga } from './posts';
import { all } from 'redux-saga/effects';
import githubReducer, { githubSaga } from './github';

// 리듀서를 하나의 루트 리듀서에 합쳐주기
const rootReducer = combineReducers({
  counterReducer,
  todosReducer,
  postsReducer,
  githubReducer,
});

// 루트 사가를 만들어서, 여러 사가를 동시에 실행(all)시켜준다
export function* rootSaga() {
  yield all([
    counterSaga(),
    postsSaga(),
    githubSaga(),
  ]);
}

export default rootReducer;