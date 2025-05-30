import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthorized: false,
    data: {}
  },
  reducers: {
    createUser: (state, action) => {
      state.isAuthorized = true;
      state.data = action.payload;
    },
    deleteUser: (state) => {
      state.isAuthorized = false
      state.data = {}
    }
  },
})

export const { createUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;