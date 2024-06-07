import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('email') || null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('email', action.payload);
    },
    signOut: (state) => {
      state.token = null;
      localStorage.removeItem('email');
    },
  },
});

export const { signIn, signOut } = userSlice.actions;
export default userSlice.reducer;