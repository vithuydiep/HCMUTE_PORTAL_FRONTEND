import {EditUsers}  from 'components/layout/Admin/EditUsers'
import SideBar from 'components/layout/Admin/SideBar/SideBar'
import React, { useState } from 'react'
import '../styles/App.scss'

function EditUsersAdminPage() {
  const [toggled, setToggled] = useState(false)

  const handleToggleSidebar = (value) => {
    setToggled(value)
  }

  return (
    <div className={`app ${toggled ? 'toggled' : ''}`}>
      <SideBar toggled={toggled} handleToggleSidebar={handleToggleSidebar} />
      <EditUsers handleToggleSidebar={handleToggleSidebar} />
    </div>
  )
}

export default EditUsersAdminPage
