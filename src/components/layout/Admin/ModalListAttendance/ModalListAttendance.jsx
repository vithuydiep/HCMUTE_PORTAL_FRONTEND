import Icon from '@material-ui/icons/Apps'
import CancelIcon from '@mui/icons-material/Cancel'
import CheckIcon from '@mui/icons-material/Check'
import GppBadIcon from '@mui/icons-material/GppBad'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Modal from '@mui/material/Modal'
import userApi from 'api/UserApi'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import ApiActivity from '../../../../api/ActivityApi'
import './ModalListAttendance.css'

const customStyles = {
  headRow: {
    style: {
      border: 'none',
    },
  },
  headCells: {
    style: {
      color: '#202124',
      fontSize: '16px',
      fontWeight: 500,
    },
  },
  rows: {
    highlightOnHoverStyle: {
      backgroundColor: 'rgba(21, 151, 229, 0.2)',
      borderBottomColor: '#FFFFFF',
      borderRadius: '25px',
      outline: '1px solid #FFFFFF',
    },
    style: {
      fontSize: '14px',
    },
  },
  pagination: {
    style: {
      border: 'none',
    },
  },
}

function ModalListAttendance({ open, handleClose, slug }) {
  const [listUser, setListUser] = useState([])
  const [test, setTest] = useState(true)

  useEffect(() => {
    const callAPI = async (id) => {
      const response = await ApiActivity.getListAttendance(id)
      if (response?.status === 200) {
        setListUser(response?.data)
      }
    }
    callAPI(slug)
  }, [slug, test])

  const handleCheckAttendance = (idUser, checking) => {
    const callAPISetCheck = async (data) => {
      const response = await userApi.setCheckAttendance(data)
      if (response?.status === 200) {
        setTest(!test)
      }
    }
    callAPISetCheck({ idUser, checking, idActivity: listUser._id })
  }

  const columns = [
    {
      cell: () => <Icon style={{ fill: 'rgba(21, 151, 229, 0.5)' }} />,
      width: '56px', // custom width for icon button
      style: {
        borderBottom: '1px solid #FFFFFF',
        marginBottom: '-1px',
      },
    },
    {
      name: 'Họ và tên',
      selector: (row) => row.idUserRegister.displayName,
      sortable: true,
      style: {
        padding: '0px 10px',
      },
      center: true,
    },
    {
      name: 'Email Sinh viên',
      selector: (row) => row.idUserRegister.email,
      sortable: true,
      center: true,
    },
    {
      name: 'Trạng thái',
      cell: (row) => {
        const index = row.idUserRegister.listActivity.findIndex(
          (item) => item.id_Activity === listUser?._id
        )
        if (index !== -1) {
          const { checking } = row.idUserRegister.listActivity[index]
          return checking === 'true' ? (
            <IconButton
              aria-label="edit"
              color="primary"
              onClick={() => {
                handleCheckAttendance(row.idUserRegister.id, checking)
              }}
            >
              <CheckIcon />
            </IconButton>
          ) : (
            <IconButton
              aria-label="edit"
              color="warning"
              onClick={() => {
                handleCheckAttendance(row.idUserRegister.id, checking)
              }}
            >
              <GppBadIcon />
            </IconButton>
          )
        }
        return ''
      },
      sortable: true,
      center: true,
      button: true,
    },
  ]

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal_list_attendance">
        <IconButton
          className="modal_container_base_close_btn"
          onClick={handleClose}
        >
          <CancelIcon fontSize="medium" />
        </IconButton>
        <DataTable
          title="Danh sách sinh viên"
          columns={columns}
          data={listUser?.participatingList}
          pagination
          customStyles={customStyles}
          highlightOnHover
          pointerOnHover
          // progressPending={pending}
        />
      </Box>
    </Modal>
  )
}

ModalListAttendance.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  slug: PropTypes.string.isRequired,
}

export default ModalListAttendance
