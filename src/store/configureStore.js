import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";

import rootReducer from "../reducers";
import rootSaga from "../sagas";

import createHistory from "history/createBrowserHistory";

export const history = createHistory();

const sagaMiddleware = createSagaMiddleware();

function configureStore(initialState = {}) {
    const middlewares = [sagaMiddleware];

    if (process.env.NODE_ENV !== "production") {
        middlewares.push(logger);
    }

    const enhancers = [applyMiddleware(...middlewares)];

    const store = createStore(rootReducer, initialState, compose(...enhancers));

    store.runSaga = sagaMiddleware.run;

    return store;
}

const store = configureStore();
store.runSaga(rootSaga);

export default store;
