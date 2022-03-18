/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react'
import './GeneralActivity.css'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import Pagination from '@mui/material/Pagination'
import {
  fetchListActivity,
  fetchtotalActivities,
  fetchRegisterActivityForStudent,
} from 'store/reducers/ActivityReducer'
import { useMediaQuery } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
// import NotFound from '../NotFound/NotFound'

function GeneralActivity() {
  const listActivity = useSelector((state) => state.activities.ActivityList)
  const totalActivity = useSelector((state) => state.activities.totalActivity)
  const roleUser = JSON.parse(localStorage.getItem('authLogin'))?.user?.role
  const totalPage = Math.ceil(totalActivity / 10)
  const matches = useMediaQuery('(max-width:739px)')
  const dispatch = useDispatch()
  const { slug } = useParams()
  useEffect(() => {
    dispatch(
      fetchListActivity({
        page: 1,
        limit: 10,
        slug,
      })
    )
    dispatch(fetchtotalActivities(slug))
  }, [])

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  })

  const onHandleChangePage = (event, value) => {
    dispatch(
      fetchListActivity({
        page: value,
        limit: 5,
        slug,
      })
    )
  }
  const onHandleRegisterActivity = (idActivity) => {
    if (localStorage.getItem('authLogin')) {
      dispatch(
        fetchRegisterActivityForStudent({
          idUserRegister: JSON.parse(localStorage.getItem('authLogin')).user.id,
          Id_Activity: idActivity,
        })
      )
    } else {
      window.location.replace('/login')
    }
  }
  return (
    <div className="generalActivity">
      <div className="grid wide">
        <div className="generalActivity_slider">
          <div className="generalActivity_slider-text">
            &quot; Chuyển đổi số - Digital Transformation in HCMUTE &quot;
          </div>
        </div>
        <div className="generalActivity_content">
          <div className="generalActivity_content-title">
            Tổng hợp chương trình
          </div>
          <div className="row">
            {listActivity.map((item) => {
              return (
                <div className="col l-6 m-12 c-12">
                  <div
                    className="generalAnnouncement_content_item"
                    key={item._id}
                  >
                    <div className="generalAnnouncement_content_item_pic">
                      <img
                        src={
                          item.thumbnail !== ''
                            ? item.thumbnail
                            : '/assets/images/sv.jpg'
                        }
                        alt="test"
                        className="generalAnnouncement_content_item_pic-space"
                      />
                    </div>
                    <div className="generalAnnouncement_content_item_pic_content">
                      <Link
                        to={`/activity/${item.slug}`}
                        className="generalAnnouncement_content_item_pic_content--title"
                      >
                        {item.nameActivity}
                      </Link>
                      <div className="generalAnnouncement_content_item_pic_content--date">
                        <CalendarTodayIcon color="info" />
                        Thời gian:{' '}
                        {new Date(item.startDate).toLocaleDateString()} đến{' '}
                        {new Date(item.endDate).toLocaleDateString()}
                      </div>{' '}
                      <div className="generalAnnouncement_content_item_pic_content--date">
                        <CalendarTodayIcon color="info" />
                        Địa điểm: {item.place}
                      </div>
                      <div className="generalAnnouncement_content_item_pic_content--date">
                        <CalendarTodayIcon color="info" />
                        Quyền lợi: {item.benefit}
                      </div>
                      <div className="generalAnnouncement_content_item_pic_content--date">
                        <CalendarTodayIcon color="info" />
                        Bài viết Fanpage: {item.social}
                      </div>
                      <div className="generalActivity_button_space">
                        <Link
                          to={`/activity/${item.slug}`}
                          className="btn-deteil"
                        >
                          Chi tiết
                        </Link>
                        {roleUser === 'user:unionBase' ||
                        roleUser === 'admin' ? (
                          <div
                            className="btn-deteil"
                            onClick={() => {
                              toast.error(
                                'Chức năng này không thuộc phân quyền của User'
                              )
                            }}
                          >
                            Đăng ký
                          </div>
                        ) : (
                          <div
                            className="btn-deteil"
                            onClick={() => {
                              onHandleRegisterActivity(item._id)
                            }}
                          >
                            Đăng ký
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <Pagination
            size={matches ? 'small' : 'medium'}
            count={totalPage}
            className="generalAnnouncement_pagination"
            color="primary"
            variant="outlined"
            onChange={onHandleChangePage}
          />
        </div>
      </div>
    </div>
  )
}

export default GeneralActivity
