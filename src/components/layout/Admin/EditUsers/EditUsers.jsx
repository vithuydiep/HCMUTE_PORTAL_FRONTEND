/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import PropTypes from 'prop-types'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { FaBars } from 'react-icons/fa'
import './EditUsers.css'
import EditIcon from '@mui/icons-material/Edit'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import SaveIcon from '@mui/icons-material/Save'
import { Button, TextField, MenuItem } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useConfirm } from 'material-ui-confirm'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { showLoading } from 'store/reducers/LoadingSlide'
import { Topbar } from '../Topbar'
import { NotFound } from '../../NotFound'
import firebaseUpload from '../../../../helper/uploadImage'
import {
  fetchUserEditForAdmin,
  updateInfoUserEditAdmin,
} from '../../../../store/reducers/AuthReducer'
import { typeRoleUser } from '../../../../utils/constant'

function EditUsers({ handleToggleSidebar }) {
  const { idUser } = useParams()
  const confirm = useConfirm()
  const dispatch = useDispatch()
  const currentUserForAdmin = useSelector(
    (state) => state.Auth.currentUserEditForAdmin
  )
  const [disable, setDisable] = useState(true)
  const [avatar, setAvatar] = useState()
  const [currency, setCurrency] = useState('user:student')

  const Input = styled('input')({
    display: 'none',
  })
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      phone: '',
      dateOfBirth: '',
      address: '',
    },
  })
  useEffect(() => {
    dispatch(fetchUserEditForAdmin(idUser))
  }, [])

  useEffect(() => {
    setValue('fullName', `${currentUserForAdmin?.fullName}`)
    setValue('phone', `${currentUserForAdmin?.phone}`)
    setValue('address', `${currentUserForAdmin?.address}`)
    setValue('dateOfBirth', `${currentUserForAdmin?.dateOfBirth}`)
    setAvatar(currentUserForAdmin?.picture)
    if (currentUserForAdmin?.role !== undefined)
      setCurrency(currentUserForAdmin?.role)
  }, [currentUserForAdmin])

  useEffect(() => {
    return () => {
      // eslint-disable-next-line no-unused-expressions
      avatar && URL.revokeObjectURL(avatar.preview)
    }
  }, [avatar])

  const handleChange = (event) => {
    setCurrency(event.target.value)
  }

  const onHandleSubmit = (e) => {
    dispatch(showLoading())
    return new Promise((resolve, reject) => {
      if (avatar !== currentUserForAdmin?.picture) {
        firebaseUpload(avatar)
          .then((picture) => {
            dispatch(updateInfoUserEditAdmin({ ...e, picture, idUser }))
            setDisable(true)
          })
          .catch((error) => {
            reject(error)
          })
      } else {
        dispatch(updateInfoUserEditAdmin({ ...e, idUser }))
        setDisable(true)
      }
    })
  }

  const onHandleClickEdit = () => {
    setDisable(false)
  }

  const onSetAvatarPreview = (event) => {
    if (event.target.files.length !== 0) {
      const file = event.target.files[0]
      file.preview = URL.createObjectURL(file)
      setAvatar(file)
    }
  }
  const onHandleConfirmCancel = () => {
    confirm({
      description: 'Bạn muốn hủy thao tác cập nhật thông tin?',
      title: 'Xác nhận hành động',
    })
      .then(() => setDisable(true))
      .catch(() => console.log('Deletion cancelled.'))
  }
  if (
    localStorage.getItem('authLogin') &&
    JSON.parse(localStorage.getItem('authLogin')).user.role === 'admin'
  )
    return (
      <main>
        <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
          <FaBars />
        </div>
        <Topbar />
        <div className="grid wide">
          <div className="infor_user">
            {disable && (
              <IconButton
                aria-label="edit"
                color="primary"
                className="infor_user_edit_btn"
                onClick={onHandleClickEdit}
              >
                <EditIcon />
              </IconButton>
            )}
            <div className="infor_user_avatar">
              <Avatar
                alt="Remy Sharp"
                src={typeof avatar === 'object' ? avatar.preview : avatar}
                sx={{ width: 250, height: 250 }}
              />
              {!disable && (
                // eslint-disable-next-line jsx-a11y/label-has-associated-control
                // eslint-disable-next-line jsx-a11y/label-has-for
                <label htmlFor="icon-button-file" className="uploadAvatarUser">
                  <Input
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    onChange={onSetAvatarPreview}
                  />
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
              )}
            </div>
            <div className="infor_username">
              {currentUserForAdmin?.fullName}
            </div>
            <form
              onSubmit={handleSubmit(onHandleSubmit)}
              className="infor_userform"
            >
              <TextField
                fullWidth
                label="Mail"
                margin="dense"
                value={currentUserForAdmin?.email}
                inputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: true }}
              />
              {/* <TextField
                fullWidth
                label="Role"
                margin="dense"
                value={
                  currentUserForAdmin?.role === 'user:student'
                    ? 'Sinh viên'
                    : 'Cơ sở'
                }
                inputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: true }}
              /> */}
              <TextField
                fullWidth
                {...register('role')}
                select
                label="Role"
                value={currency}
                onChange={handleChange}
                margin="dense"
                error={errors.type?.message.length > 0}
                helperText={errors.type && errors.type?.message}
              >
                {typeRoleUser.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                {...register('fullName', {
                  required: 'This input is required',
                })}
                id="outlined-required"
                label="Họ và tên"
                margin="dense"
                error={errors.fullName?.message.length > 0}
                helperText={errors.fullName && errors.fullName?.message}
                inputProps={{ readOnly: disable }}
              />
              <TextField
                fullWidth
                {...register('phone', {
                  required: 'This input is required',
                })}
                id="outlined-required"
                label="Số điện thoại"
                margin="dense"
                error={errors.phone?.message.length > 0}
                helperText={errors.phone && errors.phone?.message}
                inputProps={{ readOnly: disable }}
              />
              <TextField
                className="infor_userform_date-picker"
                {...register('dateOfBirth', {
                  required: 'This input is required',
                })}
                id="date-start"
                label="Ngày sinh"
                type="date"
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
                defaultValue={currentUserForAdmin?.dateOfBirth}
                error={errors.startDate}
                helperText={errors.startDate && errors.startDate?.message}
                inputProps={{ readOnly: disable }}
              />
              <TextField
                fullWidth
                {...register('address', {})}
                id="outlined-required"
                label="Địa chỉ"
                margin="dense"
                error={errors.phone?.message.length > 0}
                helperText={errors.phone && errors.phone?.message}
                inputProps={{ readOnly: disable }}
              />
              {!disable && (
                <div className="infor_user_btn_submit">
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
                    color="primary"
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="contained"
                  >
                    Save
                  </Button>
                </div>
              )}
            </form>
          </div>
        </div>
      </main>
    )
  return (
    <main>
      <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
        <FaBars />
      </div>
      <Topbar />
      <NotFound />
    </main>
  )
}

EditUsers.propTypes = {
  handleToggleSidebar: PropTypes.func.isRequired,
}

export default EditUsers
