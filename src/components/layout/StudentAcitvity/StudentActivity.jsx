/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, TextField, useMediaQuery } from '@mui/material'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded'
import LinearProgress from '@mui/material/LinearProgress'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Pagination from '@mui/material/Pagination'

import {
  fetchActivityForUser,
  fetchTotalActivitiesForUser,
} from '../../../store/reducers/ActivityReducer'
import './StudentActivity.css'

function StudentActivity() {
  const totalActivity = useSelector(
    (state) => state.activities.totalActivityForUser
  )
  console.log(totalActivity)
  const totalPage = Math.ceil(totalActivity / 5)
  const matches = useMediaQuery('(max-width:739px)')
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      fetchActivityForUser({
        idUser: JSON.parse(localStorage.getItem('authLogin')).user.id,
        page: 1,
        limit: 4,
      })
    )
    dispatch(
      fetchTotalActivitiesForUser({
        idUser: JSON.parse(localStorage.getItem('authLogin')).user.id,
      })
    )
  }, [])
  const listActivity = useSelector(
    (state) => state.activities.ActivityListForUSer
  )
  const {
    register,
    formState: { errors },
    // reset,
    handleSubmit,
    // isValid,
  } = useForm({
    mode: 'onChange',
  })
  const treatAsUTC = (date) => {
    const result = new Date(date)
    result.setMinutes(result.getMinutes() - result.getTimezoneOffset())
    return result
  }
  const progressForActivity = (startDate, endDate) => {
    const millisecondsPerDay = 24 * 60 * 60 * 1000
    const day = new Date().toString()
    const totalDay =
      (treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay
    const currentDay =
      (treatAsUTC(day) - treatAsUTC(startDate)) / millisecondsPerDay
    const curt = (
      ((totalDay.toFixed(0) - currentDay.toFixed(0)) * 100) /
      totalDay.toFixed(0)
    ).toFixed(0)
    if (curt < 0) return 100
    return curt
  }
  const onHandleChangePage = (event, value) => {
    dispatch(
      fetchActivityForUser({
        idUser: JSON.parse(localStorage.getItem('authLogin')).user.id,
        page: value,
        limit: 4,
      })
    )
  }
  const onHanldeSubmit = () => {
    console.log('hello')
  }
  return (
    <div className="studentActivity">
      <div className="grid wide">
        <div className="studentActivity_slider">
          <div className="studentActivity_slider-text">
            &quot; Chuyển đổi số - Digital Transformation in HCMUTE &quot;
          </div>
        </div>
        <div className="studentActivity_content">
          <div className="studentActivity_content-title">
            Tổng hợp chương trình
          </div>
          <form onSubmit={handleSubmit(onHanldeSubmit)}>
            <div className="studentActivity_fillter">
              <TextField
                className="studentActivity_date-picker"
                {...register('startDate', {
                  required: 'This input is required',
                })}
                id="date-start"
                label="Ngày bắt đầu"
                type="date"
                defaultValue={new Date()}
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
                error={errors.startDate}
                helperText={errors.startDate && errors.startDate?.message}
              />
              <TextField
                className="studentActivity_date-picker"
                {...register('endDate', {
                  required: 'This input is required',
                })}
                id="date-end"
                label="Ngày kết thúc"
                type="date"
                defaultValue={new Date()}
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
                error={errors.endDate}
                helperText={errors.endDate && errors.endDate?.message}
              />
              <Button
                type="submit"
                className="studentActivity_button-fillter"
                variant="contained"
              >
                Lọc
              </Button>
            </div>
          </form>
          <div className="row">
            {listActivity.map((item) => {
              const percent =
                item !== undefined
                  ? progressForActivity(
                      item?.infoActivity.startDate,
                      item?.infoActivity.endDate
                    )
                  : 0
              return (
                <div className="col l-12 m-12 c-12">
                  {/* <div className="studentAnnouncement_content_item" key={item._id}> */}
                  <div className="studentAnnouncement_content_item">
                    <div className="studentAnnouncement_content_item_pic">
                      <img
                        src={
                          item?.infoActivity.thumbnail !== ''
                            ? item?.infoActivity.thumbnail
                            : '/assets/images/sv.jpg'
                        }
                        alt="test"
                        className="studentAnnouncement_content_item_pic-space"
                      />
                    </div>
                    <div className="studentAnnouncement_content_item_pic_content">
                      <Link
                        to={`/activity/${item.infoActivity.slug}`}
                        className="studentAnnouncement_content_item_pic_content--title"
                      >
                        {item.infoActivity.nameActivity}
                      </Link>
                      <div className="studentAnnouncement_content_item_pic_content--date">
                        <CalendarTodayIcon color="info" />
                        Thời gian:{' '}
                        {new Date(
                          item.infoActivity.startDate
                        ).toLocaleDateString()}{' '}
                        đến{' '}
                        {new Date(
                          item.infoActivity.endDate
                        ).toLocaleDateString()}
                      </div>{' '}
                      <div className="studentAnnouncement_content_item_pic_content--date">
                        <CalendarTodayIcon color="info" />
                        Địa điểm: {item.infoActivity.place}
                      </div>
                      <div className="studentAnnouncement_content_item_pic_content--date">
                        <CalendarTodayIcon color="info" />
                        Quyền lợi: {item.infoActivity.benefit}
                      </div>
                      <div className="studentAnnouncement_content_item_pic_content--date">
                        <CalendarTodayIcon color="info" />
                        Bài viết Fanpage: {item.infoActivity.social}
                      </div>
                      {percent === 100 ? (
                        <div className="studentAnnouncement_progress-space">
                          <LinearProgress
                            className="studentAnnouncement_progress"
                            variant="determinate"
                            color={
                              item.checking === 'true' ? 'success' : 'error'
                            }
                            value={percent}
                          />
                          {item.checking === 'true' ? (
                            <CheckCircleRoundedIcon color="success" />
                          ) : (
                            <ErrorRoundedIcon color="error" />
                          )}
                        </div>
                      ) : (
                        <div className="studentAnnouncement_progress-space">
                          <LinearProgress
                            className="studentAnnouncement_progress"
                            variant="determinate"
                            value={percent}
                          />
                          <div className="studentActivity_progress-text">
                            {percent}%
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <Pagination
            size={matches ? 'small' : 'medium'}
            count={totalPage}
            className="studentAnnouncement_pagination"
            color="primary"
            variant="outlined"
            onChange={onHandleChangePage}
          />
        </div>
      </div>
    </div>
  )
}

export default StudentActivity
