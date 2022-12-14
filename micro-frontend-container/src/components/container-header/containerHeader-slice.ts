import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getHeader } from './containerHeader-API';

export interface ContainerHeaderState {
  value: string;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ContainerHeaderState = {
  value: "",
  status: 'idle',
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(getHeaderAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getHeaderAsync = createAsyncThunk(
  'containerHeader/getHeaderAsync',
  async () => {
    const response = await getHeader();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const containerHeaderSlice = createSlice({
  name: 'containerHeader',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // increment: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1;
    // },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getHeaderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getHeaderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
      })
      .addCase(getHeaderAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

// export const { increment, decrement, incrementByAmount } = containerHeaderSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectContainerHeader = (state: RootState) => state.containerHeader.value;

export default containerHeaderSlice.reducer;
