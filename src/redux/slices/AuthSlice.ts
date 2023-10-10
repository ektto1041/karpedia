import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { PublicUsersDto } from '@/types/user';
import { apis } from '@/utils/api';

type AuthStateStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

type AuthState = {
  status: AuthStateStatus;
  user: PublicUsersDto | null;
};

const initialState: AuthState = {
  status: 'idle',
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetSelfUser: (state) => {
      state.status = 'idle';
      state.user = null;
    },
    // change: (state, action: PayloadAction<string>) => {
    //   state.name = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSelfUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchSelfUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchSelfUser.rejected, (state, action) => {
        state.status = 'failed';
      });
  }
});

export const { resetSelfUser } = authSlice.actions

export const fetchSelfUser = createAsyncThunk('auth/fetchSelfUser', async () => {
  const response = await apis.getSelfUsers();
  return response.data;
});

// export const { change } = authSlice.actions;
export const selectAuthStatus = (state: RootState) => state.auths.status;
export const selectSelfUser = (state: RootState) => state.auths.user;

export default authSlice.reducer;