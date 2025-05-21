import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
  },
})

export const { increment, decrement, incrementByAmount } = userSlice.actions;

export default userSlice.reducer;