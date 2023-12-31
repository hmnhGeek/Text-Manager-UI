// src/redux/store.ts
import { configureStore, Dispatch } from '@reduxjs/toolkit';
import thunk, {ThunkMiddleware, ThunkAction} from 'redux-thunk';
import authReducer from './reducers/authReducer';
import { Action } from '@reduxjs/toolkit';
import platformsReducer from './reducers/platformsReducer';
import titlesReducer from './reducers/titlesReducer';
import addPlatformReducer from './reducers/addPlatformReducer';
import addPromptReducer from './reducers/addPromptReducer';
import encryptionReducer from './reducers/encryptionReducer';

// Custom Store type to include Dispatch with RootAction
export interface CustomStore {
  dispatch: Dispatch;
}

const store = configureStore({
  reducer: {
    auth: authReducer,
    platforms: platformsReducer,
    titles: titlesReducer,
    addPlatform: addPlatformReducer,
    addPrompt: addPromptReducer,
    encryption: encryptionReducer,
    // Add other slices if needed
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk as ThunkMiddleware),
  // Add other configuration options as needed
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;