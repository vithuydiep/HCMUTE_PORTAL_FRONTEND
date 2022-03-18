import { Box, Button, MenuItem, TextField } from '@mui/material'
import { useConfirm } from 'material-ui-confirm'
import React, { useEffect, useState } from 'react'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { closeLoading, showLoading } from 'store/reducers/LoadingSlide'
import { fetchItem, fetchUpdateNews } from 'store/reducers/NewsSlice'
import storage from 'utils/firebase'
import placeHolderImage from '../../../assets/placehover_image.png'
import { typeNews } from '../../../utils/constant'
import EditorContainer from '../EditorContainer/EditorContainer'
import NotFound from '../NotFound/NotFound'
import './EditNewsForUnion.css'

function EditNewsForUnion() {
  const news = useSelector((state) => state.news.news)
  const { slug } = useParams()
  const dispatch = useDispatch()
  const [currency, setCurrency] = useState('tin-ute')
  const [thumbnail, setThumbnail] = useState()
  const [content, setContent] = useState()
  const confirm = useConfirm()
  const history = useHistory()
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: news?.title,
      name: news?.name,
      position: news?.position,
    },
  })
  const onHandleConfirmCancel = () => {
    confirm({
      description: 'Bạn muốn hủy thao tác cập nhật thông tin?',
      title: 'Xác nhận hành động',
    })
      .then(() => {
        history.goBack()
      })
      .catch(() => console.log('Deletion cancelled.'))
  }

  useEffect(() => {
    dispatch(fetchItem(slug))
  }, [])

  useEffect(() => {
    setValue('title', `${news?.title}`)
    setValue('name', `${news?.name}`)
    setValue('position', `${news?.position}`)
    setThumbnail(news?.thumbnail)
    if (news?.tag !== undefined) {
      setCurrency(news?.tag)
    }
    setContent(news?.content)
  }, [news])

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
  const onHandleSubmit = (e) => {
    dispatch(showLoading())
    return new Promise((resolve, reject) => {
      if (thumbnail !== news.thumbnail) {
        firebaseUpload(thumbnail)
          // eslint-disable-next-line no-shadow
          .then((thumbnail) => {
            dispatch(closeLoading())
            dispatch(
              fetchUpdateNews({
                ...e,
                tag: currency,
                content,
                thumbnail,
                _id: news._id,
              })
            )
          })
          .catch((error) => {
            reject(error)
          })
      } else {
        dispatch(closeLoading())
        dispatch(
          fetchUpdateNews({
            ...e,
            tag: currency,
            content,
            thumbnail,
            _id: news._id,
          })
        )
      }
    })
  }

  const getEditor = (data) => {
    setContent(data)
  }

  const userAuth = localStorage.getItem('authLogin')
    ? JSON.parse(localStorage.getItem('authLogin'))
    : {}

  // console.log(userAuth.user?.id)
  // console.log(news?.createdUser)

  if (
    userAuth.user?.role === 'user:unionBase' &&
    news !== null &&
    news.status !== true &&
    userAuth.user?.id === news?.createdUser
  )
    return (
      <div className="edit_news">
        <div className="grid wide">
          <form onSubmit={handleSubmit(onHandleSubmit)}>
            <div className="edit_news_container">
              <div className="edit_news_title">Chỉnh sửa bài viết</div>
              <div className="edit_news_info">
                <div className="row">
                  <div className="col l-8 m-12 c-12">
                    <div className="edit_news_info_user">
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
                        {...register('tag')}
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
                    <div className="edit_news_info_post">
                      {thumbnail ? (
                        <img
                          src={
                            typeof thumbnail === 'object'
                              ? thumbnail.preview
                              : thumbnail
                          }
                          alt=""
                          className="edit_news_preview_picture"
                        />
                      ) : (
                        <img
                          src={placeHolderImage}
                          alt=""
                          className="edit_news_preview_picture"
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
                getEditor={getEditor}
                content={news?.content === undefined ? '' : news?.content}
              />

              <div className="btn_upload_submit">
                <Button
                  color="primary"
                  loadingPosition="start"
                  variant="outlined"
                  className="infor_user_btn_cancel"
                  onClick={onHandleConfirmCancel}
                >
                  Hủy
                </Button>
                <Button type="submit" variant="contained" size="medium">
                  Chỉnh sửa
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )

  if (userAuth.user?.role === 'admin' && news !== null) {
    return (
      <div className="edit_news">
        <div className="grid wide">
          <form onSubmit={handleSubmit(onHandleSubmit)}>
            <div className="edit_news_container">
              <div className="edit_news_title">Chỉnh sửa bài viết</div>
              <div className="edit_news_info">
                <div className="row">
                  <div className="col l-8 m-12 c-12">
                    <div className="edit_news_info_user">
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
                        {...register('tag')}
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
                    <div className="edit_news_info_post">
                      {thumbnail ? (
                        <img
                          src={
                            typeof thumbnail === 'object'
                              ? thumbnail.preview
                              : thumbnail
                          }
                          alt=""
                          className="edit_news_preview_picture"
                        />
                      ) : (
                        <img
                          src={placeHolderImage}
                          alt=""
                          className="edit_news_preview_picture"
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
                getEditor={getEditor}
                content={news?.content === undefined ? '' : news?.content}
              />

              <div className="btn_upload_submit">
                <Button
                  color="primary"
                  loadingPosition="start"
                  variant="outlined"
                  className="infor_user_btn_cancel"
                  onClick={onHandleConfirmCancel}
                >
                  Hủy
                </Button>
                <Button type="submit" variant="contained" size="medium">
                  Chỉnh sửa
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }

  return <NotFound />
}

export default EditNewsForUnion
