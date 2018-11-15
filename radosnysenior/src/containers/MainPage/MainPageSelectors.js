import { createSelector } from 'reselect';

const mainPageSelectorWorker = () => state => state.mainPageReducer;

const makeSelectHelloMessage = () =>
  createSelector(
    mainPageSelectorWorker(),
    substate => {
      return substate.helloMessage;
    },
  );

export { makeSelectHelloMessage };
