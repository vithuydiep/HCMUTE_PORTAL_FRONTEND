import React from 'react'
import './GeneralInfo.css'

function GeneralInfo() {
  return (
    <div className="general">
      <div className="grid wide">
        <div className="general_title">
          <div className="general_title--text">
            THÔNG TIN CHUNG
            <br />
            ĐOÀN THANH NIÊN - HỘI SINH VIÊN TRƯỜNG
          </div>
        </div>
        <div className="general_content">
          <div className="row">
            <div className="col l-6 m-6 c-12">
              <div className="general_content-title">SỨ MỆNH</div>
              <div className="general_content-des">
                Với sứ mệnh mang lại những phong trào và hoạt động bổ ích dành
                cho các bạn sinh viên trong việc rèn luyện bản thân trong mọi
                mặt đời sông.
                <br />
                Chuẩn bị cho các bạn sinh viên một hành trang vững trãi khi còn
                ngồi trên ghế nhà trường và đó là điều vô cùng cần thiết khi
                bước vào cuộc sống
              </div>
            </div>
            <div className="col l-6 m-6 c-12">
              <div className="general_content-title">TẦM NHÌN</div>
              <div className="general_content-des">
                Trở thành một đơn vị dẫn đầu trong tác chăm lo và bảo vệ quyền
                lợi hợp pháp của Đoàn viên - Hội viên trường Đại học Sư phạm Kỹ
                Thuật Thành phố Hồ Chí Minh
                <br />
                Không ngừng học hỏi và tiếp thu những công nghệ góp phần thực
                hiện chủ đề “ Chuyển đổi số” trong thời kỳ đổi mới và thích nghi
                với cuộc sống bình thường mới
              </div>
            </div>
          </div>
        </div>
        <div className="general_picture">
          <iframe
            className="responsive-iframe"
            src="https://www.youtube.com/embed/MPr4Pjc7ojI?autoplay=1"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}

export default GeneralInfo
