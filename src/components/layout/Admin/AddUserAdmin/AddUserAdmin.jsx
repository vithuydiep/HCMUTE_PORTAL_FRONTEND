/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { FaBars } from 'react-icons/fa'
import './AddUserAdmin.css'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import SaveIcon from '@mui/icons-material/Save'
import { Button, TextField, MenuItem } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useConfirm } from 'material-ui-confirm'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { showLoading, closeLoading } from 'store/reducers/LoadingSlide'
import { Topbar } from '../Topbar'
import { NotFound } from '../../NotFound'
import firebaseUpload from '../../../../helper/uploadImage'
import { fetchAddUsers } from '../../../../store/reducers/UsersSlice'
import { typeRoleUser } from '../../../../utils/constant'

function AddUserAdmin({ handleToggleSidebar }) {
  const confirm = useConfirm()
  const dispatch = useDispatch()
  const history = useHistory()
  const [avatar, setAvatar] = useState()
  const [currency, setCurrency] = useState('user:student')

  const Input = styled('input')({
    display: 'none',
  })
  const {
    register,
    formState: { errors, isValid },
    reset,
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
      phone: '',
      dateOfBirth: '',
      address: '',
    },
  })

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
      firebaseUpload(avatar)
        // eslint-disable-next-line no-shadow
        .then((picture) => {
          dispatch(fetchAddUsers({ ...e, picture }))
          reset({})
          setAvatar()
          dispatch(closeLoading())
        })
        .catch((error) => {
          reject(error)
          dispatch(closeLoading())
        })
    })
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
      description: 'Bạn muốn hủy thao tác tạo người dùng?',
      title: 'Xác nhận hành động',
    })
      .then(() => history.goBack())
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
            <div className="infor_user_avatar">
              <Avatar
                alt="Remy Sharp"
                src={typeof avatar === 'object' ? avatar.preview : avatar}
                sx={{ width: 250, height: 250 }}
              />
              {
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
              }
            </div>
            <form
              onSubmit={handleSubmit(onHandleSubmit)}
              className="infor_userform"
            >
              <TextField
                fullWidth
                {...register('email', {
                  required: 'This input is required',
                })}
                id="outlined-required"
                label="Email"
                margin="dense"
                error={errors.email?.message.length > 0}
                helperText={errors.email && errors.email?.message}
              />
              <TextField
                fullWidth
                {...register('password]', {
                  required: 'This input is required',
                })}
                id="outlined-required"
                label="Password"
                margin="dense"
                error={errors.password?.message.length > 0}
                helperText={errors.password && errors.password?.message}
              />
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
                error={errors.startDate}
                helperText={errors.startDate && errors.startDate?.message}
              />
              <TextField
                fullWidth
                {...register('address', {})}
                id="outlined-required"
                label="Địa chỉ"
                margin="dense"
                error={errors.address?.message.length > 0}
                helperText={errors.address && errors.address?.message}
              />
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
                  disabled={!isValid}
                >
                  Create
                </Button>
              </div>
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

AddUserAdmin.propTypes = {
  handleToggleSidebar: PropTypes.func.isRequired,
}

export default AddUserAdmin
