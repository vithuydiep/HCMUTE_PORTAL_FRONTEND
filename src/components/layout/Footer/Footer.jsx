/* eslint-disable react/no-children-prop */
import TextField from '@mui/material/TextField'
import Button from 'components/ui/Button/Button'
import React from 'react'
import logoTruong from '../../../assets/logotruong.png'
import logoFB from '../../../assets/logo_facebook.png'
import logoEmail from '../../../assets/logo_gmail.png'
import logoMobile from '../../../assets/logo_mobile_app.png'
import './Footer.css'

const Footer = () => {
  return (
    <div className="block-footer">
      <div className="grid wide">
        <div className="row">
          <div className="col l-6 m-6 c-12">
            <div className="space">
              <div className="space-left-up">
                <img src={logoTruong} className="logo" alt="logo" />
                <div className="text-under-logo">
                  <div>ĐOÀN THANH NIÊN - HỘI SINH VIÊN</div>
                  <div>TRƯỜNG ĐẠI HỌC SƯ PHẠM KỸ THUẬT TP.HCM</div>
                </div>
              </div>
              <div className="space-left-down">
                <div className="space-left-down-text">
                  01 Vo Van Ngan Street - Linh Chieu Ward - Thu Duc District -
                  HCMC
                </div>
                <div className="space-left-down-text">Tel: 08 3897 3871</div>
                <div className="space-left-down-text">
                  Website: http://tuoitre.hcmute.edu.vn/
                </div>
                <div className="space-left-down-text">
                  Email: dhspkt@hoisinhvien.vn; hoisinhvien@hcmute.edu.vn
                </div>
              </div>
            </div>
          </div>
          <div className="col l-6 m-6 c-12">
            <div className="space">
              <div className="space-right-up">
                <div className="text-right-up">
                  <p>Liên hệ với chúng tôi</p>
                </div>
                <div className="tool-right-up">
                  <TextField
                    id="outlined-basic"
                    label="Nhập địa chỉ email của bạn"
                    variant="outlined"
                    fullWidth
                  />
                  <div className="space_contact_btn">
                    <Button classname="btn_contact" children="Liên hệ" />
                    <p className="text_or">Hoặc</p>
                    <img src={logoFB} className="logo_fb" alt="logo_fb" />
                    <img
                      src={logoEmail}
                      className="logo_email"
                      alt="logo_email"
                    />
                  </div>
                </div>
              </div>
              <div className="space-right-down">
                <div className="text-right-up">
                  <p>Trải nghiệm với phiên bản Mobile</p>
                </div>
                <div className="tool-right-down">
                  <img
                    src={logoMobile}
                    className="logo-mobile"
                    alt="logo_mobile"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="grid wide">
          <div className="text-final">
            Website được xây dựng và phát triển bởi nhóm sinh viên công nghệ
            thông tin - Khoa Đào tạo Chất lượng cao
            <br />
            Trường Đại học Sư phạm Kỹ thuật Thành Phố Hồ Chí Minh
          </div>
        </div>
      </div>
    </div>
  )
}
export default Footer
