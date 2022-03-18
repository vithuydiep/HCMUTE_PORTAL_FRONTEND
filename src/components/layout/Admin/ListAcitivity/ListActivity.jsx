/* eslint-disable new-cap */
/* eslint-disable react/prop-types */
import Icon from '@material-ui/icons/Apps'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import IconButton from '@mui/material/IconButton'
import { useConfirm } from 'material-ui-confirm'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { useDispatch, useSelector } from 'react-redux'
import ListAltIcon from '@mui/icons-material/ListAlt'
import VerifiedIcon from '@mui/icons-material/Verified'
import {
  fetchActivityForAdmin,
  fetchDeleteActivity,
} from '../../../../store/reducers/ActivityReducer'
import './ListActivity.css'
import ModalListAttendance from '../ModalListAttendance/ModalListAttendance'

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

function ListActivity({ type }) {
  const [open, setOpen] = useState(false)
  const [slug, setSlug] = useState()
  const handleOpen = (id) => {
    setOpen(true)
    setSlug(id)
  }
  const handleClose = () => setOpen(false)
  const data = useSelector((state) => state.activities.ActivityListForAdmin)
  const dispatch = useDispatch()
  const [pending, setPending] = useState(true)

  // const ExpandedComponent = ({ data }) => (
  //   <pre>{JSON.stringify(data, null, 2)}</pre>
  // )
  const confirm = useConfirm()
  const onHandleDeleteActivity = (id) => {
    confirm({
      description: `Bạn muốn xóa chương trình này ${id}?`,
      title: 'Xác nhận chương trình',
    })
      .then(() => {
        dispatch(fetchDeleteActivity(id))
      })
      .catch(() => console.log('Deletion cancelled.'))
  }

  const columnsGetAll = [
    {
      cell: () => <Icon style={{ fill: 'rgba(21, 151, 229, 0.5)' }} />,
      width: '56px', // custom width for icon button
      style: {
        borderBottom: '1px solid #FFFFFF',
        marginBottom: '-1px',
      },
    },
    {
      name: 'Name',
      selector: (row) => row.nameActivity,
      sortable: true,
      grow: 2,
      style: {
        color: '#202124',
        fontSize: '14px',
        fontWeight: 500,
      },
    },
    {
      name: 'Start Date',
      selector: (row) => new Date(row.startDate).toLocaleDateString(),
      sortable: true,
      grow: 0.5,
      style: {
        color: '#202124',
        fontSize: '14px',
        fontWeight: 500,
      },
    },
    {
      name: 'End Date',
      selector: (row) => new Date(row.endDate).toLocaleDateString(),
      sortable: true,
      center: true,
      grow: 0.5,
      style: {
        color: '#202124',
        fontSize: '14px',
        fontWeight: 500,
      },
    },
    {
      name: 'Place',
      selector: (row) => row.place,
      sortable: true,
      center: true,
      style: {
        color: '#202124',
        fontSize: '14px',
        fontWeight: 500,
      },
    },
    {
      name: 'Thumnail',
      cell: (row) => (
        <a
          className="thumbnailTable"
          href={row.thumbnail}
          target="_blank"
          rel="noreferrer"
        >
          Ấn vào để xem
        </a>
      ),
      // selector: (row) => row.thumbnail,
      sortable: true,
      center: true,
      style: {
        color: '#202124',
        fontSize: '14px',
        fontWeight: 500,
      },
    },
    {
      name: 'User Create',
      selector: (row) => row.userCreate,
      sortable: true,
      center: true,
      style: {
        color: '#202124',
        fontSize: '14px',
        fontWeight: 500,
      },
    },
    {
      name: 'Tag',
      selector: (row) => row.tag,
      sortable: true,
      center: true,
    },
    {
      name: 'Danh sách sinh viên',
      grow: 1.5,
      cell: (row) => (
        <>
          <IconButton
            onClick={() => {
              handleOpen(row.slug)
            }}
            aria-label="edit"
            color="primary"
          >
            <ListAltIcon />
          </IconButton>
        </>
      ),
      width: '170px',
      button: true,
    },
    {
      cell: (row) => (
        <>
          {type === 'get-all' && (
            <>
              <IconButton
                href={`activity/editActivity/${row.slug}`}
                aria-label="edit"
                color="primary"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="delete"
                className="list_news_admin_btn_delete"
                onClick={() => {
                  onHandleDeleteActivity(row._id)
                }}
              >
                <DeleteIcon />
              </IconButton>
            </>
          )}
        </>
      ),
      button: true,
    },
  ]

  const columnsGetRequest = [
    {
      cell: () => <Icon style={{ fill: 'rgba(21, 151, 229, 0.5)' }} />,
      width: '56px', // custom width for icon button
      style: {
        borderBottom: '1px solid #FFFFFF',
        marginBottom: '-1px',
      },
    },
    {
      name: 'Name',
      selector: (row) => row.nameActivity,
      sortable: true,
      grow: 2,
      style: {
        color: '#202124',
        fontSize: '14px',
        fontWeight: 500,
      },
    },
    {
      name: 'Start Date',
      selector: (row) => new Date(row.startDate).toLocaleDateString(),
      sortable: true,
      grow: 0.5,
      style: {
        color: '#202124',
        fontSize: '14px',
        fontWeight: 500,
      },
    },
    {
      name: 'End Date',
      selector: (row) => new Date(row.endDate).toLocaleDateString(),
      sortable: true,
      center: true,
      grow: 0.5,
      style: {
        color: '#202124',
        fontSize: '14px',
        fontWeight: 500,
      },
    },
    {
      name: 'Place',
      selector: (row) => row.place,
      sortable: true,
      center: true,
      style: {
        color: '#202124',
        fontSize: '14px',
        fontWeight: 500,
      },
    },
    {
      name: 'Thumnail',
      cell: (row) => (
        <a
          className="thumbnailTable"
          href={row.thumbnail}
          target="_blank"
          rel="noreferrer"
        >
          Ấn vào để xem
        </a>
      ),
      grow: 1.5,
      // selector: (row) => row.thumbnail,
      sortable: true,
      center: true,
      style: {
        color: '#202124',
        fontSize: '14px',
        fontWeight: 500,
      },
    },
    {
      name: 'User Create',
      selector: (row) => row.userCreate,
      sortable: true,
      center: true,
      style: {
        color: '#202124',
        fontSize: '14px',
        fontWeight: 500,
      },
    },
    {
      name: 'Tag',
      selector: (row) => row.tag,
      sortable: true,
      center: true,
      style: {
        color: '#202124',
        fontSize: '14px',
        fontWeight: 500,
      },
    },
    {
      cell: (row) => (
        <>
          <IconButton
            aria-label="edit"
            color="primary"
            href={`/dashboard/activity/request-activity/${row.slug}`}
          >
            <VerifiedIcon />
          </IconButton>
        </>
      ),
      button: true,
    },
  ]

  useEffect(() => {
    if (type === 'get-request') {
      dispatch(fetchActivityForAdmin({ status: false }))
    } else {
      dispatch(fetchActivityForAdmin({ status: true }))
    }
    const timeout = setTimeout(() => {
      setPending(false)
    }, 2000)
    return () => clearTimeout(timeout)
  }, [type])

  return (
    <div className="admin_list_news">
      <ModalListAttendance open={open} handleClose={handleClose} slug={slug} />
      <div className="grid wide">
        <div className="admin_list_container">
          <DataTable
            title={
              type === 'get-all'
                ? 'Danh sách chương trình'
                : 'Yêu cầu phê duyệt chương trình'
            }
            columns={type === 'get-all' ? columnsGetAll : columnsGetRequest}
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

export default ListActivity
