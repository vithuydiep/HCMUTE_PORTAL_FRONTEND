const { createSlice } = require('@reduxjs/toolkit')

const drawerSlice = createSlice({
  name: 'drawer',
  initialState: {
    isShow: false,
  },
  reducers: {
    openDrawer: (state) => {
      state.isShow = true
    },
    closeDrawer: (state) => {
      state.isShow = false
    },
  },
})

export const { openDrawer, closeDrawer } = drawerSlice.actions
export default drawerSlice.reducer
