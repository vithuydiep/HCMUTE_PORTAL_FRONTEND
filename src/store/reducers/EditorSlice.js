const { createSlice } = require('@reduxjs/toolkit')

const editorSlice = createSlice({
  name: 'edtior',
  initialState: {
    editorState: '',
  },
  reducers: {
    setEditorContent: (state, action) => {
      state.editorState = action.payload
    },
  },
})

export const { setEditorContent } = editorSlice.actions
export default editorSlice.reducer
