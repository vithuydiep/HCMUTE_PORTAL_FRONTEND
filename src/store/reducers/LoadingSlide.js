const { createSlice } = require('@reduxjs/toolkit')

const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    isLoading: false,
  },
  reducers: {
    showLoading: (state) => {
      state.isLoading = true
    },
    closeLoading: (state) => {
      state.isLoading = false
    },
  },
})

export const { showLoading, closeLoading } = loadingSlice.actions
export default loadingSlice.reducer
