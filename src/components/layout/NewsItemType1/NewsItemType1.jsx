import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import newGif from '../../../assets/new.gif'
import './NewsItemType1.css'
import TINNOIBAT from '../../../assets/TINNOIBAT.png'

function NewsItemType1({ title, listItem, type }) {
  return (
    <div className="news_item">
      <div className="news_item_header">{title}</div>
      <div className="news_item_content">
        <div className="news_item_background">
          <img src={TINNOIBAT} alt="Mô tả thông tin" />
        </div>
        <div className="news_item_list_type1">
          <ul className="news_item_list_link">
            {listItem.map((item) => {
              return (
                <li key={item._id} className="news_item_list_link-item">
                  <Link
                    to={`/news/${item.slug}`}
                    className="news_item_list_link--link"
                  >
                    <i className="fas fa-angle-right" />
                    &nbsp;
                    {item.title}
                  </Link>
                  <span className="date">
                    ({new Date(listItem[0].createdDate).toLocaleDateString()})
                  </span>
                  <img src={newGif} alt="News icon" />
                </li>
              )
            })}
          </ul>
        </div>
        <Link to={`/general/${type}`} className="btn-seemore">
          Xem thêm
        </Link>
      </div>
    </div>
  )
}

NewsItemType1.propTypes = {
  title: PropTypes.string.isRequired,
  listItem: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
}
export default NewsItemType1
