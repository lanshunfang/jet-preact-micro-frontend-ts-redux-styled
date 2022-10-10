import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import counterReducer from '../components/counter/counter-slice';
import moduleRouterReducer from '../components/module-router/moduleRouter-slice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    moduleRouter: moduleRouterReducer
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
