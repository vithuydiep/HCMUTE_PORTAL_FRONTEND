/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'
import { CreateNews, NotFound, CreateActivity } from 'components/layout'
import PropTypes from 'prop-types'
import { FaBars } from 'react-icons/fa'
import { ListNews } from '../ListNews'
import { Topbar } from '../Topbar'
import { ListActivity } from '../ListAcitivity'
import './Main.css'
import { ListUsers } from '../ListUsers'
import { ListSlider } from '../ListSlider'
import { CreateSlider } from '../CreateSlider'
import adminImage from '../../../../assets/admin.png'

const Main = ({ handleToggleSidebar, path }) => {
  const renderComponent = () => {
    switch (path) {
      case '/dashboard/news':
        return <ListNews type="get-all" />
      case '/dashboard/request-news':
        return <ListNews type="get-request" />
      case '/dashboard/create-news':
        return <CreateNews />
      case '/dashboard/create-activity':
        return <CreateActivity />
      case '/dashboard/request-activity':
        return <ListActivity type="get-request" />
      case '/dashboard/activity':
        return <ListActivity type="get-all" />
      case '/dashboard/users':
        return <ListUsers type="get-all" />
      case '/dashboard/sliders':
        return <ListSlider />
      case '/dashboard/add-slider':
        return <CreateSlider />
      case '/dashboard/users-student':
        return <ListUsers type="get-user-student" />
      case '/dashboard/users-unionbase':
        return <ListUsers type="get-user-unionbase" />
      case '/dashboard':
        return <img src={adminImage} style={{ maxHeight: '695px' }} />
      default:
        return <NotFound />
    }
  }
  return (
    <main>
      <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
        <FaBars />
      </div>
      <Topbar />
      {renderComponent()}
    </main>
  )
}

Main.propTypes = {
  handleToggleSidebar: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
}

export default Main
