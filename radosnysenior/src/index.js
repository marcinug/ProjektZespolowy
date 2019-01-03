import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'normalize.css';
import './assets/styles/global.css';
import * as serviceWorker from './serviceWorker';
import Firebase, { FirebaseContext } from './components/Firebase';

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
