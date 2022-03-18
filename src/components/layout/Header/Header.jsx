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
                    placeholder="Tìm kiếm thông tin"
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
                  Vui lòng nhập dữ liệu để tìm kiếm
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
                            Quản lý bảng tin đề xuất
                          </Link>
                        </div>
                        <div className="user_hove_dropdown--item--underline" />
                        <div className="user_hove_dropdown--item">
                          <Link
                            className="user_hove_dropdown--item--label"
                            to="/create-activity"
                          >
                            Đăng ký chương trình
                          </Link>
                        </div>
                        <div className="user_hove_dropdown--item--underline" />
                        <div className="user_hove_dropdown--item">
                          <Link
                            className="user_hove_dropdown--item--label"
                            to="/create"
                          >
                            Thêm bài viết
                          </Link>
                        </div>
                        <div className="user_hove_dropdown--item--underline" />
                        <div className="user_hove_dropdown--item">
                          <Link
                            className="user_hove_dropdown--item--label"
                            onClick={handleLogout}
                            to=""
                          >
                            Đăng xuất
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
                            Thông tin cá nhân
                          </Link>
                        </div>
                        <div className="user_hove_dropdown--item--underline" />
                        <div className="user_hove_dropdown--item">
                          <Link
                            className="user_hove_dropdown--item--label"
                            to="/student-activity"
                          >
                            Chương trình hoạt động
                          </Link>
                        </div>
                        <div className="user_hove_dropdown--item--underline" />
                        <div className="user_hove_dropdown--item">
                          <Link
                            className="user_hove_dropdown--item--label"
                            onClick={handleLogout}
                            to=""
                          >
                            Đăng xuất
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
                    Đăng nhập
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
                  Trang chủ
                </a>
              </div>
              <div className="nav_item_link nav_item_link--hover--introduce">
                <div className="navigation_item">
                  Giới thiệu
                  <ArrowDropDownIcon />
                </div>
                <div className="nav_hover_introduce_overview">
                  <div className="nav_hove_dropdown--item">
                    <Link
                      className="nav_hove_dropdown--item--label"
                      to="/overview"
                    >
                      Thông tin chung
                    </Link>
                    <div className="nav_hove_dropdown--item--underline" />
                  </div>
                  <div className="nav_hove_dropdown--item">
                    <Link
                      className="nav_hove_dropdown--item--label"
                      to="/overview/youthunion"
                    >
                      Thông tin Đoàn - Hội Trường
                    </Link>
                    <div className="nav_hove_dropdown--item--underline" />
                  </div>
                  <div className="nav_hove_dropdown--item">
                    <Link
                      className="nav_hove_dropdown--item--label"
                      to="/overview/baseinfo"
                    >
                      Thông tin cơ sở Đoàn - Hội
                    </Link>
                    <div className="nav_hove_dropdown--item--underline" />
                  </div>
                  <div className="nav_hove_dropdown--item">
                    <Link
                      className="nav_hove_dropdown--item--label"
                      to="/overview/clubinfo"
                    >
                      Thông tin cơ sở CLB - Đội - Nhóm
                    </Link>
                  </div>
                </div>
              </div>
              <div className="nav_item_link hover_news">
                <div className="navigation_item ">
                  Bảng tin
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
                          Thông tin chung
                        </a>
                        <div className="nav_hove_dropdown--item--underline" />
                      </div>
                      <div className="nav_hove_dropdown--item">
                        <a
                          className="nav_hove_dropdown--item--label"
                          href="/general/tin-noi-bat"
                        >
                          Tin nổi bật
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
                          Thông tin - Thông báo
                        </a>
                        <div className="nav_hove_dropdown--item--underline" />
                      </div>
                      <div className="nav_hove_dropdown--item">
                        <a
                          className="nav_hove_dropdown--item--label"
                          href="/general/chuong-trinh-hoat-dong"
                        >
                          Chương trình hoạt động
                        </a>
                        <div className="nav_hove_dropdown--item--underline" />
                      </div>
                      <div className="nav_hove_dropdown--item">
                        <a
                          className="nav_hove_dropdown--item--label"
                          href="/general/hoc-tap-nghien-cuu"
                        >
                          Học tập và nghiên cứu
                        </a>
                        <div className="nav_hove_dropdown--item--underline" />
                      </div>
                      <div className="nav_hove_dropdown--item">
                        <a
                          className="nav_hove_dropdown--item--label"
                          href="/general/thong-tin-chung"
                        >
                          Thông báo chung
                        </a>
                      </div>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="nav_item_link hover_news">
                <div className="navigation_item">
                  Chương trình
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
                          Rèn luyện Đạo đức
                        </a>
                        <div className="nav_hove_dropdown--item--underline" />
                      </div>
                      <div className="nav_hove_dropdown--item">
                        <a
                          className="nav_hove_dropdown--item--label"
                          href="/general-activity/hoc-tap"
                        >
                          Rèn luyện học tập - Nghiên cứu khoa học
                        </a>
                        <div className="nav_hove_dropdown--item--underline" />
                      </div>
                      <div className="nav_hove_dropdown--item">
                        <a
                          className="nav_hove_dropdown--item--label"
                          href="/general-activity/the-luc"
                        >
                          Rèn luyện thể chất
                        </a>
                        <div className="nav_hove_dropdown--item--underline" />
                      </div>
                      <div className="nav_hove_dropdown--item">
                        <a
                          className="nav_hove_dropdown--item--label"
                          href="/general-activity/tinh-nguyen"
                        >
                          Hoạt đồng tình nguyện vì cộng đồng
                        </a>
                        <div className="nav_hove_dropdown--item--underline" />
                      </div>
                      <div className="nav_hove_dropdown--item">
                        <a
                          className="nav_hove_dropdown--item--label"
                          href="/general-activity/hoi-nhap"
                        >
                          Hoạt động Hội nhập
                        </a>
                        <div className="nav_hove_dropdown--item--underline" />
                      </div>
                      <div className="nav_hove_dropdown--item">
                        <a
                          className="nav_hove_dropdown--item--label"
                          href="/general-activity/khac"
                        >
                          Các hoạt động khác
                        </a>
                      </div>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="nav_item_link">
                <div className="navigation_item">
                  Sinh viên 5 tốt
                  <ArrowDropDownIcon />
                </div>
              </div>

              <div className="nav_item_link">
                <div className="navigation_item">
                  Thi đua khen thưởng
                  <ArrowDropDownIcon />
                </div>
              </div>

              <div className="nav_item_link">
                <div className="navigation_item">
                  Liên hệ
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
