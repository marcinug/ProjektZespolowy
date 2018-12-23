import { createSelector } from 'reselect';

const postDetailsSelectorWorker = () => state => state.postDetailsReducer;

const makeSelectCurrentPostId = () =>
  createSelector(
    postDetailsSelectorWorker(),
    substate => {
      return substate.postId;
    },
  );

const makeSelectCurrentPost = () =>
  createSelector(
    postDetailsSelectorWorker(),
    substate => {
      return substate.post;
    },
  );

const makeSelectLoading = () =>
  createSelector(
    postDetailsSelectorWorker(),
    substate => {
      return substate.loading;
    },
  );

export { makeSelectCurrentPostId, makeSelectCurrentPost, makeSelectLoading };
