import PropTypes from 'prop-types'
import React from 'react'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { FaBars } from 'react-icons/fa'
import { NotFound } from '../../NotFound'
import './EditNews.css'
import EditNewsForUnion from '../../EditNewsForUnion/EditNewsForUnion'
import { Topbar } from '../Topbar'

function EditNews({ handleToggleSidebar }) {
  if (
    localStorage.getItem('authLogin') &&
    JSON.parse(localStorage.getItem('authLogin')).user.role === 'admin'
  )
    return (
      <main>
        <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
          <FaBars />
        </div>
        <Topbar />
        <EditNewsForUnion />
      </main>
    )
  return (
    <main>
      <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
        <FaBars />
      </div>
      <Topbar />
      <NotFound />
    </main>
  )
}

EditNews.propTypes = {
  handleToggleSidebar: PropTypes.func.isRequired,
}

export default EditNews
