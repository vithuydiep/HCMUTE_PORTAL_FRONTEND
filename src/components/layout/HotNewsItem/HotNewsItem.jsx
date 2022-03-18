import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchHotNews } from 'store/reducers/NewsSlice'
import './HotNewsItem.css'

function HotNewsItem() {
  const listHostNews = useSelector((state) => state.news.hotNews)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchHotNews({ tag: 'tin-noi-bat' }))
  }, [])

  return (
    <div className="hot-news-container">
      <div className="hot-news-title">Bảng tin nổi bật</div>
      <div className="hot-news_hot">
        {listHostNews.map((item) => {
          const contentList = JSON.parse(item.content).blocks
          let stringContent = ''
          for (let i = 0; i < contentList.length; i += 1) {
            stringContent = stringContent.concat(contentList[i].text)
          }
          return (
            <div className="hot-news_hot_item" key={item._id}>
              <div className="hot-news_hot_item_pic">
                <img
                  src={item.thumbnail}
                  alt=""
                  className="hot-news_hot_item_pic-space"
                />
              </div>
              <a
                href={`/news/${item.slug}`}
                className="hot-news_hot_item_title"
              >
                {item.title}
              </a>
              <div className="hot-news_hot_item_content">{stringContent}</div>
            </div>
          )
        })}
      </div>
      <div className="hot-news_hot_container">
        <Link to="/general/tin-noi-bat" className="hot-news_hot_btn">
          Xem thêm
        </Link>
      </div>
    </div>
  )
}

export default HotNewsItem
