import { toastError, toastSuccess } from '../../helper/toastHelper'

const { createSlice } = require('@reduxjs/toolkit')

const sliderSlice = createSlice({
  name: 'slider',
  initialState: {
    listSlider: [],
    editSlider: {},
  },
  reducers: {
    fetchSliderList: () => {},
    fetchSliderListSuccess: (state, action) => {
      state.listSlider = action.payload
    },
    fetchSliderListFail: (state, action) => {
      const { error } = action.payload
      toastError(error)
    },
    fetchCreateSlider: () => {},
    fetchCreateSliderSuccess: (state, action) => {
      state.listSlider.push(action.payload)
      toastSuccess('Thêm mới thành công')
    },
    fetchCreateSliderFail: (state, action) => {
      const { error } = action.payload
      toastError(error)
    },
    fetchGetSliderByID: () => {},
    fetchGetSliderByIDSuccess: (state, action) => {
      state.editSlider = action.payload
    },
    fetchGetSliderByIDFail: (state, action) => {
      const { error } = action.payload
      toastError(error)
    },
    fetchUpdateSlider: () => {},
    fetchUpdateSliderSuccess: (state, action) => {
      state.editSlider = action.payload
      const position = state.listSlider.findIndex(
        (item) => item._id === action.payload._id
      )
      state.listSlider[position] = action.payload
      toastSuccess('Cập nhật thành công')
    },
    fetchUpdateSliderFail: (state, action) => {
      const { error } = action.payload
      toastError(error)
    },
    fetchDeleteSlider: () => {},
    fetchDeleteSliderSuccess: (state, action) => {
      const index = state.listSlider.findIndex(
        (item) => item._id === action.payload
      )
      if (index > -1) {
        state.listSlider.splice(index, 1)
      }
      toastSuccess('Xóa thành công')
    },
    fetchDeleteSliderFail: (state, action) => {
      const { error } = action.payload
      toastError(error)
    },
  },
})

export const {
  fetchSliderList,
  fetchSliderListSuccess,
  fetchSliderListFail,
  fetchCreateSlider,
  fetchCreateSliderSuccess,
  fetchCreateSliderFail,
  fetchGetSliderByID,
  fetchGetSliderByIDFail,
  fetchGetSliderByIDSuccess,
  fetchUpdateSlider,
  fetchUpdateSliderFail,
  fetchUpdateSliderSuccess,
  fetchDeleteSlider,
  fetchDeleteSliderFail,
  fetchDeleteSliderSuccess,
} = sliderSlice.actions
export default sliderSlice.reducer
