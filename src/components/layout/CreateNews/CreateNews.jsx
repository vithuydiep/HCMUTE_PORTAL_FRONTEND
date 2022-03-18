import { Box, Button, MenuItem, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { closeLoading, showLoading } from 'store/reducers/LoadingSlide'
import { fetchAddNews } from 'store/reducers/NewsSlice'
import storage from 'utils/firebase'
import { useConfirm } from 'material-ui-confirm'
import { useHistory } from 'react-router-dom'
import placeHolderImage from '../../../assets/placehover_image.png'
import EditorContainer from '../EditorContainer/EditorContainer'
import './CreateNews.css'
import { typeNews } from '../../../utils/constant'
import { NotFound } from '..'

function CreateNews() {
  const {
    register,
    formState: { errors, isValid },
    reset,
    handleSubmit,
  } = useForm({
    mode: 'onChange',
  })

  const dispatch = useDispatch()
  const [resetText, setResetText] = useState(false)
  const [currency, setCurrency] = useState('tin-noi-bat')
  const [thumbnail, setThumbnail] = useState()
  const [content, setContent] = useState()
  const confirm = useConfirm()
  const history = useHistory()
  const handleChange = (event) => {
    setCurrency(event.target.value)
  }
  const onHandlePreview = (event) => {
    if (event.target.files.length !== 0) {
      const file = event.target.files[0]
      file.preview = URL.createObjectURL(file)
      setThumbnail(file)
    }
  }
  const onHandleConfirmCancel = () => {
    confirm({
      description: 'Bạn muốn hủy thao tác thêm bài viết?',
      title: 'Xác nhận hành động',
    })
      .then(() => history.goBack())
      .catch(() => console.log('Deletion cancelled.'))
  }

  useEffect(() => {
    return () => {
      // eslint-disable-next-line no-unused-expressions
      thumbnail && URL.revokeObjectURL(thumbnail.preview)
    }
  }, [thumbnail])

  const firebaseUpload = (file) => {
    return new Promise((resolve) => {
      if (!file) {
        resolve('')
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
  const onHanldeSubmit = (e) => {
    dispatch(showLoading())
    return new Promise((resolve, reject) => {
      firebaseUpload(thumbnail)
        // eslint-disable-next-line no-shadow
        .then((thumbnail) => {
          dispatch(closeLoading())
          dispatch(fetchAddNews({ ...e, content, thumbnail }))
          reset({})
          setResetText(true)
          setResetText(false)
          setContent()
          setThumbnail()
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  const getEditor = (data) => {
    setContent(data)
  }

  if (
    localStorage.getItem('authLogin') &&
    JSON.parse(localStorage.getItem('authLogin')).user.role === 'user:unionBase'
  )
    return (
      <div className="create_news">
        <div className="grid wide">
          <div className="create_news_slider">
            <div className="create_news_slider-text">
              &quot; Chuyển đổi số - Digital Transformation in HCMUTE &quot;
            </div>
          </div>
          <form onSubmit={handleSubmit(onHanldeSubmit)}>
            <div className="create_news_container">
              <div className="create_news_title">Tạo yêu cầu bài đăng</div>
              <div className="create_news_info">
                <div className="row">
                  <div className="col l-8 m-12 c-12">
                    <div className="create_news_info_user">
                      <TextField
                        fullWidth
                        {...register('title', {
                          required: 'This input is required',
                          minLength: {
                            value: 11,
                            message: 'This input must exceed 10 characters',
                          },
                        })}
                        id="outlined-required"
                        label="Tên bài viết"
                        margin="dense"
                        error={errors.title?.message.length > 0}
                        helperText={errors.title && errors.title?.message}
                      />
                      <TextField
                        fullWidth
                        {...register('name', {
                          required: 'This input is required',
                        })}
                        id="outlined-required"
                        label="Họ và tên"
                        margin="dense"
                        error={errors.name?.message.length > 0}
                        helperText={errors.name && errors.name?.message}
                      />
                      <TextField
                        fullWidth
                        {...register('position', {
                          required: 'This input is required',
                        })}
                        id="outlined-required"
                        label="Chức vụ"
                        margin="dense"
                        error={errors.position?.message.length > 0}
                        helperText={errors.position && errors.position?.message}
                      />
                      <TextField
                        fullWidth
                        {...register('tag', {
                          required: 'This input is required',
                        })}
                        select
                        label="Lĩnh vực bài viết"
                        value={currency}
                        onChange={handleChange}
                        margin="dense"
                        error={errors.type?.message.length > 0}
                        helperText={errors.type && errors.type?.message}
                      >
                        {typeNews.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                  </div>
                  <div className="col l-4 m-12 c-12">
                    <div className="create_news_info_post">
                      {thumbnail ? (
                        <img
                          src={thumbnail.preview}
                          alt=""
                          className="create_news_preview_picture"
                        />
                      ) : (
                        <img
                          src={placeHolderImage}
                          alt=""
                          className="create_news_preview_picture"
                        />
                      )}
                      <Box textAlign="center">
                        <Button
                          variant="contained"
                          component="label"
                          className="btn_upload_image"
                          size="medium"
                        >
                          Upload Thumbnail
                          <input
                            accept="image/*"
                            type="file"
                            hidden
                            onChange={onHandlePreview}
                          />
                        </Button>
                      </Box>
                    </div>
                  </div>
                </div>
              </div>
              <EditorContainer
                content=""
                getEditor={getEditor}
                resetText={resetText}
              />

              <div className="btn_upload_submit">
                <Button
                  color="primary"
                  loadingPosition="start"
                  variant="outlined"
                  className="infor_user_btn_cancel"
                  onClick={onHandleConfirmCancel}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  size="medium"
                  disabled={!isValid}
                >
                  Gửi yêu cầu
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )

  if (
    localStorage.getItem('authLogin') &&
    JSON.parse(localStorage.getItem('authLogin')).user.role === 'admin'
  )
    return (
      <div className="create_news">
        <div className="grid wide">
          <form onSubmit={handleSubmit(onHanldeSubmit)}>
            <div className="create_news_container">
              <div className="create_news_title">Tạo bài viết mới</div>
              <div className="create_news_info">
                <div className="row">
                  <div className="col l-8 m-12 c-12">
                    <div className="create_news_info_user">
                      <TextField
                        fullWidth
                        {...register('title', {
                          required: 'This input is required',
                          minLength: {
                            value: 11,
                            message: 'This input must exceed 10 characters',
                          },
                        })}
                        id="outlined-required"
                        label="Tên bài viết"
                        margin="dense"
                        error={errors.title?.message.length > 0}
                        helperText={errors.title && errors.title?.message}
                      />
                      <TextField
                        fullWidth
                        {...register('name', {
                          required: 'This input is required',
                        })}
                        id="outlined-required"
                        label="Họ và tên"
                        margin="dense"
                        error={errors.name?.message.length > 0}
                        helperText={errors.name && errors.name?.message}
                      />
                      <TextField
                        fullWidth
                        {...register('position', {
                          required: 'This input is required',
                        })}
                        id="outlined-required"
                        label="Chức vụ"
                        margin="dense"
                        error={errors.position?.message.length > 0}
                        helperText={errors.position && errors.position?.message}
                      />
                      <TextField
                        fullWidth
                        {...register('tag', {
                          required: 'This input is required',
                        })}
                        select
                        label="Lĩnh vực bài viết"
                        value={currency}
                        onChange={handleChange}
                        margin="dense"
                        error={errors.type?.message.length > 0}
                        helperText={errors.type && errors.type?.message}
                      >
                        {typeNews.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                  </div>
                  <div className="col l-4 m-12 c-12">
                    <div className="create_news_info_post">
                      {thumbnail ? (
                        <img
                          src={thumbnail.preview}
                          alt=""
                          className="create_news_preview_picture"
                        />
                      ) : (
                        <img
                          src={placeHolderImage}
                          alt=""
                          className="create_news_preview_picture"
                        />
                      )}
                      <Box textAlign="center">
                        <Button
                          variant="contained"
                          component="label"
                          className="btn_upload_image"
                          size="medium"
                        >
                          Upload Thumbnail
                          <input
                            accept="image/*"
                            type="file"
                            hidden
                            onChange={onHandlePreview}
                          />
                        </Button>
                      </Box>
                    </div>
                  </div>
                </div>
              </div>
              <EditorContainer
                content=""
                getEditor={getEditor}
                resetText={resetText}
              />

              <div className="btn_upload_submit">
                <Button
                  color="primary"
                  loadingPosition="start"
                  variant="outlined"
                  className="infor_user_btn_cancel"
                  onClick={onHandleConfirmCancel}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  size="medium"
                  disabled={!isValid}
                >
                  Tạo bài viết
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  return <NotFound />
}

export default CreateNews
