import createIdbStorage from "@piotr-cz/redux-persist-idb-storage/src";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistCombineReducers,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "reduxjs-toolkit-persist";
import defaultStorage from "reduxjs-toolkit-persist/es/storage";
import autoMergeLevel1 from "reduxjs-toolkit-persist/lib/stateReconciler/autoMergeLevel1";
import main from "./main";
import message from "./message";

const persistConfig = {
  key: "root",
  storage: globalThis.indexedDB
    ? createIdbStorage({ name: "bea", storeName: "store" })
    : defaultStorage,
  stateReconciler: autoMergeLevel1,
};

const persistedReducer = persistCombineReducers(persistConfig, {
  main,
  message,
});

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);
