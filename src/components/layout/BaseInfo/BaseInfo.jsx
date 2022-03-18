import React, { useState } from 'react'
import './BaseInfo.css'
import InfoIcon from '@mui/icons-material/Info'
import Button from '@mui/material/Button'
import { listUnionBasicInfo } from '../../../utils/constant'
import { ModalDetailBaseInfo } from '..'

function BaseInfo() {
  const [open, setOpen] = useState(false)
  const [listCadres, setlistCadres] = useState([])
  const handleOpen = (listcadres) => {
    setOpen(true)
    setlistCadres(listcadres)
  }
  const handleClose = () => setOpen(false)

  return (
    <div className="baseinfo">
      <ModalDetailBaseInfo
        open={open}
        handleClose={handleClose}
        listCadres={listCadres}
        title="THƯỜNG TRỰC ĐOÀN - HỘI PHỤ TRÁCH ĐƠN VỊ"
      />
      <div className="grid wide">
        <div className="baseinfo_title">
          <div className="baseinfo_title--text">
            THÔNG TIN CHUNG
            <br />
            CƠ SỞ ĐOÀN THANH NIÊN - HỘI SINH VIÊN TRỰC THUỘC
          </div>
        </div>
        <div className="baseinfo_container">
          {listUnionBasicInfo.map((item) => {
            return (
              <div className="baseinfo_container--item" key={item.name}>
                <div className="baseinfo_container--item-picture">
                  <img
                    src={item.logo}
                    alt=""
                    className="baseinfo_container--item-picture-space"
                  />
                </div>
                <div className="baseinfo_container--item-content">
                  <div className="baseinfo_container--item-content-name">
                    {item.name}
                  </div>
                  <div className="baseinfo_container--item-content-des">
                    Trang thông tin chính thức : &nbsp;
                    <a
                      href={item.link}
                      style={{
                        textDecoration: 'none',
                        fontSize: '15px',
                      }}
                    >
                      Truy cập
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

export default BaseInfo
