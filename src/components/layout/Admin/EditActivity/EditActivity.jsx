/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react'
import { Box, Button, MenuItem, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { closeLoading, showLoading } from 'store/reducers/LoadingSlide'
import { fetchAddActivity } from 'store/reducers/ActivityReducer'
import { useDispatch, useSelector } from 'react-redux'
import storage from 'utils/firebase'
import { Link, useParams } from 'react-router-dom'
import { typeActivity } from '../../../../utils/constant'
import placeHolderImage from '../../../../assets/placehover_image.png'
import {
  fetchActivity,
  fetchEditActivity,
} from '../../../../store/reducers/ActivityReducer'
import './EditActitvity.css'
import NotFound from '../../NotFound/NotFound'

const CreateActivity = () => {
  const { slug } = useParams()
  const Activity = useSelector((state) => state.activities.Activity)
  const authLogin = JSON.parse(localStorage.getItem('authLogin'))
  const idActivity = Activity._id
  const dispatch = useDispatch()
  const [currency, setCurrency] = useState('dao-duc')
  const [thumbnail, setThumnail] = useState()
  console.log(authLogin?.role)

  const [disable, setDisable] = useState(
    !!(authLogin?.user.role === 'admin' && Activity?.status === true)
  )
  const nameButton =
    authLogin?.user.role === 'admin' && Activity?.status === true
      ? 'Chỉnh sửa'
      : 'Duyệt Hoạt động'
  console.log(nameButton)
  const handleChange = (event) => {
    setDisable(false)
    setCurrency(event.target.value)
  }
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    setValue,
    isValid,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      nameActivity: '',
      startDate: '',
      endDate: '',
      place: '',
      benefit: '',
      description: '',
      social: '',
      namePerson: '',
      regency: '',
      phone: '',
    },
  })
  useEffect(() => {
    setValue('nameActivity', `${Activity?.nameActivity}`)
    setValue('startDate', Activity.startDate?.toString().split('T')[0])
    setValue('endDate', Activity.endDate?.toString().split('T')[0])
    setValue('place', `${Activity?.place}`)
    setValue('benefit', `${Activity?.benefit}`)
    setValue('description', `${Activity?.description}`)
    setValue('social', `${Activity?.social}`)
    setCurrency(Activity?.tag)
    setValue('namePerson', `${Activity?.namePerson}`)
    setValue('regency', `${Activity?.regency}`)
    setValue('phone', `${Activity?.phone}`)
    setThumnail(Activity?.thumbnail)
  }, [Activity])

  useEffect(() => {
    dispatch(fetchActivity(slug))
  }, [])

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
      if (thumbnail !== Activity?.thumbnail) {
        firebaseUpload(thumbnail)
          .then((thumbnail) => {
            dispatch(closeLoading())
            dispatch(fetchEditActivity({ ...e, thumbnail, idActivity }))
            setDisable(false)
            reset()
            setThumnail()
          })
          .catch((error) => {
            reject(error)
          })
      } else {
        dispatch(fetchEditActivity({ ...e, idActivity }))
        setDisable(false)
        dispatch(closeLoading())
      }
    })
  }

  const onHandlePreview = (event) => {
    if (event.target.files.length !== 0) {
      const file = event.target.files[0]
      file.preview = URL.createObjectURL(file)
      setThumnail(file)
    }
  }
  const onchangeFielActivity = () => {
    setDisable(false)
  }

  if (Activity === null) {
    return <NotFound />
  }
  if (
    localStorage.getItem('authLogin') &&
    JSON.parse(localStorage.getItem('authLogin')).user.role === 'admin'
  )
    return (
      <div className="edit_activity">
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
                    onChange={onchangeFielActivity}
                    // margin="dense"
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
                      onChange={onchangeFielActivity}
                      defaultValue="13/06/2000"
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
                      onChange={onchangeFielActivity}
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
                    onChange={onchangeFielActivity}
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
                    onChange={onchangeFielActivity}
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
                    onChange={onchangeFielActivity}
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
                    onChange={onchangeFielActivity}
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
                        src={
                          typeof thumbnail === 'object'
                            ? thumbnail.preview
                            : thumbnail
                        }
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
                        onChange={onchangeFielActivity}
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
                    {...register('tag')}
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
                    onChange={onchangeFielActivity}
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
                    onChange={onchangeFielActivity}
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
                    onChange={onchangeFielActivity}
                    label="Số điện thoại liên lạc"
                    margin="dense"
                    error={errors.phone}
                    helperText={errors.phone && errors.phone?.message}
                  />
                  <Button
                    type="submit"
                    className="btn-submit-activity margin"
                    variant="contained"
                    disabled={disable}
                  >
                    {nameButton}
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
