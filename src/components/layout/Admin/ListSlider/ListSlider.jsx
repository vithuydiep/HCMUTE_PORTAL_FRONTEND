import React, { useEffect, useState } from 'react'
import Icon from '@material-ui/icons/Apps'
import './ListSlider.css'
import DataTable from 'react-data-table-component'
import { useDispatch, useSelector } from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import IconButton from '@mui/material/IconButton'
import {
  fetchSliderList,
  fetchDeleteSlider,
} from 'store/reducers/SliderReducer'
import { useConfirm } from 'material-ui-confirm'
import EditSlider from '../EditSlider/EditSlider'

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

function ListSlider() {
  const data = useSelector((state) => state.slider.listSlider)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [slug, setSlug] = useState()
  const confirm = useConfirm()
  const onHandleEditSlider = (id) => {
    setOpen(true)
    setSlug(id)
  }
  const handleClose = () => setOpen(false)

  const onHandleDeleteNews = (id, title) => {
    confirm({
      description: `Bạn muốn xóa bài viết ${title}?`,
      title: 'Xác nhận bài viết',
    }).then(() => {
      dispatch(fetchDeleteSlider(id))
    })
  }

  const column = [
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
      style: {
        color: '#202124',
        fontSize: '14px',
        fontWeight: 500,
      },
    },
    {
      name: 'Hình ảnh',
      selector: (row) => (
        <a href={row.img} target="_blank" rel="noreferrer">
          Ấn vào để xem ảnh
        </a>
      ),
      sortable: true,
      center: true,
    },
    {
      name: 'Link bài viết',
      selector: (row) => (
        <a href={row.link} target="_blank" rel="noreferrer">
          {row.link}
        </a>
      ),
      sortable: true,
      center: true,
    },
    {
      cell: (row) => (
        <>
          <>
            <IconButton
              aria-label="edit"
              color="primary"
              onClick={() => {
                onHandleEditSlider(row._id)
              }}
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
        </>
      ),
      button: true,
    },
  ]

  useEffect(() => {
    dispatch(fetchSliderList())
  }, [])

  return (
    <div className="admin_list_news">
      <EditSlider open={open} handleClose={handleClose} id={slug} />
      <div className="grid wide">
        <div className="admin_list_container">
          <DataTable
            title="Danh sách slider"
            columns={column}
            data={data}
            pagination
            customStyles={customStyles}
            highlightOnHover
            pointerOnHover
          />
        </div>
      </div>
    </div>
  )
}

export default ListSlider
