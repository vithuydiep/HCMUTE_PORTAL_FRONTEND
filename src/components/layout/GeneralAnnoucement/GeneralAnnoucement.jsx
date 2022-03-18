import React, { useEffect } from 'react'
import './GeneralAnnoucement.css'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import Pagination from '@mui/material/Pagination'
import { useMediaQuery } from '@mui/material'
import { fetchListNews, fetchtotalNews } from 'store/reducers/NewsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import NotFound from '../NotFound/NotFound'

import { HotNewsItem } from '../HotNewsItem'

function GeneralAnnoucement() {
  const listNews = useSelector((state) => state.news.newsList)
  const totalNews = useSelector((state) => state.news.totalNews)
  const search = useSelector((state) => state.news.search)
  const totalPage = Math.ceil(totalNews / 5)
  const matches = useMediaQuery('(max-width:739px)')
  const dispatch = useDispatch()
  const { slug } = useParams()

  useEffect(() => {
    dispatch(
      fetchListNews({
        page: 1,
        limit: 5,
        slug,
        search,
      })
    )
    dispatch(fetchtotalNews({ slug, search }))
  }, [search])

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  })

  const onHandleChangePage = (event, value) => {
    dispatch(
      fetchListNews({
        page: value,
        limit: 5,
        slug,
        search,
      })
    )
  }
  if (totalNews === 0) {
    return <NotFound />
  }
  return (
    <div className="generalAnnoucement">
      <div className="grid wide">
        <div className="generalAnnouncement_slider">
          <div className="generalAnnouncement_slider-text">
            &quot; Chuyển đổi số - Digital Transformation in HCMUTE &quot;
          </div>
        </div>
        <div className="generalAnnouncement_content">
          <div className="row">
            <div className="col l-9 m-8 c-12">
              <div className="generalAnnouncement_content-title">Bảng tin</div>
              {listNews.map((item) => {
                const contentList = JSON.parse(item.content).blocks
                let stringContent = ''
                for (let i = 0; i < contentList.length; i += 1) {
                  stringContent = stringContent.concat(contentList[i].text)
                }
                return (
                  <>
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
                          to={`/news/${item.slug}`}
                          className="generalAnnouncement_content_item_pic_content--title"
                        >
                          {item.title}
                        </Link>
                        <div className="generalAnnouncement_content_item_pic_content--des">
                          {stringContent}
                        </div>
                        <div className="generalAnnouncement_content_item_pic_content--date">
                          <CalendarTodayIcon color="info" />
                          {new Date(item.createdDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </>
                )
              })}

              <Pagination
                size={matches ? 'small' : 'medium'}
                count={totalPage}
                className="generalAnnouncement_pagination"
                color="primary"
                variant="outlined"
                onChange={onHandleChangePage}
              />
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

export default GeneralAnnoucement
