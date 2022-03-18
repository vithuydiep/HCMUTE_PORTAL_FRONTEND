import React, { useState } from 'react'
import './ClubInfo.css'
import InfoIcon from '@mui/icons-material/Info'
import Button from '@mui/material/Button'
import { listUnionClubInfo } from '../../../utils/constant'
import { ModalDetailBaseInfo } from '../ModalDetailBaseInfo'

function ClubInfo() {
  const [open, setOpen] = useState(false)
  const [listCadres, setlistCadres] = useState([])
  const handleOpen = (listcadres) => {
    setOpen(true)
    setlistCadres(listcadres)
  }
  const handleClose = () => setOpen(false)

  return (
    <div className="clubinfo">
      <ModalDetailBaseInfo
        open={open}
        handleClose={handleClose}
        listCadres={listCadres}
        title="BAN CHỦ NHIỆM"
      />
      <div className="grid wide">
        <div className="clubinfo_title">
          <div className="clubinfo_title--text">
            GIỚI THIỆU
            <br />
            CƠ SỞ ĐOÀN THANH NIÊN - HỘI SINH VIÊN TRỰC THUỘC
          </div>
        </div>
        <div className="clubinfo_container">
          {listUnionClubInfo.map((item) => {
            return (
              <div className="clubinfo_container--item" key={item.name}>
                <div className="clubinfo_container--item-picture">
                  <img
                    src={item.logo}
                    alt=""
                    className="clubinfo_container--item-picture-space"
                  />
                </div>
                <div className="clubinfo_container--item-content">
                  <div className="clubinfo_container--item-content-name">
                    {item.name}
                  </div>
                  <div className="clubinfo_container--item-content-des">
                    Trang thông tin chính thức : &nbsp;
                    <a
                      href={item.link}
                      style={{
                        textDecoration: 'none',
                        fontSize: '15px',
                      }}
                    >
                      Link
                    </a>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    handleOpen(item.cadreses)
                  }}
                >
                  <InfoIcon fontSize="large" color="info" />
                </Button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ClubInfo
