import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthorized: false,
    data: {
      userId: "",
      username: "",
      email: ""
    }
  },
  reducers: {
    createUser: (state, action) => {
      state.isAuthorized = true;
      state.data = action.payload;
    },
    deleteUser: (state) => {
      state.isAuthorized = false
      state.data = {
        userId: "",
        username: "",
        email: ""
      }
    }
  },
})

export const { createUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;