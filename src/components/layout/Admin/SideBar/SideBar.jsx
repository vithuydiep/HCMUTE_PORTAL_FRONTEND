import React, { useEffect } from 'react'
import { FaGem, FaHeart, FaTachometerAlt } from 'react-icons/fa'
import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SubMenu,
} from 'react-pro-sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchTotalRequestNews } from 'store/reducers/NewsSlice'
import { fetchTotalRequestActivity } from 'store/reducers/ActivityReducer'
import logoAdmin from '../../../../assets/logo_admin.png'

const Aside = ({ collapsed, rtl, toggled, handleToggleSidebar }) => {
  const totalRequestNew = useSelector((state) => state.news.totalRequest)
  const totalRequestActivity = useSelector(
    (state) => state.activities.totalRequest
  )
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchTotalRequestNews())
    dispatch(fetchTotalRequestActivity())
  }, [])

  return (
    <ProSidebar
      rtl={rtl}
      collapsed={collapsed}
      toggled={toggled}
      breakPoint="md"
      onToggle={handleToggleSidebar}
    >
      <SidebarHeader>
        <div
          style={{
            padding: '20px',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            fontSize: 20,
            letterSpacing: '1px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            textAlign: 'center',
          }}
        >
          Y-HCMUTE ADMIN
        </div>
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape="circle">
          <SubMenu
            // suffix={<span className="badge yellow">3</span>}
            title="Quản lý người dùng"
            icon={<FaTachometerAlt />}
          >
            <MenuItem>
              Danh sách sinh viên
              <Link to="/dashboard/users-student" />
            </MenuItem>
            <MenuItem>
              Danh sách cơ sở
              <Link to="/dashboard/users-unionbase" />
            </MenuItem>
            <MenuItem>
              Thêm người dùng mới
              <Link to="/dashboard/create-user" />
            </MenuItem>
          </SubMenu>
          <SubMenu title="Quản lý slider" icon={<FaTachometerAlt />}>
            <MenuItem>
              Danh sách slider
              <Link to="/dashboard/sliders" />
            </MenuItem>
            <MenuItem>
              Thêm mới slider
              <Link to="/dashboard/add-slider" />
            </MenuItem>
          </SubMenu>
          <SubMenu
            suffix={
              totalRequestNew === 0 ? (
                ''
              ) : (
                <span className="badge yellow">{totalRequestNew}</span>
              )
            }
            title="Quản lý bài viết"
            icon={<FaGem />}
          >
            <MenuItem>
              Danh sách bài viết
              <Link to="/dashboard/news" />
            </MenuItem>
            <MenuItem
              suffix={
                totalRequestNew === 0 ? (
                  ''
                ) : (
                  <span className="badge yellow">{totalRequestNew}</span>
                )
              }
            >
              Yêu cầu bài viết
              <Link to="/dashboard/request-news" />
            </MenuItem>
            <MenuItem>
              Thêm bài viết mới
              <Link to="/dashboard/create-news" />
            </MenuItem>
          </SubMenu>
          <SubMenu
            suffix={
              totalRequestActivity === 0 ? (
                ''
              ) : (
                <span className="badge yellow">{totalRequestActivity}</span>
              )
            }
            // prefix={<span className="badge gray">3</span>}
            title="Quản lý hoạt đông"
            icon={<FaHeart />}
          >
            <MenuItem>
              Danh sách hoạt động
              <Link to="/dashboard/activity" />
            </MenuItem>
            <MenuItem
              suffix={
                totalRequestActivity === 0 ? (
                  ''
                ) : (
                  <span className="badge yellow">{totalRequestActivity}</span>
                )
              }
            >
              Yêu cầu tạo hoạt động
              <Link to="/dashboard/request-activity" />
            </MenuItem>
            <MenuItem>
              Thêm hoạt động mới
              <Link to="/dashboard/create-activity" />
            </MenuItem>
          </SubMenu>
          {/* <SubMenu
            title={intl.formatMessage({ id: 'multiLevel' })}
            icon={<FaList />}
          >
            <MenuItem>{intl.formatMessage({ id: 'submenu' })} 1 </MenuItem>
            <MenuItem>{intl.formatMessage({ id: 'submenu' })} 2 </MenuItem>
            <SubMenu title={`${intl.formatMessage({ id: 'submenu' })} 3`}>
              <MenuItem>{intl.formatMessage({ id: 'submenu' })} 3.1 </MenuItem>
              <MenuItem>{intl.formatMessage({ id: 'submenu' })} 3.2 </MenuItem>
              <SubMenu title={`${intl.formatMessage({ id: 'submenu' })} 3.3`}>
                <MenuItem>
                  {intl.formatMessage({ id: 'submenu' })} 3.3.1{' '}
                </MenuItem>
                <MenuItem>
                  {intl.formatMessage({ id: 'submenu' })} 3.3.2{' '}
                </MenuItem>
                <MenuItem>
                  {intl.formatMessage({ id: 'submenu' })} 3.3.3{' '}
                </MenuItem>
              </SubMenu>
            </SubMenu>
          </SubMenu> */}
        </Menu>
      </SidebarContent>

      <SidebarFooter style={{ textAlign: 'center' }}>
        <div
          className="sidebar-btn-wrapper"
          style={{
            padding: '20px 24px',
          }}
        >
          <a
            href="/"
            target="_blank"
            className="sidebar-btn"
            rel="noopener noreferrer"
          >
            <span
              style={{
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            />
            <img src={logoAdmin} alt="Logo admin" style={{ width: '100%' }} />
          </a>
        </div>
      </SidebarFooter>
    </ProSidebar>
  )
}

export default Aside
