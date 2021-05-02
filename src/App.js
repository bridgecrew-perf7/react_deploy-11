import './App.css';
import CounterContainer from './components/Counter/CounterContainer';
import TodoContainer from './components/Todo/TodoContainer';
import PostListContainer from './components/Post/PostListContainer';
import PostItemContainer from './components/Post/PostItemContainer';
import { Route } from 'react-router-dom';
import GithubProfileContainer from './components/Github/GithubProfileContainer';
import Header from './components/Atomic/Header';

function App() {
  return (
    <div>
      <Header />

      <Route path="/counter" component={CounterContainer} />
      <Route path="/todos" component={TodoContainer} />
      <Route path="/posts" exact component={PostListContainer} />
      <Route path="/posts/:id" component={PostItemContainer} />
      <Route path="/github" component={GithubProfileContainer} />
    </div>
  );
}

export default App;
