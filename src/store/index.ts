/* eslint-disable import/no-anonymous-default-export */
import { createStore, applyMiddleware, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import PokemonStoreReducer from "./storeReducer/pokemon";

const persistConfig = {
	key: "root",
	storage,
	blacklist: ["form"],
};

const rootReducer = combineReducers({
	store: persistReducer(persistConfig, PokemonStoreReducer),
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export const persistor = persistStore(store);

store.subscribe(() => {
	// console.log("==STORE==", store.getState());
});

export default store;
