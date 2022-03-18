import CancelIcon from '@mui/icons-material/Cancel'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Modal from '@mui/material/Modal'
import PropTypes from 'prop-types'
import React from 'react'
import fbicon from '../../../assets/fbicon.png'
import gmailicon from '../../../assets/gmailicon.png'
import igicon from '../../../assets/igicon.png'
import logodoan from '../../../assets/logodoan.png'
import logohoi from '../../../assets/logohoi.png'
import './ModalDetailBaseInfo.css'

function ModalDetailBaseInfo({ open, handleClose, listCadres, title }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal_container_base">
        <IconButton
          className="modal_container_base_close_btn"
          onClick={handleClose}
        >
          <CancelIcon fontSize="large" />
        </IconButton>
        <div className="modal_baseinfo">
          <div className="modal_baseinfo--text">{title}</div>
        </div>
        <div className="modal_baseinfo-content">
          {listCadres.map((item) => {
            if (item.type === 'doan') {
              return (
                <div className="modal_baseinfo-content_item">
                  <div className="modal_baseinfo-content_item_avatar">
                    <img
                      src={logodoan}
                      alt=""
                      className="modal_baseinfo-content_item_avatar_space"
                    />
                  </div>

                  <div className="modal_baseinfo-content_item_info">
                    <div className="modal_baseinfo-content_item_info-name">
                      Đ/c {item.name}
                    </div>
                    <div className="modal_baseinfo-content_item_info-text">
                      {item.position}
                    </div>
                    <div className="modal_baseinfo-content_item_info-underline" />
                    <div className="modal_baseinfo-content_item_info-text">
                      {item.description}
                    </div>
                    <div className="modal_baseinfo-content_item_info-contact">
                      <img
                        className="modal_baseinfo-content_item_info-contact-icon"
                        src={fbicon}
                        alt=""
                      />
                      <a href={`mailto:${item.contact.email}`}>
                        <img
                          className="modal_baseinfo-content_item_info-contact-icon"
                          src={gmailicon}
                          alt=""
                        />
                      </a>

                      <img
                        className="modal_baseinfo-content_item_info-contact-icon"
                        src={igicon}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              )
            }
            if (item.type === 'hoi') {
              return (
                <div className="modal_baseinfo-content_item">
                  <div className="modal_baseinfo-content_item_avatar">
                    <img
                      src={logohoi}
                      alt=""
                      className="modal_baseinfo-content_item_avatar_space"
                    />
                  </div>
                  <div className="modal_baseinfo-content_item_info">
                    <div className="modal_baseinfo-content_item_info-name">
                      Đ/c {item.name}
                    </div>
                    <div className="modal_baseinfo-content_item_info-text">
                      {item.position}
                    </div>
                    <div className="modal_baseinfo-content_item_info-underline" />
                    <div className="modal_baseinfo-content_item_info-text">
                      {item.description}
                    </div>
                    <div className="modal_baseinfo-content_item_info-contact">
                      <img
                        className="modal_baseinfo-content_item_info-contact-icon"
                        src={fbicon}
                        alt=""
                      />
                      <a href={`mailto:${item.contact.email}`}>
                        <img
                          className="modal_baseinfo-content_item_info-contact-icon"
                          src={gmailicon}
                          alt=""
                        />
                      </a>
                      <img
                        className="modal_baseinfo-content_item_info-contact-icon"
                        src={igicon}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              )
            }

            return null
          })}
        </div>
      </Box>
    </Modal>
  )
}

ModalDetailBaseInfo.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  listCadres: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
}

export default ModalDetailBaseInfo
