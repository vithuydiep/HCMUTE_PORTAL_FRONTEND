import { Box, Button, TextField } from '@mui/material'
import { toastError } from 'helper/toastHelper'
import firebaseUpload from 'helper/uploadImage'
import { useConfirm } from 'material-ui-confirm'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { closeLoading, showLoading } from 'store/reducers/LoadingSlide'
import { fetchCreateSlider } from 'store/reducers/SliderReducer'
import placeHolderImage from '../../../../assets/placeholder-type2.png'
import './CreateSlider.css'

function CreateSlider() {
  const {
    register,
    formState: { errors, isValid },
    reset,
    handleSubmit,
  } = useForm({
    mode: 'onChange',
  })
  const [thumbnail, setThumbnail] = useState()
  const dispatch = useDispatch()
  const confirm = useConfirm()
  const history = useHistory()

  const onHandleConfirmCancel = () => {
    confirm({
      description: 'Bạn muốn hủy thao tác thêm bài viết?',
      title: 'Xác nhận hành động',
    })
      .then(() => history.goBack())
      .catch(() => console.log('Deletion cancelled.'))
  }
  const onHanldeSubmit = (e) => {
    if (thumbnail === undefined) {
      toastError({ message: 'Vui lòng chọn ảnh' })
    } else {
      dispatch(showLoading())
      return new Promise((resolve, reject) => {
        firebaseUpload(thumbnail)
          .then((img) => {
            dispatch(closeLoading())
            dispatch(fetchCreateSlider({ ...e, img }))
            reset({})
            setThumbnail()
          })
          .catch((error) => {
            reject(error)
          })
      })
    }
    return ''
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

  return (
    <div className="create_slider">
      <div className="grid wide">
        <form onSubmit={handleSubmit(onHanldeSubmit)}>
          <div className="create_slider_container">
            <div className="create_news_title">Thêm mới slider</div>
            <div className="create_slider_info">
              <div className="create_slider_info_user">
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
                  label="Tên thông báo"
                  margin="dense"
                  error={errors.title?.message.length > 0}
                  helperText={errors.title && errors.title?.message}
                />
                <TextField
                  fullWidth
                  {...register('link', {
                    required: 'This input is required',
                  })}
                  id="outlined-required"
                  label="Link bài viết"
                  margin="dense"
                  error={errors.link?.message.length > 0}
                  helperText={errors.link && errors.link?.message}
                />
              </div>
            </div>
            <div className="create_slider_info_post">
              {thumbnail ? (
                <img
                  src={thumbnail.preview}
                  alt=""
                  className="create_slider_preview_picture"
                />
              ) : (
                <img
                  src={placeHolderImage}
                  alt=""
                  className="create_slider_preview_picture"
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
        </form>
      </div>
    </div>
  )
}

export default CreateSlider
