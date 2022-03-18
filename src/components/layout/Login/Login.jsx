/* eslint-disable react/no-this-in-sfc */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-children-prop */
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import PersonIcon from '@mui/icons-material/Person'
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import Checkbox from '@mui/material/Checkbox'
import React, { useState, useEffect } from 'react'
import { GoogleLogin } from 'react-google-login'
import { useDispatch } from 'react-redux'
import * as EmailValidator from 'email-validator'
import { Link } from 'react-router-dom'
import googleIcon from '../../../assets/google.png'
import imgwellcome from '../../../assets/posterwellcome.png'
import * as authActions from '../../../store/reducers/AuthReducer'
import './Login.css'

const Login = () => {
  const initialValues = { emailUser: '', passwordUser: '' }
  const [formValues, setFormValues] = useState(initialValues)
  const [formError, setFormError] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)

  const dispatch = useDispatch()
  const loginGoogle = (res) => {
    dispatch(authActions.login({ tokenId: res.tokenId }))
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const validate = (values) => {
    const errors = {}
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
    if (!values.emailUser) {
      errors.emailUser = 'Không được bỏ trống trường này!'
    } else if (!regex.test(values.emailUser)) {
      errors.emailUser = 'Yêu cầu đúng định dạng Email!'
    }
    if (!values.passwordUser) {
      errors.passwordUser = 'Không được bỏ trống trường này!'
    } else if (values.passwordUser.length <= 4) {
      errors.passwordUser = 'Password phải nhiều hơn 4 ký tự!'
    } else if (values.passwordUser.length > 15) {
      errors.passwordUser = 'Password không được vượt quá 15 ký tự!'
    }
    return errors
  }

  const loginAccount = (e) => {
    e.preventDefault()
    const errorValue = validate(formValues)
    if (
      errorValue?.emailUser?.length === undefined &&
      errorValue?.passwordUser?.length === undefined
    ) {
      const email = formValues.emailUser
      const password = formValues.passwordUser
      dispatch(authActions.login({ email, password }))
    } else setFormError(errorValue)
  }

  // const loginAccount = async () => {
  //   // dispatch(authActions.login({ email, password }))
  // }

  return (
    <div className="login">
      <div className="grid wide">
        <div className="login_container">
          <div className="login_picture_content">
            <img src={imgwellcome} alt="" className="login_picture--item" />
            <form className="formLogin">
              <div className="login_picture_space">
                <div className="login-title">ĐĂNG NHẬP</div>
                <div className="user">
                  <MailOutlineIcon className="icon-login" fontSize="large" />
                  <div className="shape" />
                  <input
                    value={formValues.emailUser}
                    name="emailUser"
                    placeholder="Email"
                    className="inputUser"
                    onChange={handleChange}
                    // onInput={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="container_err_noti_login">
                  <p className="err_noti_login">{formError.emailUser}</p>
                </div>
                <div className="pass">
                  <VpnKeyIcon className="icon-login" fontSize="large" />
                  <div className="shape" />
                  <input
                    type="password"
                    name="passwordUser"
                    value={formValues.passwordUser}
                    placeholder="Mật khẩu"
                    className="inputPass"
                    onChange={handleChange}
                    // onInput={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="container_err_noti_login">
                  <p className="err_noti_login">{formError.passwordUser}</p>
                </div>
                <div className="spaceCheck">
                  <div className="checkRemember">
                    <Checkbox className="checkbox-remember" color="primary" />
                    Ghi nhớ
                  </div>
                  <div className="checkForgot">Quên mật khẩu ?</div>
                </div>
                <div className="login-space">
                  <Link
                    className="btn-login"
                    to="/login"
                    onClick={loginAccount}
                  >
                    <PersonIcon className="btn-login-icon" fontSize="medium" />
                    Đăng nhập
                  </Link>
                </div>
                <div className="login-space-google">
                  <GoogleLogin
                    clientId="104143514072-mqfqcs527rvo4skvgookfb8apdrujvgg.apps.googleusercontent.com"
                    render={(renderProps) => (
                      <Link
                        className="btn-login-google"
                        to="/"
                        onClick={renderProps.onClick}
                      >
                        <img
                          src={googleIcon}
                          alt="google"
                          className="icon-google"
                        />
                        Đăng nhập bằng Google
                      </Link>
                    )}
                    onSuccess={loginGoogle}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Login
