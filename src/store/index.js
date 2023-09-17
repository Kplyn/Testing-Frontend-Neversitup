import { applyMiddleware, createStore, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import ssologinReducer from "./ssoLogin/ssoLoginReducer";
import todoReducer from "./todo/todoReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const reducers = combineReducers({
  sso: ssologinReducer,
  todo: todoReducer,
});

const persistConfig = {
  key: "main-root",
  storage,
};
const persistReduc = persistReducer(persistConfig, reducers);
const middleware = [thunk];

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(persistReduc, compose(applyMiddleware(...middleware), enhancer));

const Persistor = persistStore(store);
export { Persistor };
export default store;
