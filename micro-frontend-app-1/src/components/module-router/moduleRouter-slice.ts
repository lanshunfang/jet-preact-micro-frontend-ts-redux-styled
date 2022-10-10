import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface ModuleRouterValue {
  moduleRoot: string;
  ROUTE_ABS: {
    [key in 'Home' | 'Counter' | 'Demo2']?: {
      path: string;
      isRoot?: boolean;
    }
  }
}
export interface ModuleRouter {
  value: ModuleRouterValue;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ModuleRouter = {
  value: {
    moduleRoot: '/',
    ROUTE_ABS: {}
  },
  status: 'idle',
};

export const moduleRouterSlice = createSlice({
  name: 'moduleRouter',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    updateRouter: (state, action: PayloadAction<Partial<ModuleRouterValue>>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = {
        ...state.value,
        ...action.payload
      };
    },
  },

});

export const { updateRouter } = moduleRouterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectModuleRouter = (state: RootState) => state.moduleRouter.value;

export default moduleRouterSlice.reducer;
