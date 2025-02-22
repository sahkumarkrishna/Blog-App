import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./redux/user/user.Slice"; // Ensure this path is correct
import sessionStorage from "redux-persist/es/storage/session";
import { persistReducer, persistStore } from "redux-persist";

// Redux Persist Config
const persistConfig = {
  key: "root",
  storage: sessionStorage,
};

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer, // Correctly reference userReducer
});

// Persist reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer, // Ensure correct reducer reference
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializability check for persisted state
    }),
});

// Persistor
export const persistor = persistStore(store);
