import { toast } from 'react-toastify'
import { toastError,toastSuccess  } from '../../helper/toastHelper'

const { createSlice } = require('@reduxjs/toolkit')

const ActivityReducer = createSlice({
  name: 'Activities',
  initialState: {
    ActivityList: [],
    Activity: {},
    totalActivity: 0,
    ActivityListForUSer: [],
    totalActivityForUser: 0,
    ActivityListForAdmin: [],
    totalRequest: 0,
  },
  reducers: {
    fetchListActivity: () => {},
    fetchListActivitySuccess: (state, action) => {
      state.ActivityList = action.payload
    },
    fetchListActivityFail: (state, action) => {
      toastError(action.payload)
    },
    fetchtotalActivities: () => {},
    fetchtotalActivitiesSuccess: (state, action) => {
      state.totalActivity = action.payload
    },
    fetchtotalActivitiesFail: (state, action) => {
      toastError(action.payload)
    },
    fetchActivity: () => {},
    fetchActivitySuccess: (state, action) => {
      state.Activity = action.payload
    },
    fetchActivityFail: (state, action) => {
      toastError(action.payload)
    },
    fetchAddActivity: () => {},
    fetchAddActivitySuccess: (state, action) => {
      state.ActivityList.push(action.payload)
      toastSuccess('Đăng ký chương trình thành công')
    },
    fetchAddActivityFail: (state, action) => {
      const { error } = action.payload
      toastError(error)
    },
    fetchRegisterActivityForStudent: () => {},
    fetchRegisterActivityForStudentSucces: (state, action) => {
      console.log(action.payload)
      if(action.payload === 'true') toastSuccess("Chương trình đăng ký thành công")
      else     toast.error("Chương trình đã được đăng ký !", {
      theme: 'dark',
    }) 
    },
    fetchRegisterActivityForStudentFail: (state, action) => {
      const { error } = action.payload
      toastError(error)
    },
    fetchActivityForUser: () => {},
    fetchActivityForUserSuccess: (state, action) => {
      state.ActivityListForUSer = action.payload
    },
    fetchActivityForUserFail: (state, action) => {
      toastError(action.payload)
    },
    fetchTotalActivitiesForUser: () => {},
    fetchTotalActivitiesForUserSuccess: (state, action) => {
      state.totalActivityForUser = action.payload
    },
    fetchTotalActivitiesForUserFail: (state, action) => {
      toastError(action.payload)
    },
    fetchActivityForAdmin: () => {},
    fetchActivityForAdminSuccess: (state, action) => {
    state.ActivityListForAdmin = action.payload
    },
    fetchActivityForAdminFail: (state, action) => {
    toastError(action.payload)
    },
    fetchEditActivity: () => {},
    fetchEditActivitySuccess: (state, action) => {
      // state.ActivityList.push(action.payload)
      toastSuccess('Thao tác thành công !')
    },
    fetchEditctivityFail: (state, action) => {
      const { error } = action.payload
      toastError(error)
    },
    fetchDeleteActivity: () => {},
    fetchDeleteActivitySuccess: (state, action) => {
      // state.ActivityList.push(action.payload)
      toastSuccess('Xóa chương trình thành công !')
    },
    fetchDeleteActivityFail: (state, action) => {
      const { error } = action.payload
      toastError(error)
    },
    fetchTotalRequestActivity: () => {},
    fetchTotalRequestActivitySuccess: (state, action) => {
      state.totalRequest = action.payload
    },
    fetchTotalRequestActivityFail: (action) => {
      toastError(action.payload)
    },
  },
})
export const {
  fetchListActivity,
  fetchListActivitySuccess,
  fetchListActivityFail,
  fetchActivity,
  fetchActivitySuccess,
  fetchActivityFail,
  fetchtotalActivities,
  fetchtotalActivitiesSuccess,
  fetchtotalActivitiesFail,
  fetchAddActivity,
  fetchAddActivitySuccess,
  fetchAddActivityFail,
  fetchRegisterActivityForStudent,
  fetchRegisterActivityForStudentSucces,
  fetchRegisterActivityForStudentFail,
  fetchActivityForUser,
  fetchActivityForUserSuccess,
  fetchActivityForUserFail,
  fetchTotalActivitiesForUser,
  fetchTotalActivitiesForUserSuccess,
  fetchTotalActivitiesForUserFail,
  fetchActivityForAdmin,
  fetchActivityForAdminSuccess,
  fetchActivityForAdminFail,
  fetchEditActivity,
  fetchEditActivitySuccess,
  fetchEditctivityFail,
  fetchDeleteActivity,
  fetchDeleteActivitySuccess,
  fetchDeleteActivityFail,
  fetchTotalRequestActivity,
  fetchTotalRequestActivitySuccess,
  fetchTotalRequestActivityFail
} = ActivityReducer.actions
export default ActivityReducer.reducer
