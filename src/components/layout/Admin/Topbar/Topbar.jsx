/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react'
import './Topbar.css'
import { NotificationsNone, Settings } from '@material-ui/icons'
import SearchIcon from '@mui/icons-material/Search'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined'
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Avatar from '@mui/material/Avatar'
import AvatarAdmin from '../../../../assets/avatar_admin.jpg'
import * as authActions from '../../../../store/reducers/AuthReducer'

function Topbar() {
  const [dataUser, setDataUser] = useState({})
  const [dropdown, setDropdown] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const showDropdown = () => setDropdown(!dropdown)

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(authActions.logout())
  }

  useEffect(() => {
    if (localStorage.getItem('authLogin')) {
      const authLogin = JSON.parse(localStorage.getItem('authLogin'))
      setDataUser(authLogin)
    }
  }, [isLoggedIn])
  return (
    <div className="Topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <div className="search_dashboard">
            <input className="Topbar_input" />
            <SearchIcon className="searchDasboard_icon" />
          </div>
        </div>
        <div className="topRight">
          {/* <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div> */}
          <Avatar
            src={dataUser?.user?.picture}
            className="avatar_admin"
            onClick={showDropdown}
          />
          <div className={dropdown ? 'menu active' : 'menu'}>
            <h3>
              ADMIN <br />
              <span>Người quản trị</span>
            </h3>
            <ul>
              <li>
                <div>
                  <PermIdentityOutlinedIcon className="icon_avatar" />
                  <Link
                    to="/dashboard/infor-admin"
                    className="text_dropdown_menu"
                  >
                    {' '}
                    Thông tin cá nhân{' '}
                  </Link>
                </div>
                <div>
                  <ChangeCircleOutlinedIcon className="icon_avatar" />
                  <Link
                    to="/dashboard/change-password-admin"
                    className="text_dropdown_menu"
                  >
                    {' '}
                    Đổi mật khẩu{' '}
                  </Link>
                </div>
                <div>
                  <LogoutOutlinedIcon className="icon_avatar" />
                  <Link onClick={handleLogout} className="text_dropdown_menu">
                    {' '}
                    Đăng xuất{' '}
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Topbar
