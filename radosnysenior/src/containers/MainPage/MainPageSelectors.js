import { createSelector } from 'reselect';

const mainPageSelectorWorker = () => state => state.mainPageReducer;

const makeSelectHelloMessage = () =>
  createSelector(
    mainPageSelectorWorker(),
    substate => {
      return substate.helloMessage;
    },
  );

const makeSelectPosts = () =>
  createSelector(
    mainPageSelectorWorker(),
    substate => {
      return substate.posts;
    },
  );

export { makeSelectHelloMessage, makeSelectPosts };
