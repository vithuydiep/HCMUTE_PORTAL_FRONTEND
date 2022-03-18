import { toastError, toastSuccess } from '../../helper/toastHelper'

const { createSlice } = require('@reduxjs/toolkit')

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    usersList: [],
    users: {},
    totalUsers: -1,
    hotUsers: [],
    usersAdmin: [],
  },
  reducers: {
    fetchListUsers: () => {},
    fetchListUsersSuccess: (state, action) => {
      state.usersList = action.payload
    },
    fetchListUsersFail: (state, action) => {
      toastError(action.payload)
    },
    fetchHotUsers: () => {},
    fetchHotUsersSuccess: (state, action) => {
      state.hotUsers = action.payload
    },
    fetchHotUsersFail: (state, action) => {
      toastError(action.payload)
    },
    fetchItem: () => {},
    fetchItemSuccess: (state, action) => {
      state.users = action.payload
    },
    fetchItemFail: (state, action) => {
      toastError(action.payload)
    },
    fetchtotalUsers: () => {},
    fetchtotalUsersSuccess: (state, action) => {
      state.totalUsers = action.payload
    },
    fetchtotalUsersFail: (state, action) => {
      toastError(action.payload)
    },
    fetchAddUsers: () => {},
    fetchAddUsersSuccess: (state, action) => {
      state.usersList.push(action.payload)
      toastSuccess('Tạo người dùng thành công')
    },
    fetchAddUsersFail: (state, action) => {
      toastError(action.payload)
    },
    fetchUsersForAdmin: () => {},
    fetchUsersForAdminSuccess: (state, action) => {
      state.usersAdmin = action.payload
    },
    fetchUsersForAdminFail: (action) => {
      toastError(action.payload)
    },
    fetchDeleteUsers: () => {},
    fetchDeleteUsersSuccess: (state, action) => {
      const index = state.usersAdmin.findIndex(
        (item) => item.id === action.payload
      )
      if (index > -1) {
        state.usersAdmin.splice(index, 1)
      }
    },
    fetchDeleteUsersFail: (action) => {
      toastError(action.payload)
    },
    fetchUpdateUsersForAdmin: () => {},
    fetchUpdateUsersForAdminSuccess: (state, action) => {
      state.usersAdmin = action.payload
      toastSuccess('Chỉnh sửa thông tin thành công')
    },
    fetchUpdateUsersForAdminFail: (action) => {
      toastError(action.payload)
    },
  },
})
export const {
  fetchListUsers,
  fetchItemFail,
  fetchItemSuccess,
  fetchListUsersFail,
  fetchListUsersSuccess,
  fetchItem,
  fetchtotalUsers,
  fetchtotalUsersSuccess,
  fetchtotalUsersFail,
  fetchHotUsers,
  fetchHotUsersFail,
  fetchHotUsersSuccess,
  fetchAddUsers,
  fetchAddUsersSuccess,
  fetchAddUsersFail,
  fetchUsersForAdmin,
  fetchUsersForAdminFail,
  fetchUsersForAdminSuccess,
  fetchDeleteUsers,
  fetchDeleteUsersSuccess,
  fetchDeleteUsersFail,
  fetchUpdateUsersForAdmin,
  fetchUpdateUsersForAdminSuccess,
  fetchUpdateUsersForAdminFail,
} = usersSlice.actions
export default usersSlice.reducer
