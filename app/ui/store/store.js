import createStore from "redux-zero";
import { applyMiddleware } from "redux-zero/middleware";
import { connect } from "redux-zero/devtools";

const initial = {
  accounts: {},
  contentInjected: false,
  notificationShowed: false,
  trx: {},
};

const logger = store => next => action => {
  console.log("current state", store.getState());
  return next(action);
};

export function preparedStore(localStore = {}) {
  const initialState = Object.assign({}, initial, localStore);
  const middlewares = [logger];

  if (connect) {
    middlewares.push(connect(initialState));
  }

  const store = createStore(initialState, applyMiddleware(...middlewares));

  return store;
}
