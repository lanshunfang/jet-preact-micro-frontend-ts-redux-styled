import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import containerHeaderReducer from '../components/container-header/containerHeader-slice';

export const store = configureStore({
  reducer: {
    containerHeader: containerHeaderReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
