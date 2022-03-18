/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { EditActivity } from 'components/layout'
import SideBar from 'components/layout/Admin/SideBar/SideBar'
import { Topbar } from 'components/layout/Admin/Topbar'
import { NotFoundPage } from 'pages'
import React, { useEffect, useState } from 'react'
import { FaBars } from 'react-icons/fa'
import { useLocation } from 'react-router-dom'
import '../styles/App.scss'

function EditActivityPage() {
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
        <main>
          <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
            <FaBars />
          </div>
          <Topbar />
          <EditActivity type="All" handleToggleSidebar={handleToggleSidebar} />
        </main>
      </div>
    )

  return <NotFoundPage />
}

export default EditActivityPage
