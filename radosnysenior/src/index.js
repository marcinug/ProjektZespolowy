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
import mainPage from './containers/MainPage/MainPage';
import login from './containers/Login/Login';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagas.forEach(sagaMiddleware.run);

render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={login} />
        <Route path="/main" component={mainPage} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
