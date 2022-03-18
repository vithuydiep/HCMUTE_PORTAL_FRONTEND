import { Main } from 'components/layout/Admin/Main'
import SideBar from 'components/layout/Admin/SideBar/SideBar'
import { NotFoundPage } from 'pages'
import Topbar from 'components/layout/Admin/Topbar/Topbar'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import '../styles/App.scss'

function DashboardAdmin() {
  const location = useLocation()

  const [rtl, setRtl] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [image, setImage] = useState(true)
  const [toggled, setToggled] = useState(false)
  const [path, setPath] = useState(location.pathname)

  const handleToggleSidebar = (value) => {
    setToggled(value)
  }

  useEffect(() => {
    setPath(location.pathname)
  })
  if (
    localStorage.getItem('authLogin') &&
    JSON.parse(localStorage.getItem('authLogin')).user.role === 'admin'
  )
    return (
      <div
        className={`app ${rtl ? 'rtl' : ''} ${toggled ? 'toggled' : ''}`}
        style={{
          display: 'flex',
        }}
      >
        <SideBar
          image={image}
          collapsed={collapsed}
          rtl={rtl}
          toggled={toggled}
          handleToggleSidebar={handleToggleSidebar}
        />
        <Main handleToggleSidebar={handleToggleSidebar} path={path} />
      </div>
    )
  return <NotFoundPage />
}

export default DashboardAdmin
