import { ChangePasswordAdmin } from 'components/layout/Admin/ChangePasswordAdmin'
import SideBar from 'components/layout/Admin/SideBar/SideBar'
import React, { useState } from 'react'
import '../styles/App.scss'

function ChangePasswordAdminPage() {
  const [toggled, setToggled] = useState(false)

  const handleToggleSidebar = (value) => {
    setToggled(value)
  }

  return (
    <div className={`app ${toggled ? 'toggled' : ''}`}>
      <SideBar toggled={toggled} handleToggleSidebar={handleToggleSidebar} />
      <ChangePasswordAdmin handleToggleSidebar={handleToggleSidebar} />
    </div>
  )
}

export default ChangePasswordAdminPage
