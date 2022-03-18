/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchListActivity } from 'store/reducers/ActivityReducer'
import './Activity.css'
import { ActivityItem } from '../ActivityItem'

function Activity() {
  const listActivity = useSelector((state) => state.activities.ActivityList)
  const dispatch = useDispatch()
  const { slug } = useParams()
  useEffect(() => {
    dispatch(
      fetchListActivity({
        page: 1,
        limit: 5,
        slug,
      })
    )
  }, [])
  return (
    <div className="activity">
      <div className="grid wide">
        <div className="activity_label">
          <div className="activity_label_text">Chương trình sắp diễn ra</div>
          <div className="activity_label_underline" />
        </div>
        <div className="content">
          <div className="row">
            {listActivity.map((item, index) => {
              if (index < 4)
                return <ActivityItem key={item._id} ActivityItem={item} />
            })}
          </div>
          <a href="/activity" className="btn-seemore-acc">
            Xem thêm
          </a>
        </div>
      </div>
    </div>
  )
}

export default Activity
