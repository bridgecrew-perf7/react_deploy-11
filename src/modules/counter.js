import { delay, put, takeEvery, takeLatest } from 'redux-saga/effects';

/* 동기 리덕스 */
// 액션 타입 정의
const SET_DIFFER = 'counter/SET_DIFFER';
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';
// 액션 객체 반환하는 액션 생성 함수 정의
export const setDiffer = (differ) => ({
  type: SET_DIFFER,
  differ,
})
export const increase = () => ({
  type: INCREASE,
})
export const decrease = () => ({
  type: DECREASE,
})

/* 비동기 */
// 비동기 액션 타입 정의
const INCREASE_ASYNC = 'INCREASE_ASYNC';
const DECREASE_ASYNC = 'DECREASE_ASYNC';
// 비동기 액션 생성 합수 정의
export const increaseAsync = () => ({
  type: INCREASE_ASYNC,
})
export const decreaseAsync = () => ({
  type: DECREASE_ASYNC,
})
// 제네레이터 함수인 사가 정의
function* increaseSaga() {
  yield delay(1000);
  yield put(increase());
}
function* decreaseSaga() {
  yield delay(1000);
  yield put(decrease());
}
// 모니터링 사가 정의
// 액션 타입을 모니터링하고 있다가, 특정 타입이 dispatch되면 사가를 실행시킨다
export function* counterSaga() {
  yield takeEvery(INCREASE_ASYNC, increaseSaga);
  yield takeLatest(DECREASE_ASYNC, decreaseSaga);
}

// 초기 상태 정의
const counterInitialState = {
  count: 0,
  differ: 1,
}

// 초기 상태와, 액션을 통해 새로운 상태 반환하는 리듀서 생성
export default function counterReducer(state=counterInitialState, action) {
  switch(action.type) {
    case SET_DIFFER:
      return {
        ...state,
        differ: action.differ,
      };

    case INCREASE:
      return {
        ...state,
        count: state.count + state.differ,
      };

    case DECREASE:
      return {
        ...state,
        count: state.count - state.differ,
      };

    default:
      return state;
  }
};
