import { toastError } from '../../helper/toastHelper'

const { createSlice } = require('@reduxjs/toolkit')

const cadresSlice = createSlice({
  name: 'cadres',
  initialState: {
    listCadres: [],
  },
  reducers: {
    fetchCadresList: () => {},
    fetchCadresListSuccess: (state, action) => {
      state.listCadres = action.payload
    },
    fetchCadresListFail: (state, action) => {
      const { error } = action.payload
      toastError(error)
    },
  },
})

export const { fetchCadresList, fetchCadresListSuccess, fetchCadresListFail } =
  cadresSlice.actions
export default cadresSlice.reducer
