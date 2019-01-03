import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import MainPage from './components/MainPageComponent/MainPageComponent';
import Login from './components/LoginComponent/LoginComponent';
import createSagaMiddleware from 'redux-saga';
import PostDetails from './components/PostDetailsComponent/PostDetailsComponent';
import AddPost from './components/AddPostComponent/AddPostComponent';
import UserDetails from './components/UserDetailsComponent/UserDetailsComponent';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import rootReducer from './state/reducers';
import sagas from './state/sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagas.forEach(sagaMiddleware.run);

class App extends PureComponent {
  componentDidMount() {
    document.title = 'Radosny Senior';
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path={ROUTES.LOGIN} component={Login} />
            <Route exact path={ROUTES.MAIN_PAGE} component={MainPage} />
            <Route exact path={ROUTES.ADD_POST} component={AddPost} />
            <Route exact path={ROUTES.SINGLE_POST} component={PostDetails} />
            <Route exact path={ROUTES.USER_DETAILS} component={UserDetails} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
