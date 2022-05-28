import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import managersReducer from "./managersReducer";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from "./authReducer";

const persistConfig = {
    key: "contabilita-app",
    storage: storage,
};

const rootReducer = combineReducers({
    auth: authReducer,
    managers: managersReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(persistedReducer, composeWithDevTools());
export const persistor = persistStore(store);