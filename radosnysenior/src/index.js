import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import 'normalize.css';
import './assets/styles/global.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import createSagaMiddleware from 'redux-saga';
import reducers from './state/reducers';
import sagas from './state/sagas';
import MainPage from './containers/MainPage/MainPage';
import Login from './containers/Login/Login';
import PostDetails from './containers/PostDetails/PostDetais';
import AddPost from './containers/AddPost/AddPost';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagas.forEach(sagaMiddleware.run);

render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/main" component={MainPage} />
        <Route path="/add" component={AddPost} />
        <Route name="posts" exact path="/posts/:id" component={PostDetails} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
