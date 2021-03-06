import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import MainPage from './components/MainPageComponent/MainPageComponent';
import Login from './components/LoginComponent/LoginComponent';
import SignUp from './components/SignUpComponent/SignUpComponent';
import createSagaMiddleware from 'redux-saga';
import PostDetails from './components/PostDetailsComponent/PostDetailsComponent';
import EventDetails from './components/EventDetailsComponent/EventDetailsComponent';
import AddPost from './components/AddPostComponent/AddPostComponent';
import UserDetails from './components/UserDetailsComponent/UserDetailsComponent';
import Events from './components/EventsComponent/EventsComponent';
import AddEvent from './components/AddEventComponent/AddEventComponent';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import * as ROUTES from './constants/routes';
import rootReducer from './state/reducers';
import sagas from './state/sagas';
import vers from '../package.json';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagas.forEach(sagaMiddleware.run);

class App extends PureComponent {
  componentDidMount() {
    document.title = 'Radosny Senior';
    window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <p className="version">v.: {vers.version}</p>
            <Switch>
              <Route exact path={ROUTES.LOGIN} component={Login} />
              <Route exact path={ROUTES.MAIN_PAGE} component={MainPage} />
              <Route exact path={ROUTES.ADD_POST} component={AddPost} />
              <Route exact path={ROUTES.SINGLE_POST} component={PostDetails} />
              <Route exact path={ROUTES.USER_DETAILS} component={UserDetails} />
              <Route exact path={ROUTES.SIGN_UP} component={SignUp} />
              <Route exact path={ROUTES.EVENTS} component={Events} />
              <Route exact path={ROUTES.ADD_EVENT} component={AddEvent} />
              <Route
                exact
                path={ROUTES.SINGLE_EVENT}
                component={EventDetails}
              />
              <Route render={() => <Redirect to={ROUTES.MAIN_PAGE} />} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
