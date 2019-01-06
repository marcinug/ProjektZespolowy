import app from 'firebase/app';
import config from './config.js';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.database();
    this.fs = app.firestore();
    const settings = { timestampsInSnapshots: true };
    this.fs.settings(settings);
  }
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  allPosts = () => this.fs.collection('posts');

  allEvents = () => this.fs.collection('events');

  allUsers = () => this.fs.collection('users');

  addPost = post =>
    this.fs
      .collection('posts')
      .doc()
      .set(post);

  addUserToDatabase = user =>
    this.fs
      .collection('users')
      .doc()
      .set(user);

  addComment = (id, comments) =>
    this.fs
      .collection('posts')
      .doc(id)
      .update({ comments: comments });

  addNewUserRate = (id, rates) =>
    this.fs
      .collection('users')
      .doc(id)
      .update({ rates: rates });
}

export default Firebase;
