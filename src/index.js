import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware } from 'redux';
import rootReducer, { rootSaga } from './modules';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import ReduxThunk from 'redux-thunk';


const customHistory = createBrowserHistory();
// saga 미들웨어 만들어주기
const sagaMiddleware = createSagaMiddleware({
  context: {
    history: customHistory
  }
});

// 리듀서를 통해 상태 관리할 스토어에 만들어주기
const store = createStore(
  rootReducer,
  applyMiddleware(
    ReduxThunk.withExtraArgument({ history: customHistory }),
    sagaMiddleware, // 리덕스 스토어에 saga 미들웨어 적용
    logger, // 리덕스 스토어에 logger 미들웨어 적용
  ),
);

// 루트 사가를 실행시켜준다
sagaMiddleware.run(rootSaga);

// 앱에 스토어 등록해주기
// Provider로 store를 넣어서 App 을 감싸게 되면 우리가 렌더링하는 그 어떤 컴포넌트던지 리덕스 스토어에 접근 할 수 있게 된다.
ReactDOM.render(
  <Router history={customHistory}>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
