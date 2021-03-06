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
            &quot; Chuy???n ?????i s??? - Digital Transformation in HCMUTE &quot;
          </div>
        </div>
        <div className="generalActivity_content">
          <div className="generalActivity_content-title">
            T???ng h???p ch????ng tr??nh
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
                        Th???i gian:{' '}
                        {new Date(item.startDate).toLocaleDateString()} ?????n{' '}
                        {new Date(item.endDate).toLocaleDateString()}
                      </div>{' '}
                      <div className="generalAnnouncement_content_item_pic_content--date">
                        <CalendarTodayIcon color="info" />
                        ?????a ??i???m: {item.place}
                      </div>
                      <div className="generalAnnouncement_content_item_pic_content--date">
                        <CalendarTodayIcon color="info" />
                        Quy???n l???i: {item.benefit}
                      </div>
                      <div className="generalAnnouncement_content_item_pic_content--date">
                        <CalendarTodayIcon color="info" />
                        B??i vi???t Fanpage: {item.social}
                      </div>
                      <div className="generalActivity_button_space">
                        <Link
                          to={`/activity/${item.slug}`}
                          className="btn-deteil"
                        >
                          Chi ti???t
                        </Link>
                        {roleUser === 'user:unionBase' ||
                        roleUser === 'admin' ? (
                          <div
                            className="btn-deteil"
                            onClick={() => {
                              toast.error(
                                'Ch???c n??ng n??y kh??ng thu???c ph??n quy???n c???a User'
                              )
                            }}
                          >
                            ????ng k??
                          </div>
                        ) : (
                          <div
                            className="btn-deteil"
                            onClick={() => {
                              onHandleRegisterActivity(item._id)
                            }}
                          >
                            ????ng k??
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
