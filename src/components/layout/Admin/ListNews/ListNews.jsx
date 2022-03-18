import Icon from '@material-ui/icons/Apps'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import IconButton from '@mui/material/IconButton'
import { useConfirm } from 'material-ui-confirm'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDeleteNews, fetchNewsForAdmin } from 'store/reducers/NewsSlice'
import './ListNews.css'
import PropTypes from 'prop-types'
import VerifiedIcon from '@mui/icons-material/Verified'
import { useHistory } from 'react-router-dom'

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

function ListNews({ type }) {
  const data = useSelector((state) => state.news.newsAdmin)
  const dispatch = useDispatch()
  const [pending, setPending] = useState(true)
  const history = useHistory()

  // const ExpandedComponent = ({ data }) => (
  //   <pre>{JSON.stringify(data, null, 2)}</pre>
  // )
  const confirm = useConfirm()
  const onHandleDeleteNews = (id, title) => {
    confirm({
      description: `Bạn muốn xóa bài viết ${title}?`,
      title: 'Xác nhận bài viết',
    })
      .then(() => {
        dispatch(fetchDeleteNews(id))
      })
      .catch(() => console.log('Deletion cancelled.'))
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
      cell: (row) => (
        <>
          {type === 'get-all' && (
            <>
              <IconButton
                aria-label="edit"
                color="primary"
                href={`news/${row.slug}`}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="delete"
                className="list_news_admin_btn_delete"
                onClick={() => {
                  onHandleDeleteNews(row._id, row.title)
                }}
              >
                <DeleteIcon />
              </IconButton>
            </>
          )}
          {type === 'get-request' && (
            <>
              <IconButton aria-label="edit" color="primary">
                <EditIcon />
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
      name: 'Tên người gửi',
      selector: (row) => row.name,
      sortable: true,
      center: true,
    },
    {
      cell: (row) => (
        <>
          <IconButton
            aria-label="edit"
            color="primary"
            href={`request-news/${row.slug}`}
          >
            <VerifiedIcon />
          </IconButton>
        </>
      ),
      button: true,
    },
  ]

  const onRowClicked = (row) => {
    history.push(`/news/${row.slug}`)
  }

  useEffect(() => {
    if (type === 'get-request') {
      dispatch(fetchNewsForAdmin({ status: false }))
    } else {
      dispatch(fetchNewsForAdmin())
    }
    // // const timeout = setTimeout(() => {
    // //   setPending(false)
    // // }, 5000)
    // return () => clearTimeout(timeout)
  }, [type])

  return (
    <div className="admin_list_news">
      <div className="grid wide">
        <div className="admin_list_container">
          <DataTable
            title={
              type === 'get-all' ? 'Danh sách bài viết' : 'Yêu cầu gửi bài viết'
            }
            columns={type === 'get-all' ? columnsGetAll : columnsGetRequest}
            data={data}
            pagination
            customStyles={customStyles}
            highlightOnHover
            pointerOnHover
            // progressPending={pending}
            onRowClicked={onRowClicked}
          />
        </div>
      </div>
    </div>
  )
}

ListNews.propTypes = {
  type: PropTypes.string.isRequired,
}

export default ListNews
