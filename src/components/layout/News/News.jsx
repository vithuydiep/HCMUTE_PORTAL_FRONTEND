import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NewsItemType1 from '../NewsItemType1/NewsItemType1'
import NewsItemType2 from '../NewsItemType2/NewsItemType2'
import './News.css'
import { fetchListNews } from '../../../store/reducers/NewsSlice'

function News() {
  const listNews = useSelector((state) => state.news.newsList)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchListNews())
  }, [])

  return (
    <div className="grid wide">
      <div className="news">
        <div className="row">
          <div className="col l-4 m-6 c-12">
            <NewsItemType1
              title="TIN NỔI BẬT"
              listItem={listNews.filter((item) => item.tag === 'tin-noi-bat')}
              type="tin-noi-bat"
            />
          </div>
          <div className="col l-4 m-6 c-12">
            <NewsItemType2
              title="TIN UTE"
              listItem={listNews.filter((item) => item.tag === 'tin-ute')}
              type="tin-ute"
            />
          </div>
          <div className="col l-4 m-6 c-12">
            <NewsItemType2
              title="THÔNG TIN - THÔNG BÁO"
              listItem={listNews.filter(
                (item) => item.tag === 'thong-tin-thong-bao'
              )}
              type="thong-tin-thong-bao"
            />
          </div>
          <div className="col l-4 m-6 c-12">
            <NewsItemType2
              title="HỌC TẬP - NGHIÊN CỨU"
              listItem={listNews.filter(
                (item) => item.tag === 'hoc-tap-nghien-cuu'
              )}
              type="hoc-tap-nghien-cuu"
            />
          </div>
          <div className="col l-4 m-6 c-12">
            <NewsItemType2
              title="CHƯƠNG TRÌNH HOẠT ĐỘNG"
              listItem={listNews.filter(
                (item) => item.tag === 'chuong-trinh-hoat-dong'
              )}
              type="chuong-trinh-hoat-dong"
            />
          </div>
          <div className="col l-4 m-6 c-12">
            <NewsItemType2
              title="THÔNG TIN CHUNG"
              listItem={listNews.filter(
                (item) => item.tag === 'thong-tin-chung'
              )}
              type="thong-tin-chung"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default News
