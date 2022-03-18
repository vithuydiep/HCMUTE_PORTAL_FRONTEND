/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import './ActivityItem.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { fetchRegisterActivityForStudent } from '../../../store/reducers/ActivityReducer'

function Activity(ActivityItem) {
  const roleUser = JSON.parse(localStorage.getItem('authLogin'))?.user?.role
  const dispatch = useDispatch()
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
    <div className="col l-6 m-12 c-12">
      <div className="activity_content">
        <div className="activity_content--picture">
          <img
            className="activity_content--pic"
            src={ActivityItem.ActivityItem.thumbnail}
            alt="anh ne"
          />
        </div>
        <div className="activity_content--text">
          <div className="activity_content--header">
            <div className="activity_content--headertext">
              {ActivityItem.ActivityItem.nameActivity}
            </div>
            <Link
              to={`/activity/${ActivityItem.ActivityItem.slug}`}
              className="activityitem_btn-deteil"
            >
              Chi tiết
            </Link>
            {roleUser === 'user:unionBase' || roleUser === 'admin' ? (
              <div
                className="activityitem_btn-register"
                onClick={() => {
                  toast.error('Chức năng này không thuộc phân quyền của User')
                }}
              >
                Đăng ký
              </div>
            ) : (
              <div
                className="activityitem_btn-register"
                onClick={() => {
                  onHandleRegisterActivity(ActivityItem.ActivityItem._id)
                }}
              >
                Đăng ký
              </div>
            )}
          </div>
          <div className="activity_content--text--underline" />
          <div className="activity_content--text--des">
            <b>Thời gian: </b>{' '}
            {new Date(ActivityItem.ActivityItem.startDate).toLocaleDateString()}{' '}
            đến{' '}
            {new Date(ActivityItem.ActivityItem.endDate).toLocaleDateString()}
          </div>
          <div className="activity_content--text--des">
            <b>Địa điểm:</b> {ActivityItem.ActivityItem.place}
          </div>
          <div className="activity_content--text--des">
            <b>Quyền lợi:</b> {ActivityItem.ActivityItem.benefit}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Activity
