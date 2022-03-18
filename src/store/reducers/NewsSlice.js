import { toastError, toastSuccess } from '../../helper/toastHelper'

const { createSlice } = require('@reduxjs/toolkit')

const newSlice = createSlice({
  name: 'news',
  initialState: {
    newsList: [],
    news: {},
    totalNews: -1,
    hotNews: [],
    newsAdmin: [],
    totalRequest: 0,
    newsByUser: [],
    search: '',
  },
  reducers: {
    fetchListNews: () => {},
    fetchListNewsSuccess: (state, action) => {
      state.newsList = action.payload
    },
    fetchListNewsFail: (state, action) => {
      toastError(action.payload)
    },
    fetchHotNews: () => {},
    fetchHotNewsSuccess: (state, action) => {
      state.hotNews = action.payload
    },
    fetchHotNewsFail: (action) => {
      toastError(action.payload)
    },
    fetchItem: () => {},
    fetchItemSuccess: (state, action) => {
      state.news = action.payload
    },
    fetchItemFail: (action) => {
      toastError(action.payload)
    },
    fetchtotalNews: () => {},
    fetchtotalNewsSuccess: (state, action) => {
      state.totalNews = action.payload
    },
    fetchtotalNewsFail: (action) => {
      toastError(action.payload)
    },
    fetchAddNews: () => {},
    fetchAddNewsSuccess: (state, action) => {
      state.newsList.push(action.payload)
      toastSuccess('Tạo yêu cầu bài viết thành công')
    },
    fetchAddNewsFail: (action) => {
      toastError(action.payload)
    },
    fetchNewsForAdmin: () => {},
    fetchNewsForAdminSuccess: (state, action) => {
      state.newsAdmin = action.payload
    },
    fetchNewsForAdminFail: (action) => {
      toastError(action.payload)
    },
    fetchDeleteNews: () => {},
    fetchDeleteNewsSuccess: (state, action) => {
      const index = state.newsAdmin.findIndex(
        (item) => item._id === action.payload
      )
      if (index > -1) {
        state.newsAdmin.splice(index, 1)
      }
    },
    fetchDeleteNewsFail: (action) => {
      toastError(action.payload)
    },
    fetchUpdateNews: () => {},
    fetchUpdateNewsSuccess: (state, action) => {
      state.news = action.payload
      state.totalRequest -= 1
      toastSuccess('Chỉnh sửa bài viết thành công')
    },
    fetchUpdateNewsFail: (action) => {
      toastError(action.payload)
    },
    fetchTotalRequestNews: () => {},
    fetchTotalRequestNewsSuccess: (state, action) => {
      state.totalRequest = action.payload
    },
    fetchTotalRequestNewsFail: (action) => {
      toastError(action.payload)
    },
    fetchRequestNewsByUser: () => {},
    fetchRequestNewsByUserSuccess: (state, action) => {
      state.newsByUser = action.payload
    },
    fetchRequestNewsByUserFail: (action) => {
      toastError(action.payload)
    },
    setSearchText: (state, action) => {
      state.search = action.payload
    },
  },
})
export const {
  fetchListNews,
  fetchItemFail,
  fetchItemSuccess,
  fetchListNewsFail,
  fetchListNewsSuccess,
  fetchItem,
  fetchtotalNews,
  fetchtotalNewsSuccess,
  fetchtotalNewsFail,
  fetchHotNews,
  fetchHotNewsFail,
  fetchHotNewsSuccess,
  fetchAddNews,
  fetchAddNewsSuccess,
  fetchAddNewsFail,
  fetchNewsForAdmin,
  fetchNewsForAdminFail,
  fetchNewsForAdminSuccess,
  fetchDeleteNews,
  fetchDeleteNewsFail,
  fetchDeleteNewsSuccess,
  fetchUpdateNews,
  fetchUpdateNewsSuccess,
  fetchUpdateNewsFail,
  fetchTotalRequestNews,
  fetchTotalRequestNewsFail,
  fetchTotalRequestNewsSuccess,
  fetchRequestNewsByUser,
  fetchRequestNewsByUserFail,
  fetchRequestNewsByUserSuccess,
  setSearchText,
} = newSlice.actions
export default newSlice.reducer
