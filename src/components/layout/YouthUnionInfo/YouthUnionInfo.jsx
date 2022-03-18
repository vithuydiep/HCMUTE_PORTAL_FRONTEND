import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import fbicon from '../../../assets/fbicon.png'
import gmailicon from '../../../assets/gmailicon.png'
import igicon from '../../../assets/igicon.png'
import logodoan from '../../../assets/logodoan.png'
import logohoi from '../../../assets/logohoi.png'
import './YouthUnionInfo.css'
import { fetchCadresList } from '../../../store/reducers/CadresSlide'

function YouthUnionInfo() {
  const listcadres = useSelector((state) => state.listCadres.listCadres)
  const dispatch = useDispatch()
  const listcadres1 = listcadres.length !== 0 ? listcadres[0].cadreslist : []
  const listcadres2 = listcadres.length !== 0 ? listcadres[1].cadreslist : []

  useEffect(() => {
    dispatch(fetchCadresList())
  }, [])

  return (
    <div className="youth_union">
      <div className="grid wide">
        <div className="youth_union_title">
          <div className="youth_union_title--text">
            GIỚI THIỆU
            <br />
            BAN THƯỜNG VỤ ĐOÀN TRƯỜNG - BAN THƯ KÍ HỘI SINH VIÊN TRƯỜNG
          </div>
        </div>
        <div className="youth_union_title_content" />
        <div className="row">
          <div className="col l-6 m-6 c-12">
            <div className="youth_union_title_content_label">
              <img
                className="youth_union_title_content_label-icon"
                src={logodoan}
                alt="Logo Đoàn"
              />
              <div className="youth_union_title_content_label-text">
                BAN THƯỜNG VỤ ĐOÀN TRƯỜNG
              </div>
            </div>
            {listcadres1.map((item) => {
              return (
                <div className="youth_union_title_content_item" key={item._id}>
                  <div className="youth_union_title_content_item_avatar">
                    <img
                      src={item.picture}
                      alt=""
                      className="youth_union_title_content_item_avatar_space"
                    />
                  </div>
                  <div className="youth_union_title_content_item_info">
                    <div className="youth_union_title_content_item_info-name">
                      Đ/c &nbsp;
                      {item.name}
                    </div>
                    <div className="youth_union_title_content_item_info-text">
                      {item.position}
                    </div>
                    <div className="youth_union_title_content_item_info-underline" />
                    <div className="youth_union_title_content_item_info-text">
                      {item.description}
                    </div>
                    <div className="youth_union_title_content_item_info-contact">
                      <img
                        className="youth_union_title_content_item_info-contact-icon"
                        src={fbicon}
                        alt=""
                      />
                      <img
                        className="youth_union_title_content_item_info-contact-icon"
                        src={gmailicon}
                        alt=""
                      />
                      <img
                        className="youth_union_title_content_item_info-contact-icon"
                        src={igicon}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          {/* Hoi sinh vien */}
          <div className="col l-6 m-6 c-12">
            <div className="youth_union_title_content_label">
              <img
                className="youth_union_title_content_label-icon"
                src={logohoi}
                alt="Logo Hội"
              />
              <div className="youth_union_title_content_label-text">
                BAN THƯ KÝ HỘI SINH VIÊN TRƯỜNG
              </div>
            </div>
            {listcadres2.map((item) => {
              return (
                <div className="youth_union_title_content_item" key={item._id}>
                  <div className="youth_union_title_content_item_avatar">
                    <img
                      src={item.picture}
                      alt=""
                      className="youth_union_title_content_item_avatar_space"
                    />
                  </div>
                  <div className="youth_union_title_content_item_info">
                    <div className="youth_union_title_content_item_info-name">
                      Đ/c &nbsp;
                      {item.name}
                    </div>
                    <div className="youth_union_title_content_item_info-text">
                      {item.position}
                    </div>
                    <div className="youth_union_title_content_item_info-underline" />
                    <div className="youth_union_title_content_item_info-text">
                      {item.description}
                    </div>
                    <div className="youth_union_title_content_item_info-contact">
                      <img
                        className="youth_union_title_content_item_info-contact-icon"
                        src={fbicon}
                        alt=""
                      />
                      <img
                        className="youth_union_title_content_item_info-contact-icon"
                        src={gmailicon}
                        alt=""
                      />
                      <img
                        className="youth_union_title_content_item_info-contact-icon"
                        src={igicon}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default YouthUnionInfo
