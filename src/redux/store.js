import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import authSlice, { persistedAuthReducer } from "./authSlice";
import postsSlice from "./postsSlice";
import commentsSlice from "./commentsSlice";

const store = configureStore({
  reducer: {
    [authSlice.reducerPath]: persistedAuthReducer,
    [postsSlice.reducerPath]: postsSlice.reducer,
    [commentsSlice.reducerPath]: commentsSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export default { store, persistor };