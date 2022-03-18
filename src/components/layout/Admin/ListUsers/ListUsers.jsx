/* eslint-disable no-unused-expressions */
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { useConfirm } from 'material-ui-confirm'
import IconButton from '@mui/material/IconButton'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchUsersForAdmin, fetchDeleteUsers } from 'store/reducers/UsersSlice'
import './ListUsers.css'

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

function ListUsers({ type }) {
  const data = useSelector((state) => state.users.usersAdmin)
  const dispatch = useDispatch()
  const [pending, setPending] = useState(true)

  const ExpandedComponent = ({ data }) => (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  )

  const confirm = useConfirm()
  const onHandleDeleteUsers = (id, displayName) => {
    confirm({
      description: `Bạn muốn xóa ${displayName}?`,
      title: 'Xác nhận xóa người dùng',
    })
      .then(() => {
        dispatch(fetchDeleteUsers(id))
      })
      .catch(() => console.log('Deletion cancelled.'))
  }
  const columns = [
    {
      cell: (row) => (
        <img className="userListImg" alt={row.displayName} src={row.picture} />
      ),
      width: '65px', // custom width for icon button
    },
    {
      name: 'Họ Tên',
      selector: (row) => row.fullName,
      sortable: true,
      grow: 2,
      style: {
        color: '#202124',
        fontSize: '14px',
        fontWeight: 500,
      },
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
      center: true,
    },
    {
      name: 'Quyền',
      selector: (row) => {
        if (row.role === 'user:student') return 'Sinh viên'
        return 'Cơ sở'
      },
      sortable: true,
      center: true,
    },
    {
      name: 'Số điện thoại',
      selector: (row) => row.phone,
      sortable: true,
      center: true,
    },
    {
      name: 'Địa chỉ',
      selector: (row) => row.address,
      sortable: true,
      center: true,
    },
    {
      cell: (row) => (
        <>
          <IconButton
            aria-label="edit"
            color="primary"
            href={`edit-users/${row.id}`}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            className="list_users_admin_btn_delete"
            onClick={() => {
              console.log(row)
              onHandleDeleteUsers(row.id, row.displayName)
            }}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
      button: true,
    },
  ]

  useEffect(() => {
    if (type === 'get-user-student') {
      dispatch(fetchUsersForAdmin({ role: 'user:student' }))
    } else {
      dispatch(fetchUsersForAdmin())
    }
    const timeout = setTimeout(() => {
      setPending(false)
    }, 1000)
    return () => clearTimeout(timeout)
  }, [type])

  return (
    <div className="admin_list_users">
      <div className="grid wide">
        <div className="admin_list_container">
          <DataTable
            title={
              type === 'get-user-student'
                ? 'Danh sách sinh viên'
                : 'Danh sách cơ sở'
            }
            columns={columns}
            data={data}
            pagination
            // expandableRows
            // expandableRowsComponent={ExpandedComponent}
            customStyles={customStyles}
            highlightOnHover
            pointerOnHover
            progressPending={pending}
          />
        </div>
      </div>
    </div>
  )
}

ListUsers.propTypes = {
  type: PropTypes.string.isRequired,
}
export default ListUsers
