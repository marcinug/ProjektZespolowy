import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
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
import App from './App';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
// import { createStore } from 'redux';
import rootReducer from './store/reducers/rootReducer';
// import rootReducer from './store/reducers/rootReducer';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import fbConfig from './config/fbConfig';

// const sagaMiddleware = createSagaMiddleware();

//const store = createStore(rootReducer, /*applyMiddleware(sagaMiddleware)*/);
// const store = createStore(reducers, applyMiddleware(sagaMiddleware));
const store = createStore(rootReducer, 
    compose(
      applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
      reduxFirestore(fbConfig),
      reactReduxFirebase(fbConfig)
    )
  );

// sagas.forEach(sagaMiddleware.run);

render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/main" component={MainPage} />
        <Route path="/add" component={AddPost} />
        <Route name="posts" exact path="/posts/:id" component={PostDetails} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
