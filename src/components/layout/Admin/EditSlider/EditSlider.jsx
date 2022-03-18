import React, { useEffect, useState } from 'react'
import './EditSlider.css'
import Modal from '@mui/material/Modal'
import PropTypes from 'prop-types'
import { Box, Button, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchGetSliderByID,
  fetchUpdateSlider,
} from 'store/reducers/SliderReducer'
import LoadingButton from '@mui/lab/LoadingButton'
import firebaseUpload from 'helper/uploadImage'
import SaveIcon from '@mui/icons-material/Save'
import placeHolderImage from '../../../../assets/placeholder-type2.png'

function EditSlider({ open, handleClose, id }) {
  const slider = useSelector((state) => state.slider.editSlider)
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: slider?.title,
      img: slider?.img,
      link: slider?.link,
    },
  })
  const [thumbnail, setThumbnail] = useState()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const onHanldeSubmit = (e) => {
    setLoading(true)
    return new Promise((resolve, reject) => {
      if (thumbnail !== slider.img) {
        firebaseUpload(thumbnail)
          // eslint-disable-next-line no-shadow
          .then((img) => {
            dispatch(
              fetchUpdateSlider({
                ...e,
                img,
                _id: slider._id,
              })
            )
            setLoading(false)
            handleClose()
          })
          .catch((error) => {
            reject(error)
          })
      } else {
        dispatch(
          fetchUpdateSlider({
            ...e,
            img: thumbnail,
            _id: slider._id,
          })
        )
        setLoading(false)
        handleClose()
      }
    })
  }
  const onHandlePreview = (event) => {
    if (event.target.files.length !== 0) {
      const file = event.target.files[0]
      file.preview = URL.createObjectURL(file)
      setThumbnail(file)
    }
  }

  useEffect(() => {
    setValue('title', `${slider?.title}`)
    setValue('link', `${slider?.link}`)
    setThumbnail(slider?.img)
  }, [slider])

  useEffect(() => {
    dispatch(fetchGetSliderByID(id))
  }, [id])

  useEffect(() => {
    return () => {
      // eslint-disable-next-line no-unused-expressions
      thumbnail && URL.revokeObjectURL(thumbnail.preview)
    }
  }, [thumbnail])

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal_edit_slider">
        <form onSubmit={handleSubmit(onHanldeSubmit)}>
          <div className="edit_slider_container">
            <div className="create_news_title">Chỉnh sửa slider</div>
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
                  src={
                    typeof thumbnail === 'object'
                      ? thumbnail.preview
                      : thumbnail
                  }
                  alt=""
                  className="edit_slider_preview_picture"
                />
              ) : (
                <img
                  src={placeHolderImage}
                  alt=""
                  className="edit_slider_preview_picture"
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
              onClick={handleClose}
            >
              Hủy
            </Button>
            <LoadingButton
              loading={loading}
              type="submit"
              variant="contained"
              size="medium"
              loadingPosition="start"
              startIcon={<SaveIcon />}
            >
              Chỉnh sửa
            </LoadingButton>
          </div>
        </form>
      </Box>
    </Modal>
  )
}

EditSlider.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
}

export default EditSlider
