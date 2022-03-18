import { EditNews } from 'components/layout/Admin/EditNews'
import SideBar from 'components/layout/Admin/SideBar/SideBar'
import { NotFoundPage } from 'pages'
import React, { useState } from 'react'
import '../styles/App.scss'

function EditNewsAdminPage() {
  const [toggled, setToggled] = useState(false)

  const handleToggleSidebar = (value) => {
    setToggled(value)
  }
  if (
    localStorage.getItem('authLogin') &&
    JSON.parse(localStorage.getItem('authLogin')).user.role === 'admin'
  )
    return (
      <div className={`app ${toggled ? 'toggled' : ''}`}>
        <SideBar toggled={toggled} handleToggleSidebar={handleToggleSidebar} />
        <EditNews handleToggleSidebar={handleToggleSidebar} />
      </div>
    )

  return <NotFoundPage />
}

export default EditNewsAdminPage
