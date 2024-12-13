import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: null
};

try {
  // Vérification du stockage local (localStorage)
  const storedUserInfo = localStorage.getItem('userInfo');
  if (storedUserInfo) {
    initialState.userInfo = JSON.parse(storedUserInfo);
  }
} catch (error) {
  console.error('Error accessing localStorage:', error);
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      try {
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    },
    logout: (state) => {
      state.userInfo = null;
      try {
        localStorage.removeItem('userInfo');
      } catch (error) {
        console.error('Error removing from localStorage:', error);
      }
    },
    updateUserInfo: (state, action) => {
      state.userInfo = { ...state.userInfo, ...action.payload };
      try {
        localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
      } catch (error) {
        console.error('Error saving updated user info to localStorage:', error);
      }
    }
  }
});

export const { setCredentials, logout, updateUserInfo } = authSlice.actions;

export default authSlice.reducer;
