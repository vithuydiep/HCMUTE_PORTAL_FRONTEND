/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-one-expression-per-line */
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import HomeIcon from '@mui/icons-material/Home'
import MenuIcon from '@mui/icons-material/Menu'
import PersonIcon from '@mui/icons-material/Person'
import SearchIcon from '@mui/icons-material/Search'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import { useHistory, Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setSearchText } from 'store/reducers/NewsSlice'
import branch from '../../../assets/branch.png'
import flatEng from '../../../assets/flatEng.png'
import flatVN from '../../../assets/flatVN.png'
import * as authActions from '../../../store/reducers/AuthReducer'
import { closeDrawer, openDrawer } from '../../../store/reducers/DrawerSlide'
import TemporaryDrawer from '../Drawer/Drawer'
import './Header.css'

function Header() {
  const [dataUser, setDataUser] = useState({})
  const [menuName, setMenuName] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const isShowMenu = useSelector((state) => state.drawer.isShow)
  const search = useSelector((state) => state.news.search)
  const [err, setErr] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()

  const handleEditMenuName = (value) => {
    setMenuName(value)
  }

  const handleOpenDrawer = () => {
    dispatch(openDrawer())
  }
  const handleCloseDrawer = () => {
    dispatch(closeDrawer())
    setIsLoggedIn(false)
  }
  const handleLogout = () => {
    dispatch(authActions.logout())
  }

  const onHandleSearch = () => {
    if (search.length === 0) {
      setErr(true)
    } else {
      history.push('/general')
      setErr(false)
    }
  }

  const onHanleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onHandleSearch()
    }
  }

  useEffect(() => {
    if (localStorage.getItem('authLogin')) {
      const authLogin = JSON.parse(localStorage.getItem('authLogin'))
      if (authLogin.tokens.access.token) {
        if (
          new Date(authLogin.tokens.access.expires).getTime() <
          new Date().getTime()
        ) {
          dispatch(authActions.refreshToken(authLogin.tokens.refresh.token))
        }
      }
      setIsLoggedIn(true)
      setDataUser(authLogin)
    }
  }, [isLoggedIn])

  return (
    <>
      <div className="header">
        <div className="grid wide">
          <div className="row">
            <div className="col l-6 m-6 c-12">
              <img src={branch} alt="logo" className="logo_header" />
            </div>
            <div className="col l-6 m-6 c-12">
              <div className="flag">
                <img src={flatVN} alt="vietnam" className="icon" />
                <img src={flatEng} alt="english" className="icon" />
              </div>
              <div className="search">
                <div className="input">
                  <input
                    placeholder="T??m ki???m th??ng tin"
                    className="inputSearch"
                    value={search}
                    onChange={(e) => {
                      dispatch(setSearchText(e.target.value))
                    }}
                    onKeyDown={onHanleKeyDown}
                  />

                  <IconButton onClick={onHandleSearch}>
                    <SearchIcon />
                  </IconButton>
                </div>
              </div>
              {err && (
                <div className="error_search">
                  Vui l??ng nh???p d??? li???u ????? t??m ki???m
                </div>
              )}
              {isLoggedIn ? (
                <div className="spaceUserLogin">
                  <div className="userLogin">
                    <Avatar src={dataUser.user.picture} />
                    <div className="nameUser">{dataUser.user.displayName}</div>
                    <ArrowDropDownIcon fontSize="large" className="iconDrop" />
                    {dataUser.user.role === 'user:unionBase' ? (
                      <div className="user_hover_overview">
                        <div className="user_hove_dropdown--item">
                          <Link
                            className="user_hove_dropdown--item--label"
                            to="/request-news"
                          >
                            Qu???n l?? b???ng tin ????? xu???t
                          </Link>
                        </div>
                        <div className="user_hove_dropdown--item--underline" />
                        <div className="user_hove_dropdown--item">
                          <Link
                            className="user_hove_dropdown--item--label"
                            to="/create-activity"
                          >
                            ????ng k?? ch????ng tr??nh
                          </Link>
                        </div>
                        <div className="user_hove_dropdown--item--underline" />
                        <div className="user_hove_dropdown--item">
                          <Link
                            className="user_hove_dropdown--item--label"
                            to="/create"
                          >
                            Th??m b??i vi???t
                          </Link>
                        </div>
                        <div className="user_hove_dropdown--item--underline" />
                        <div className="user_hove_dropdown--item">
                          <Link
                            className="user_hove_dropdown--item--label"
                            onClick={handleLogout}
                            to=""
                          >
                            ????ng xu???t
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div className="user_hover_overview">
                        <div className="user_hove_dropdown--item">
                          <Link
                            className="user_hove_dropdown--item--label"
                            to="/info"
                          >
                            Th??ng tin c?? nh??n
                          </Link>
                        </div>
                        <div className="user_hove_dropdown--item--underline" />
                        <div className="user_hove_dropdown--item">
                          <Link
                            className="user_hove_dropdown--item--label"
                            to="/student-activity"
                          >
                            Ch????ng tr??nh ho???t ?????ng
                          </Link>
                        </div>
                        <div className="user_hove_dropdown--item--underline" />
                        <div className="user_hove_dropdown--item">
                          <Link
                            className="user_hove_dropdown--item--label"
                            onClick={handleLogout}
                            to=""
                          >
                            ????ng xu???t
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="login_signup_space">
                  <Link className="btn_login_signup" to="/login">
                    <PersonIcon className="btn_login_signup--icon" />
                    ????ng nh???p
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="menulist">
          <div className="grid wide">
            <div className="navigation">
              <div className="nav_item_link">
                <a className="navigation_item" href="/">
                  <HomeIcon />
                  Trang ch???
                </a>
              </div>
              <div className="nav_item_link nav_item_link--hover--introduce">
                <div className="navigation_item">
                  Gi???i thi???u
                  <ArrowDropDownIcon />
                </div>
                <div className="nav_hover_introduce_overview">
                  <div className="nav_hove_dropdown--item">
                    <Link
                      className="nav_hove_dropdown--item--label"
                      to="/overview"
                    >
                      Th??ng tin chung
                    </Link>
                    <div className="nav_hove_dropdown--item--underline" />
                  </div>
                  <div className="nav_hove_dropdown--item">
                    <Link
                      className="nav_hove_dropdown--item--label"
                      to="/overview/youthunion"
                    >
                      Th??ng tin ??o??n - H???i Tr?????ng
                    </Link>
                    <div className="nav_hove_dropdown--item--underline" />
                  </div>
                  <div className="nav_hove_dropdown--item">
                    <Link
                      className="nav_hove_dropdown--item--label"
                      to="/overview/baseinfo"
                    >
                      Th??ng tin c?? s??? ??o??n - H???i
                    </Link>
                    <div className="nav_hove_dropdown--item--underline" />
                  </div>
                  <div className="nav_hove_dropdown--item">
                    <Link
                      className="nav_hove_dropdown--item--label"
                      to="/overview/clubinfo"
                    >
                      Th??ng tin c?? s??? CLB - ?????i - Nh??m
                    </Link>
                  </div>
                </div>
              </div>
              <div className="nav_item_link hover_news">
                <div className="navigation_item ">
                  B???ng tin
                  <ArrowDropDownIcon />
                </div>
                <div className="nav_hover_news">
                  <div className="nav_hover_news_overview">
                    <ul className="nav_hover_news_item">
                      <div className="nav_hove_dropdown--item">
                        <a
                          className="nav_hove_dropdown--item--label"
                          href="/general"
                        >
                          Th??ng tin chung
                        </a>
                        <div className="nav_hove_dropdown--item--underline" />
                      </div>
                      <div className="nav_hove_dropdown--item">
                        <a
                          className="nav_hove_dropdown--item--label"
                          href="/general/tin-noi-bat"
                        >
                          Tin n???i b???t
                        </a>
                        <div className="nav_hove_dropdown--item--underline" />
                      </div>
                      <div className="nav_hove_dropdown--item">
                        <a
                          className="nav_hove_dropdown--item--label"
                          href="/general/tin-ute"
                        >
                          Tin UTE
                        </a>
                        <div className="nav_hove_dropdown--item--underline" />
                      </div>
                      <div className="nav_hove_dropdown--item">
                        <a
                          className="nav_hove_dropdown--item--label"
                          href="/general/thong-tin-thong-bao"
                        >
                          Th??ng tin - Th??ng b??o
                        </a>
                        <div className="nav_hove_dropdown--item--underline" />
                      </div>
                      <div className="nav_hove_dropdown--item">
                        <a
                          className="nav_hove_dropdown--item--label"
                          href="/general/chuong-trinh-hoat-dong"
                        >
                          Ch????ng tr??nh ho???t ?????ng
                        </a>
                        <div className="nav_hove_dropdown--item--underline" />
                      </div>
                      <div className="nav_hove_dropdown--item">
                        <a
                          className="nav_hove_dropdown--item--label"
                          href="/general/hoc-tap-nghien-cuu"
                        >
                          H???c t???p v?? nghi??n c???u
                        </a>
                        <div className="nav_hove_dropdown--item--underline" />
                      </div>
                      <div className="nav_hove_dropdown--item">
                        <a
                          className="nav_hove_dropdown--item--label"
                          href="/general/thong-tin-chung"
                        >
                          Th??ng b??o chung
                        </a>
                      </div>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="nav_item_link hover_news">
                <div className="navigation_item">
                  Ch????ng tr??nh
                  <ArrowDropDownIcon />
                </div>
                <div className="nav_hover_news">
                  <div className="nav_hover_news_overview">
                    <ul className="nav_hover_news_item">
                      <div className="nav_hove_dropdown--item">
                        <a
                          className="nav_hove_dropdown--item--label"
                          href="/general-activity/dao-duc"
                        >
                          R??n luy???n ?????o ?????c
                        </a>
                        <div className="nav_hove_dropdown--item--underline" />
                      </div>
                      <div className="nav_hove_dropdown--item">
                        <a
                          className="nav_hove_dropdown--item--label"
                          href="/general-activity/hoc-tap"
                        >
                          R??n luy???n h???c t???p - Nghi??n c???u khoa h???c
                        </a>
                        <div className="nav_hove_dropdown--item--underline" />
                      </div>
                      <div className="nav_hove_dropdown--item">
                        <a
                          className="nav_hove_dropdown--item--label"
                          href="/general-activity/the-luc"
                        >
                          R??n luy???n th??? ch???t
                        </a>
                        <div className="nav_hove_dropdown--item--underline" />
                      </div>
                      <div className="nav_hove_dropdown--item">
                        <a
                          className="nav_hove_dropdown--item--label"
                          href="/general-activity/tinh-nguyen"
                        >
                          Ho???t ?????ng t??nh nguy???n v?? c???ng ?????ng
                        </a>
                        <div className="nav_hove_dropdown--item--underline" />
                      </div>
                      <div className="nav_hove_dropdown--item">
                        <a
                          className="nav_hove_dropdown--item--label"
                          href="/general-activity/hoi-nhap"
                        >
                          Ho???t ?????ng H???i nh???p
                        </a>
                        <div className="nav_hove_dropdown--item--underline" />
                      </div>
                      <div className="nav_hove_dropdown--item">
                        <a
                          className="nav_hove_dropdown--item--label"
                          href="/general-activity/khac"
                        >
                          C??c ho???t ?????ng kh??c
                        </a>
                      </div>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="nav_item_link">
                <div className="navigation_item">
                  Sinh vi??n 5 t???t
                  <ArrowDropDownIcon />
                </div>
              </div>

              <div className="nav_item_link">
                <div className="navigation_item">
                  Thi ??ua khen th?????ng
                  <ArrowDropDownIcon />
                </div>
              </div>

              <div className="nav_item_link">
                <div className="navigation_item">
                  Li??n h???
                  <ArrowDropDownIcon />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="icon_drawer">
          <div className="icon_drawer_link" onClick={handleOpenDrawer}>
            <MenuIcon fontSize="large" />
          </div>
        </div>
      </div>
      <TemporaryDrawer
        isShowMenu={isShowMenu}
        handleCloseDrawer={handleCloseDrawer}
        handleOpenDrawer={handleOpenDrawer}
        handleEditMenuName={handleEditMenuName}
        menuName={menuName}
      />
    </>
  )
}

export default Header
