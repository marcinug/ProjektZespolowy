import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import {
  Route,
  Router,
  Redirect,
} from 'react-router';
import createSagaMiddleware from 'redux-saga';
import reducers from './state/reducers';
import sagas from './state/sagas';
import Example from './containers/example/example'

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware)
)

sagas.forEach(sagaMiddleware.run);

sagas.forEach(sagaMiddleware.run);

render(
  <Provider store={store}>
    <Example />
  </Provider>,
  document.getElementById('root')
)
// render(
//   <Provider store={store}>
//     <Router history={history}>
//       <Route path="/" component={example}>
//         <Route path="change_password" component={example} />
//         <Redirect from="*" to="/" />
//       </Route>
//     </Router>
//   </Provider>,
//   document.getElementById('root')
// );
