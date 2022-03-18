import Icon from '@material-ui/icons/Apps'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRequestNewsByUser } from 'store/reducers/NewsSlice'
import './ManageRequestNews.css'
import { useHistory } from 'react-router-dom'
import { IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import NotFound from '../NotFound/NotFound'

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
      backgroundColor: 'transparent',
    },
  },
}
const columnsGetAll = [
  {
    cell: () => <Icon style={{ fill: 'rgba(21, 151, 229, 0.5)' }} />,
    width: '50px', // custom width for icon button
    style: {
      borderBottom: '1px solid #FFFFFF',
      marginBottom: '-1px',
    },
  },
  {
    name: 'Tiêu đề',
    selector: (row) => row.title,
    sortable: true,
    grow: 2,
    style: {
      color: '#202124',
      fontSize: '14px',
      fontWeight: 500,
    },
  },
  {
    name: 'Ngày tạo',
    selector: (row) => new Date(row.createdDate).toLocaleDateString(),
    sortable: true,
    center: true,
  },
  {
    name: 'Thể loại',
    selector: (row) => row.tag,
    sortable: true,
    center: true,
  },
  {
    name: 'Trạng thái',
    selector: (row) =>
      row.status ? (
        <CheckCircleIcon color="primary" />
      ) : (
        <HourglassBottomIcon color="warning" />
      ),
    sortable: true,
    center: true,
  },
  {
    cell: (row) => (
      <>
        {row.status === false ? (
          <IconButton
            aria-label="edit"
            color="primary"
            href={`/edit-request/${row.slug}`}
          >
            <EditIcon />
          </IconButton>
        ) : (
          ''
        )}
      </>
    ),
    button: true,
    width: '50px',
  },
]

function ManageRequestNews() {
  const data = useSelector((state) => state.news.newsByUser)
  const dispatch = useDispatch()
  const [pending, setPending] = useState(true)
  const history = useHistory()

  const onRowClicked = (row, event) => {
    history.push(`/news/${row.slug}`)
  }

  useEffect(() => {
    dispatch(fetchRequestNewsByUser())
    const timeout = setTimeout(() => {
      setPending(false)
    }, 2000)
    return () => clearTimeout(timeout)
  }, [])

  if (
    localStorage.getItem('authLogin') &&
    JSON.parse(localStorage.getItem('authLogin')).user.role === 'user:unionBase'
  )
    return (
      <div className="request_news">
        <div className="grid wide">
          <div className="request_news_title">Danh sách bài viết của bạn</div>
          <DataTable
            columns={columnsGetAll}
            data={data}
            pagination
            customStyles={customStyles}
            highlightOnHover
            pointerOnHover
            onRowClicked={onRowClicked}
            progressPending={pending}
          />
        </div>
      </div>
    )
  return <NotFound />
}

export default ManageRequestNews
