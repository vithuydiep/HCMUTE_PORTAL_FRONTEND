import React from 'react'
import './NewsItemType2.css'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import newGif from '../../../assets/new.gif'

import THONGTINCHUNG from '../../../assets/THONGTIN-CHUNG.png'
import THONGTINTHONGBAO from '../../../assets/THONGTIN-THONGBAO.png'
import CHUONGTRINHHOATDONG from '../../../assets/CHUONGTRINH-HOATDONG.png'
import HOCTAPNGHIENCUU from '../../../assets/HOCTAP-NGHIENCUU.png'
import TINUTE from '../../../assets/TINUTE.png'

function NewsItemType2({ title, listItem, type }) {
  let stringContent = ''
  if (listItem.length !== 0) {
    const contentList = JSON.parse(listItem[0].content).blocks
    for (let i = 0; i < contentList.length; i += 1) {
      stringContent = stringContent.concat(contentList[i].text)
    }
  }
  let srcImage
  switch (title) {
    case 'TIN UTE':
      srcImage = TINUTE
      break
    case 'THÔNG TIN - THÔNG BÁO':
      srcImage = THONGTINTHONGBAO
      break
    case 'HỌC TẬP - NGHIÊN CỨU':
      srcImage = HOCTAPNGHIENCUU
      break
    case 'CHƯƠNG TRÌNH HOẠT ĐỘNG':
      srcImage = CHUONGTRINHHOATDONG
      break
    case 'THÔNG TIN CHUNG':
      srcImage = THONGTINCHUNG
      break
    default:
      break
  }

  return (
    <div className="news_item">
      <div className="news_item_header">{title}</div>
      <div className="news_item_content">
        <div className="news_item_background">
          <img src={srcImage} alt="Mô tả thông tin" />
          <div className="news_item_date">
            <div className="news_item_date--year">
              {new Date().getMonth() + 1}.{new Date().getFullYear()}
            </div>
            <div className="new_item_date-days">{new Date().getDate()}</div>
          </div>
        </div>
        <div className="news_item_desription">
          <Link
            to={listItem.length !== 0 && `/news/${listItem[0].slug}`}
            className="news_item_desription--title"
          >
            {listItem.length !== 0 && listItem[0].title}
          </Link>
          <div className="news_item_desription--content">{stringContent}</div>
        </div>
        <div className="underline">
          <div className="underline_normal" />
        </div>
        <div className="news_item_list_type2">
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

NewsItemType2.propTypes = {
  title: PropTypes.string.isRequired,
  listItem: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
}
export default NewsItemType2
