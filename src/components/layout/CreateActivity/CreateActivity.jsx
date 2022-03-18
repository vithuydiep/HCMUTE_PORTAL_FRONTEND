/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react'
import { Box, Button, MenuItem, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { closeLoading, showLoading } from 'store/reducers/LoadingSlide'
import { fetchAddActivity } from 'store/reducers/ActivityReducer'
import { useDispatch } from 'react-redux'
import storage from 'utils/firebase'
import { typeActivity } from '../../../utils/constant'
import placeHolderImage from '../../../assets/placehover_image.png'
import './CreateActitvity.css'
import NotFound from '../NotFound/NotFound'

const CreateActivity = () => {
  const dispatch = useDispatch()
  const [currency, setCurrency] = useState('dao-duc')
  const [thumbnail, setThumnail] = useState()
  const handleChange = (event) => {
    setCurrency(event.target.value)
  }
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    isValid,
  } = useForm({
    mode: 'onChange',
  })
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
  const userCreate = JSON.parse(localStorage.getItem('authLogin'))?.user
    .displayName

  const onHanldeSubmit = (e) => {
    dispatch(showLoading())
    return new Promise((resolve, reject) => {
      firebaseUpload(thumbnail)
        .then((thumbnail) => {
          dispatch(closeLoading())
          dispatch(fetchAddActivity({ ...e, thumbnail, userCreate }))
          reset()
          setThumnail()
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  const onHandlePreview = (event) => {
    if (event.target.files.length !== 0) {
      const file = event.target.files[0]
      file.preview = URL.createObjectURL(file)
      setThumnail(file)
    }
  }

  if (
    localStorage.getItem('authLogin') &&
    (JSON.parse(localStorage.getItem('authLogin')).user.role ===
      'user:unionBase' ||
      JSON.parse(localStorage.getItem('authLogin')).user.role === 'admin')
  )
    return (
      <div className="general">
        <div className="grid wide">
          <form onSubmit={handleSubmit(onHanldeSubmit)}>
            <div className="row">
              <div className="col l-8 m-7 c-12">
                <div className="space-right">
                  <TextField
                    className="margin"
                    {...register('nameActivity', {
                      required: 'This input is required',
                    })}
                    id="outlined-required"
                    label="Tên chương trình"
                    margin="dense"
                    error={errors.nameActivity}
                    helperText={
                      errors.nameActivity && errors.nameActivity?.message
                    }
                  />
                  <div className="date-time">
                    <TextField
                      className="date-picker margin"
                      {...register('startDate', {
                        required: 'This input is required',
                      })}
                      id="date-start"
                      label="Ngày bắt đầu"
                      type="date"
                      defaultValue={new Date()}
                      sx={{ width: 220 }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      error={errors.startDate}
                      helperText={errors.startDate && errors.startDate?.message}
                    />
                    <div className="text-to"> Đến </div>
                    <TextField
                      className="date-picker margin"
                      {...register('endDate', {
                        required: 'This input is required',
                      })}
                      id="date-end"
                      label="Ngày kết thúc"
                      type="date"
                      defaultValue={new Date()}
                      sx={{ width: 220 }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      error={errors.endDate}
                      helperText={errors.endDate && errors.endDate?.message}
                    />
                  </div>
                  <TextField
                    className="margin"
                    {...register('place', {
                      required: 'This input is required',
                    })}
                    id="outlined-required"
                    label="Địa điểm tổ chức"
                    margin="dense"
                    error={errors.place}
                    helperText={errors.place && errors.place?.message}
                  />
                  <TextField
                    className="margin"
                    {...register('benefit', {
                      required: 'This input is required',
                    })}
                    id="outlined-required"
                    label="Quyền lợi tham gia"
                    margin="dense"
                    error={errors.benefit}
                    helperText={errors.benefit && errors.benefit?.message}
                  />
                  <TextField
                    className="margin"
                    {...register('description', {
                      required: 'This input is required',
                    })}
                    id="outlined-required"
                    label="Mô tả chương trình"
                    margin="dense"
                    error={errors.description}
                    helperText={
                      errors.description && errors.description?.message
                    }
                  />
                  <TextField
                    className="margin"
                    {...register('social', {
                      required: 'This input is required',
                    })}
                    id="outlined-required"
                    label="Link bài viết mạng xã hội"
                    margin="dense"
                    error={errors.social}
                    helperText={errors.social && errors.social?.message}
                  />
                  <div className="text-note">
                    Poster chương trình: (kích thước 1920x1080)
                  </div>
                  <div className="poster-img">
                    {thumbnail ? (
                      <img
                        src={thumbnail.preview}
                        alt=""
                        className="preview_picture"
                      />
                    ) : (
                      <img
                        src={placeHolderImage}
                        alt=""
                        className="preview_picture"
                      />
                    )}
                    <Box textAlign="center">
                      <Button
                        variant="contained"
                        component="label"
                        className="btn_upload_image"
                        size="medium"
                      >
                        Upload Poster
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
              <div className="col l-4 m-5 c-12">
                <div className="space-left">
                  <TextField
                    className="margin"
                    fullWidth
                    {...register('tag', {
                      required: 'This input is required',
                    })}
                    select
                    label="Lĩnh vực hoạt động"
                    value={currency}
                    onChange={handleChange}
                    margin="dense"
                    error={errors.tag}
                    helperText={errors.tag && errors.tag?.message}
                  >
                    {typeActivity.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    className="margin"
                    {...register('namePerson', {
                      required: 'This input is required',
                    })}
                    id="outlined-required"
                    label="Cán bộ phụ trách"
                    margin="dense"
                    error={errors.socinamePersonal}
                    helperText={errors.namePerson && errors.namePerson?.message}
                  />
                  <TextField
                    className="margin"
                    {...register('regency', {
                      required: 'This input is required',
                    })}
                    id="outlined-required"
                    label="Chức vụ"
                    margin="dense"
                    error={errors.regency}
                    helperText={errors.regency && errors.regency?.message}
                  />
                  <TextField
                    className="margin"
                    {...register('phone', {
                      required: 'This input is required',
                    })}
                    id="outlined-required"
                    label="Số điện thoại liên lạc"
                    margin="dense"
                    error={errors.phone}
                    helperText={errors.phone && errors.phone?.message}
                  />
                  <Button
                    type="submit"
                    className="btn-submit-activity margin"
                    variant="contained"
                  >
                    ĐĂNG KÝ
                  </Button>
                  <div>
                    <div className="text-foot">* Chú ý:</div>
                    <div className="text-note">- Điền đầy đủ các thông tin</div>
                    <div className="text-note">
                      - Chương sẽ được duyệt từ 2 - 3 ngày
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    )

  return <NotFound />
}
export default CreateActivity
