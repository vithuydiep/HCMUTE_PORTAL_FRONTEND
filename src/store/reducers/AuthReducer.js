import { toastError, toastSuccess } from '../../helper/toastHelper'

const { createSlice } = require('@reduxjs/toolkit')

const authReducer = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    logging: false,
    currentUser: null,
    currentUserEditForAdmin: null,
  },
  reducers: {
    login: (state) => {
      state.logging = true
    },
    loginSuccess: (state, action) => {
      state.isLoggedIn = true
      state.currentUser = action.payload
    },
    loginFailed: (state) => {
      state.logging = false
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.currentUser = null
    },
    refreshToken: () => {},
    getUser: () => {},
    getUserSuccess: (state, action) => {
      state.currentUser = action.payload
    },
    getUserFail: (state, action) => {
      const { error } = action.payload
      toastError(error)
    },
    updateInfoUser: () => {},
    updateInfoUserSuccess: (state, action) => {
      state.currentUser = action.payload
      toastSuccess('Chỉnh sửa thông tin thành công!')
    },
    updateInfoUserFail: (state, action) => {
      const { error } = action.payload
      toastError(error)
    },
    updateInfoUserEditAdmin: () => {},
    updateInfoUserEditAdminSuccess: (state, action) => {
      state.currentUserEditForAdmin = action.payload
      toastSuccess('Chỉnh sửa thông tin thành công!')
    },
    updateInfoUserEditAdminFail: (state, action) => {
      const { error } = action.payload
      toastError(error)
    },
    fetchUserEditForAdmin: () => {},
    fetchUserEditForAdminSuccess: (state, action) => {
      state.currentUserEditForAdmin = action.payload
    },
    fetchUserEditForAdminFail: (state, action) => {
      const { error } = action.payload
      toastError(error)
    },
  },
})
// Action
export const {
  login,
  loginSuccess,
  loginFailed,
  logout,
  refreshToken,
  getUser,
  getUserSuccess,
  getUserFail,
  updateInfoUser,
  updateInfoUserSuccess,
  updateInfoUserFail,
  updateInfoUserEditAdmin,
  updateInfoUserEditAdminSuccess,
  updateInfoUserEditAdminFail,
  fetchUserEditForAdmin,
  fetchUserEditForAdminSuccess,
  fetchUserEditForAdminFail,
} = authReducer.actions
// Seclectors
export const seclectIsloggedIn = (state) => state.auth.isLoggedIn
export const seclectIslogging = (state) => state.auth.logging

// Reducer
export default authReducer.reducer
