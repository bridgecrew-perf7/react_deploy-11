// 리액트 컴포넌트를 만들기 위해 React import
import React from 'react';

// 앱에 등록한 상태를 관리해주기 위해 redux 내장 함수 import
import { useSelector, useDispatch } from 'react-redux';
import Counter from './Counter';
// redux 내장 함수 dispatch를 사용할 액션 import
import { 
  setDiffer,
  increaseAsync, 
  decreaseAsync
} from '../../modules/counter';

function CounterContainer() {
  // store에 등록된 각 리듀서의 상태 가져오기
  // state의 값은 store.getState() 함수를 호출했을 때 나타나는 결과물과 동일합니다.
  const { count, differ } = useSelector(state => 
    state.counterReducer
  );

  // redux 내장 함수 정의
  const dispatch = useDispatch();

  // 액션들을 dispatch하는 함수 정의
  const onIncrease = () => {
    dispatch(increaseAsync());
  }
  const onDecrease = () => {
    dispatch(decreaseAsync());
  }
  const onSetDiffer = (differ) => {
    dispatch(setDiffer(differ));
  }

  return (
    <Counter
      count={count}
      differ={differ}
      onIncrease={onIncrease}
      onDecrease={onDecrease}
      onSetDiffer={onSetDiffer}
    />
  );
}

export default CounterContainer;
