/* eslint-disable no-unused-vars */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-wrap-multilines */
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { FaBars } from 'react-icons/fa'
import './ChangePasswordAdmin.css'
import SaveIcon from '@mui/icons-material/Save'
import { Button, TextField } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { useConfirm } from 'material-ui-confirm'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { showLoading } from 'store/reducers/LoadingSlide'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { useHistory } from 'react-router-dom'
import { getUser, updateInfoUser } from '../../../../store/reducers/AuthReducer'
import { NotFound } from '../../NotFound'
import { Topbar } from '../Topbar'

function ChangePasswordAdmin({ handleToggleSidebar }) {
  const confirm = useConfirm()
  const dispatch = useDispatch()
  const history = useHistory()
  const [confirmPassword, setConfirmPassword] = useState('')
  const [password, setPassword] = useState('')
  const [passwordOld, setPasswordOld] = useState('')
  const [isError, setIsError] = useState('')
  const currentUser = useSelector((state) => state.Auth.currentUser)
  console.log(currentUser)
  const {
    register,
    formState: { errors, isValid },
    reset,
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      passwordOld: '',
      passwordNew: '',
      passwordRenew: '',
    },
  })

  const [valuesOld, setValuesOld] = useState({
    passwordOld: '',
    showPasswordOld: false,
  })

  const handleClickShowPasswordOld = () => {
    setValuesOld({
      ...valuesOld,
      showPasswordOld: !valuesOld.showPasswordOld,
    })
  }

  const [valuesNew, setValuesNew] = useState({
    passwordNew: '',
    showPasswordNew: false,
  })

  const handleClickShowPasswordNew = () => {
    setValuesNew({
      ...valuesNew,
      showPasswordNew: !valuesNew.showPasswordNew,
    })
  }

  const [valuesRenew, setValuesRenew] = useState({
    passwordRenew: '',
    showPasswordRenew: false,
  })

  const handleClickShowPasswordRenew = () => {
    setValuesRenew({
      ...valuesRenew,
      showPasswordRenew: !valuesRenew.showPasswordRenew,
    })
  }

  useEffect(() => {
    dispatch(getUser())
  }, [])

  const checkValidation = (e) => {
    setConfirmPassword(e.target.value)
    if (password !== confirmPassword) {
      setIsError('M???t kh???u ch??a tr??ng kh???p!')
    } else {
      setIsError('M???t kh???u tr??ng kh???p!')
    }
  }
  const onHandleSubmit = (e) => {
    if (password !== confirmPassword) {
      alert('M???t kh???u x??c nh???n ch??a tr??ng kh???p!')
    } else {
      alert('M???t kh???u x??c nh???n tr??ng kh???p!')
      // dispatch(showLoading())
      // return new Promise(() => {
      //   dispatch(updateInfoUser({ ...e }))
      // })
    }
  }

  const onHandleConfirmCancel = () => {
    confirm({
      description: 'B???n mu???n h???y thao t??c ?????i m???t kh???u?',
      title: 'X??c nh???n h??nh ?????ng',
    })
      .then(() => history.goBack())
      .catch(() => console.log('Change Password cancelled.'))
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
        <div style={{ position: 'absolute', top: 100, marginLeft: 330 }}>
          {isError}
        </div>
        <div className="grid wide">
          <div className="infor_user">
            <div className="infor_username">?????i m???t kh???u</div>
            <form
              onSubmit={handleSubmit(onHandleSubmit)}
              className="infor_userform"
            >
              <TextField
                fullWidth
                {...register('passwordOld', {
                  required: 'Kh??ng ???????c b??? tr???ng ?? n??y!',
                })}
                label="Nh???p m???t kh???u c??"
                value={passwordOld}
                onChange={(e) => setPasswordOld(e.target.value)}
                type={valuesOld.showPasswordOld ? 'text' : 'password'}
                margin="dense"
                error={errors.passwordOld?.message.length > 0}
                helperText={errors.passwordOld && errors.passwordOld?.message}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPasswordOld}
                      edge="end"
                    >
                      {valuesOld.showPasswordOld ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <TextField
                fullWidth
                {...register('passwordNew', {
                  required: 'Kh??ng ???????c b??? tr???ng ?? n??y!',
                })}
                label="Nh???p m???t kh???u m???i"
                type={valuesNew.showPasswordNew ? 'text' : 'password'}
                margin="dense"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.passwordNew?.message.length > 0}
                helperText={errors.passwordNew && errors.passwordNew?.message}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPasswordNew}
                      edge="end"
                    >
                      {valuesNew.showPasswordNew ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <TextField
                fullWidth
                {...register('passwordRenew', {
                  required: 'Kh??ng ???????c b??? tr???ng ?? n??y!',
                })}
                label="Nh???p l???i m???t kh???u m???i"
                type={valuesRenew.showPasswordRenew ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                margin="dense"
                error={errors.passwordRenew?.message.length > 0}
                helperText={
                  errors.passwordRenew && errors.passwordRenew?.message
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPasswordRenew}
                      edge="end"
                    >
                      {valuesRenew.showPasswordRenew ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
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
                >
                  Change
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

ChangePasswordAdmin.propTypes = {
  handleToggleSidebar: PropTypes.func.isRequired,
}

export default ChangePasswordAdmin
