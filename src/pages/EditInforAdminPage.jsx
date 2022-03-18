import { EditInforAdmin } from 'components/layout/Admin/EditInforAdmin'
import SideBar from 'components/layout/Admin/SideBar/SideBar'
import React, { useState } from 'react'
import '../styles/App.scss'

function EditInforAdminPage() {
  const [toggled, setToggled] = useState(false)

  const handleToggleSidebar = (value) => {
    setToggled(value)
  }

  return (
    <div className={`app ${toggled ? 'toggled' : ''}`}>
      <SideBar toggled={toggled} handleToggleSidebar={handleToggleSidebar} />
      <EditInforAdmin handleToggleSidebar={handleToggleSidebar} />
    </div>
  )
}

export default EditInforAdminPage
