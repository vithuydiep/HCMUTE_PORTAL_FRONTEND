import { convertFromRaw, EditorState } from 'draft-js'
import React, { useEffect } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { NotFound } from '..'
import { fetchItem } from '../../../store/reducers/NewsSlice'
import { HotNewsItem } from '../HotNewsItem'
import './NewsItems.css'

function NewsItems() {
  const news = useSelector((state) => state.news.news)
  const dispatch = useDispatch()
  const { slug } = useParams()

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(fetchItem(slug))
  }, [])

  if (news === null) {
    return <NotFound />
  }
  if (Object.keys(news).length !== 0) {
    return (
      <div className="news">
        <div className="grid wide">
          <div className="news_slider">
            <div className="news_slider-text">
              &quot; Chuyển đổi số - Digital Transformation in HCMUTE &quot;
            </div>
          </div>
          <div className="news_content">
            <div className="row">
              <div className="col l-9 m-8">
                <div className="news_content-title">{news.title}</div>
                <div className="news_content-date">
                  {new Date(news.createdDate).toLocaleString()}
                </div>
                <div className="news_content_container">
                  <Editor
                    toolbarClassName="news_content_toolbar"
                    editorClassName="news_content_editor"
                    editorState={EditorState.createWithContent(
                      convertFromRaw(JSON.parse(news.content))
                    )}
                    readOnly
                  />
                </div>
                <div className="news_author">
                  Trường Đại Học Sư Phạm Kỹ Thuật TP.HCM
                </div>
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

export default NewsItems
