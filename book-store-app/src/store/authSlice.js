import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { isLoggedIn: false, name: 'Rushdy' },
  reducers: {
    logInLogOut(state, action) {
      state.isLoggedIn = !state.isLoggedIn;
    },
  },
});

export const { logInLogOut } = authSlice.actions;
export const authReducer = authSlice.reducer;
