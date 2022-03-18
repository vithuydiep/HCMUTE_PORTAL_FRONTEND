/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { NotFound } from '..'
import {
  fetchActivity,
  fetchRegisterActivityForStudent,
} from '../../../store/reducers/ActivityReducer'
import { HotNewsItem } from '../HotNewsItem'
import './ActivityDetail.css'

function ActivityDetail() {
  const Activity = useSelector((state) => state.activities.Activity)
  const roleUser = JSON.parse(localStorage.getItem('authLogin'))?.user?.role
  const dispatch = useDispatch()
  const { slug } = useParams()

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(fetchActivity(slug))
  }, [])
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

  if (Activity === null) {
    return <NotFound />
  }
  if (Object.keys(Activity).length !== 0) {
    return (
      <div className="Activities">
        <div className="grid wide">
          <div className="news_slider">
            <div className="news_slider-text">
              &quot; Chuyển đổi số - Digital Transformation in HCMUTE &quot;
            </div>
          </div>
          <div className="Activity_content">
            <div className="row">
              <div className="col l-9 m-8">
                <div className="Activity_content-title">
                  {Activity.nameActivity}
                </div>
                <div className="Activity_content-date">
                  {new Date(Activity.startDate).toLocaleDateString()} đến{' '}
                  {new Date(Activity.endDate).toLocaleDateString()}
                </div>
                <div className="Activity_content_container">
                  {Activity.description}
                </div>
                <div className="activity_image_space">
                  <img
                    className="activity_image_show"
                    src={Activity.thumbnail}
                  />
                </div>
                <div className="Activity_content_container">
                  - <b>Địa điểm:</b> {Activity.place}
                </div>
                <div className="Activity_content_container">
                  - <b>Quyền lợi:</b> {Activity.benefit}
                </div>
                <div className="Activity_content_container">
                  - <b>Bài viết Fanpage:</b> {Activity.social}
                </div>
                <div className="Activity_button_space">
                  {roleUser === 'user:unionBase' || roleUser === 'admin' ? (
                    <div
                      className="activity-btn-register"
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
                      className="activity-btn-register"
                      onClick={() => {
                        onHandleRegisterActivity(Activity._id)
                      }}
                    >
                      Đăng ký
                    </div>
                  )}
                </div>
                <div className="Activity_author">{Activity.userCreate}</div>
              </div>
              <div className="col l-3 m-4 c-0">
                <HotNewsItem />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return null
}

export default ActivityDetail
