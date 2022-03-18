import { convertFromRaw, convertToRaw, EditorState } from 'draft-js'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import storage from 'utils/firebase'
import './EditorContainer.css'

const EditorContainer = ({ getEditor, resetText, content }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const onEditorStateChange = (editor) => {
    setEditorState(editor)
    getEditor(JSON.stringify(convertToRaw(editor.getCurrentContent())))
  }

  const firebaseUpload = (file) => {
    return new Promise((resolve) => {
      if (!file) {
        resolve('Invalid file.')
      }
      const uploadTask = storage.ref(`images/${file.name}`).put(file)
      uploadTask.on(
        'state_changed',
        () => {},
        () => {},
        () => {
          // Gets link back
          storage
            .ref('images')
            .child(file.name)
            .getDownloadURL()
            .then((url) => resolve(url))
        }
      )
    })
  }
  const uploadImageCallBack = (file) => {
    return new Promise((resolve, reject) => {
      firebaseUpload(file)
        .then((link) => {
          resolve({ data: { link } })
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  // const createEditorStateFromContent = (text) => {
  //   return EditorState.createWithContent(convertFromRaw(JSON.parse(text)))
  // }

  const onResetText = () => {
    setEditorState(EditorState.createEmpty())
  }

  useEffect(() => {
    onResetText()
  }, [resetText])

  useEffect(() => {
    if (content.length !== 0) {
      setEditorState(
        EditorState.createWithContent(convertFromRaw(JSON.parse(content)))
      )
    }
  }, [content])
  return (
    <div>
      <Editor
        editorState={editorState}
        wrapperClassName="wrapper_editor"
        toolbarClassName=""
        editorClassName="editor-class"
        onEditorStateChange={onEditorStateChange}
        toolbar={{
          link: { popupClassName: 'editor_link' },
          embedded: {
            popupClassName: 'editor_embedded',
          },
          image: {
            uploadCallback: uploadImageCallBack,
            alt: { present: true, mandatory: true },
            defaultSize: {
              height: '100%',
              width: '100%',
            },
          },
        }}
      />
    </div>
  )
}

EditorContainer.propTypes = {
  getEditor: PropTypes.func.isRequired,
  resetText: PropTypes.bool.isRequired,
  content: PropTypes.string.isRequired,
}

export default EditorContainer
