import React from 'react'
import HomeIcon from '@mui/icons-material/Home'
import InfoIcon from '@mui/icons-material/Info'
import FiberNewIcon from '@mui/icons-material/FiberNew'
import AirplayIcon from '@mui/icons-material/Airplay'
import PersonIcon from '@mui/icons-material/Person'
import LabelImportantIcon from '@mui/icons-material/LabelImportant'
import logoCKD from '../assets/CKD.png'
import logoCNTT from '../assets/CNTT.png'
import logoHOATHUCPHAM from '../assets/HOATHUCPHAM.png'
import logoKHOAHOCUNGDUNG from '../assets/KHOAHOCUNGDUNG.png'
import logoKHOAIN from '../assets/KHOAIN.png'
import logoKTX from '../assets/KTX.png'
import logoCOKHIMAY from '../assets/logoCOKHIMAY.png'
import logoDien from '../assets/logoDien.png'
import logoKinhte from '../assets/logoKinhte.png'
import logoNGOAINGU from '../assets/NGOAINGU.png'
import logoNGOAITRU from '../assets/NGOAITRU.png'
import logoCLC from '../assets/logoCLC.png'
import logoTHOITRANG from '../assets/THOITRANG.png'
import logoXAYDUNG from '../assets/XAYDUNG.png'
import logoESC from '../assets/logoESC.png'
import logoGuitar from '../assets/logoGuitar.png'
import logoKyNang from '../assets/logoKyNang.png'
import logoNghienCuuKhoaHoc from '../assets/logoNghienCuuKhoaHoc.jpg'
import logoTheThaoDienTu from '../assets/logoTheThaoDienTu.png'
import logoVVN from '../assets/logoVVN.png'
import logoCTXH from '../assets/LogoCTXH.png'
import logoMC from '../assets/logo-MC.png'

export const mainMenuListArr = [
  {
    id: 1,
    name: 'Trang chủ',
    icon: <HomeIcon />,
  },
  {
    id: 2,
    name: 'Giới thiệu',
    icon: <InfoIcon />,
    link: '/overview',
  },
  {
    id: 3,
    name: 'Bảng tin',
    icon: <FiberNewIcon />,
    link: '/general',
  },
  {
    id: 4,
    name: 'Chương trình',
    icon: <AirplayIcon />,
    link: '/activity',
  },
  {
    id: 5,
    name: 'Sinh viên 5 tốt',
    icon: <PersonIcon />,
  },
]

export const subMenuObj = {
  2: [
    {
      id: '1',
      name: 'Thông tin chung',
      icon: <LabelImportantIcon />,
      link: '/overview',
    },
    {
      id: '2',
      name: 'Thông tin Đoàn - Hội Trường',
      icon: <LabelImportantIcon />,
      link: '/overview/youthunion',
    },
    {
      id: '3',
      name: 'Thông tin cơ sở Đoàn',
      icon: <LabelImportantIcon />,
      link: '/overview/youthunion',
    },
    {
      id: '4',
      name: 'Thông tin cơ sở Hội',
      icon: <LabelImportantIcon />,
      link: '/overview/clubinfo',
    },
  ],
  3: [
    {
      id: '1',
      name: 'Thông tin chung',
      icon: <LabelImportantIcon />,
      link: '/general',
    },
    {
      id: '2',
      name: 'Tin nổi bật',
      icon: <LabelImportantIcon />,
      link: '/general/tin-noi-bat',
    },
    {
      id: '3',
      name: 'Tin UTE',
      icon: <LabelImportantIcon />,
      link: '/general/tin-ute',
    },
    {
      id: '4',
      name: 'Thông tin thông báo',
      icon: <LabelImportantIcon />,
      link: '/general/thong-tin-thong-bao',
    },
    {
      id: '5',
      name: 'Chương trình hoạt động',
      icon: <LabelImportantIcon />,
      link: '/general/chuong-trinh-hoat-dong',
    },
    {
      id: '6',
      name: 'Học tập và nghiên cứu',
      icon: <LabelImportantIcon />,
      link: '/general/hoc-tap-nghien-cuu',
    },
  ],
  4: [
    {
      id: '1',
      name: 'Rèn luyện Đạo đức',
      icon: <LabelImportantIcon />,
      link: '/general-activity/dao-duc',
    },
    {
      id: '2',
      name: 'Rèn luyện học tập - Nghiên cứu khoa học',
      icon: <LabelImportantIcon />,
      link: '/general-activity/hoc-tap',
    },
    {
      id: '3',
      name: 'Rèn luyện thể chất',
      icon: <LabelImportantIcon />,
      link: '/general-activity/the-luc',
    },
    {
      id: '4',
      name: 'Hoạt đồng tình nguyện vì cộng đồng',
      icon: <LabelImportantIcon />,
      link: '/general-activity/tinh-nguyen',
    },
    {
      id: '5',
      name: 'Hoạt động Hội nhập',
      icon: <LabelImportantIcon />,
      link: '/general-activity/hoi-nhap',
    },
    {
      id: '6',
      name: 'Các hoạt động khác',
      icon: <LabelImportantIcon />,
      link: '/general-activity/khac',
    },
  ],
}

export const listUnionBasicInfo = [
  {
    name: 'KHOA ĐÀO TẠO CHẤT LƯỢNG CAO',
    link: 'https://www.facebook.com/youthfhq',
    logo: logoCLC,
    cadreses: [
      {
        name: 'Châu Thanh Tùng',
        position: 'Bí Thư Đoàn Khoa Đào Tạo Chất Lượng Cao',
        description:
          'Phụ trách công tác chỉ đạo hoạt động chung của Đoàn Thanh niên Khoa ĐT Chât lượng cao',
        contact: {
          facebook: '',
          email: 'chauthanhtung24@gmail.com',
          instagram: '',
        },
        type: 'doan',
      },
      {
        name: 'Bùi Thanh Phương',
        position: 'LCH Trưởng Liên Chi Hội Khoa Đào tạo Chất lượng cao',
        description:
          'Phụ trách công tác chỉ đạo hoạt động chung của Liên Chi Hội Khoa ĐT Chât lượng cao',
        contact: {
          facebook: '',
          email: '12a123lt18@gmail.com',
          instagram: '',
        },
        type: 'hoi',
      },
    ],
  },
  {
    name: 'KHOA KINH TẾ',
    link: 'https://www.facebook.com/yecom.hcmute',
    logo: logoKinhte,
    cadreses: [
      {
        name: 'Lê Văn Phiên	',
        position: 'Bí thư',
        description:
          'Phụ trách công tác chỉ đạo hoạt động chung của Đoàn Thanh niên',
        contact: {
          facebook: '',
          email: 'phienlv2000@gmail.com	',
          instagram: '',
        },
        type: 'doan',
      },
      {
        name: 'Hòa Thị Thu Giang',
        position: 'LCH Trưởng',
        description:
          'Phụ trách công tác chỉ đạo hoạt động chung của Liên Chi Hội Khoa',
        contact: {
          facebook: '',
          email: 'hoagiangad@gmail.com',
          instagram: '',
        },
        type: 'hoi',
      },
    ],
  },
  {
    name: 'KHOA CƠ KHÍ CHẾ TẠO MÁY',
    link: 'https://www.facebook.com/doankhoacokhichetaomay',
    logo: logoCOKHIMAY,
    cadreses: [
      {
        name: 'Đặng Trí Dũng',
        position: 'Bí thư',
        description:
          'Phụ trách công tác chỉ đạo hoạt động chung của Đoàn Thanh niên',
        contact: {
          facebook: '',
          email: 'tridungspkt@hcmute.edu.vn	',
          instagram: '',
        },
        type: 'doan',
      },
      {
        name: 'Nguyễn Quang Huy',
        position: 'LCH Trưởng',
        description:
          'Phụ trách công tác chỉ đạo hoạt động chung của Liên Chi Hội Khoa',
        contact: {
          facebook: '',
          email: '19146339@student.hcmute.edu.vn',
          instagram: '',
        },
        type: 'hoi',
      },
    ],
  },
  {
    name: 'KHOA ĐIỆN - ĐIỆN TỬ',
    link: 'https://www.facebook.com/Doan.Hoi.FEEE.SPKT',
    logo: logoDien,
    cadreses: [
      {
        name: 'Huỳnh Hoàng Hà',
        position: 'Bí thư',
        description:
          'Phụ trách công tác chỉ đạo hoạt động chung của Đoàn Thanh niên',
        contact: {
          facebook: '',
          email: 'hahh@hcmute.edu.vn',
          instagram: '',
        },
        type: 'doan',
      },
      {
        name: 'Trần Văn Khá',
        position: 'LCH Trưởng',
        description:
          'Phụ trách công tác chỉ đạo hoạt động chung của Liên Chi Hội Khoa',
        contact: {
          facebook: '',
          email: 'tranvankha2709@gmail.com',
          instagram: '',
        },
        type: 'hoi',
      },
    ],
  },
  {
    name: 'KHOA CÔNG NGHỆ HÓA HỌC VÀ THỰC PHẨM',
    link: 'https://www.facebook.com/DoanHoiFCFT',
    logo: logoHOATHUCPHAM,
    cadreses: [
      {
        name: 'Nguyễn Quang Duy',
        position: 'Bí thư',
        description:
          'Phụ trách công tác chỉ đạo hoạt động chung của Đoàn Thanh niên',
        contact: {
          facebook: '',
          email: 'duynq@hcmute.edu.vn',
          instagram: '',
        },
        type: 'doan',
      },
      {
        name: 'Thái Duy Khang',
        position: 'LCH Trưởng',
        description:
          'Phụ trách công tác chỉ đạo hoạt động chung của Liên Chi Hội Khoa',
        contact: {
          facebook: '',
          email: 'duykhang7900@gmail.com',
          instagram: '',
        },
        type: 'hoi',
      },
    ],
  },
  {
    name: 'KHOA KHOA HỌC ỨNG DỤNG',
    link: 'https://www.facebook.com/CVLSPKT',
    logo: logoKHOAHOCUNGDUNG,
    cadreses: [
      {
        name: 'Trần Tiến Anh',
        position: 'Bí thư',
        description:
          'Phụ trách công tác chỉ đạo hoạt động chung của Đoàn Thanh niên',
        contact: {
          facebook: '',
          email: 'tienanha2dp1@gmail.com',
          instagram: '',
        },
        type: 'doan',
      },
      {
        name: 'Huỳnh Ngọc Lam Trường',
        position: 'LCH Trưởng',
        description:
          'Phụ trách công tác chỉ đạo hoạt động chung của Liên Chi Hội Khoa',
        contact: {
          facebook: '',
          email: 'huynhtruong2505322@gmail.com',
          instagram: '',
        },
        type: 'hoi',
      },
    ],
  },
  {
    name: 'KHOA IN VÀ TRUYỀN THÔNG',
    link: 'https://www.facebook.com/KhoaInvaTruyenthong',
    logo: logoKHOAIN,
    cadreses: [
      {
        name: 'Nguyễn Văn Cường	',
        position: 'Bí thư',
        description:
          'Phụ trách công tác chỉ đạo hoạt động chung của Đoàn Thanh niên',
        contact: {
          facebook: '',
          email: 'nvcuongg1211@gmail.com',
          instagram: '',
        },
        type: 'doan',
      },
      {
        name: 'Nguyễn Trương Trường Hào',
        position: 'LCH Trưởng',
        description:
          'Phụ trách công tác chỉ đạo hoạt động chung của Liên Chi Hội Khoa',
        contact: {
          facebook: '',
          email: '19158112@student.hcmute.edu.vn',
          instagram: '',
        },
        type: 'hoi',
      },
    ],
  },
  {
    name: 'KHOA CÔNG NGHỆ THÔNG TIN',
    link: 'https://www.facebook.com/DoanHoiITUTE',
    logo: logoCNTT,
    cadreses: [
      {
        name: 'Đào Văn Thắng',
        position: 'Bí thư',
        description:
          'Phụ trách công tác chỉ đạo hoạt động chung của Đoàn Thanh niên',
        contact: {
          facebook: '',
          email: 'thangdao2018@gmail.com',
          instagram: '',
        },
        type: 'doan',
      },
      {
        name: 'Trần Ngọc Minh Thiện',
        position: 'LCH Trưởng',
        description:
          'Phụ trách công tác chỉ đạo hoạt động chung của Liên Chi Hội Khoa',
        contact: {
          facebook: '',
          email: 'thientnm.itute@gmail.com',
          instagram: '',
        },
        type: 'hoi',
      },
    ],
  },
  {
    name: 'KHOA THỜI TRANG VÀ DU LỊCH',
    link: 'https://www.facebook.com/khoacnmttspkt',
    logo: logoTHOITRANG,
    cadreses: [
      {
        name: 'Hà Thị Diệu Mai',
        position: 'Bí thư',
        description:
          'Phụ trách công tác chỉ đạo hoạt động chung của Đoàn Thanh niên',
        contact: {
          facebook: '',
          email: 'mainhan1142@gmail.com	',
          instagram: '',
        },
        type: 'doan',
      },
      {
        name: 'Võ Minh Anh Đô',
        position: 'LCH Trưởng',
        description:
          'Phụ trách công tác chỉ đạo hoạt động chung của Liên Chi Hội Khoa',
        contact: {
          facebook: '',
          email: 'vominhanhdo@gmail.com',
          instagram: '',
        },
        type: 'hoi',
      },
    ],
  },
  {
    name: 'KHOA NGOẠI NGỮ',
    link: 'https://www.facebook.com/youth.ffl.hcmute',
    logo: logoNGOAINGU,
    cadreses: [
      {
        name: 'Nguyễn Trung Hiếu',
        position: 'Bí thư',
        description:
          'Phụ trách công tác chỉ đạo hoạt động chung của Đoàn Thanh niên',
        contact: {
          facebook: '',
          email: 'hieu.nguyentrung@hcmute.edu.vn',
          instagram: '',
        },
        type: 'doan',
      },
      {
        name: 'Đào Minh Thuận',
        position: 'LCH Trưởng',
        description:
          'Phụ trách công tác chỉ đạo hoạt động chung của Liên Chi Hội Khoa',
        contact: {
          facebook: '',
          email: '18131105@student.hcmute.edu.vn',
          instagram: '',
        },
        type: 'hoi',
      },
    ],
  },
  {
    name: 'KHOA XÂY DỰNG',
    link: 'https://www.facebook.com/FCE.Media',
    logo: logoXAYDUNG,
    cadreses: [
      {
        name: 'Nguyễn Thế Anh	',
        position: 'Bí thư',
        description:
          'Phụ trách công tác chỉ đạo hoạt động chung của Đoàn Thanh niên',
        contact: {
          facebook: '',
          email: 'ntanh@hcmute.edu.vn',
          instagram: '',
        },
        type: 'doan',
      },
      {
        name: 'Huỳnh Hoàng Phong',
        position: 'LCH Trưởng',
        description:
          'Phụ trách công tác chỉ đạo hoạt động chung của Liên Chi Hội Khoa',
        contact: {
          facebook: '',
          email: 'hoangphong2022000@gmail.com',
          instagram: '',
        },
        type: 'hoi',
      },
    ],
  },
  {
    name: 'KHOA CƠ KHÍ ĐỘNG LỰC',
    link: 'https://www.facebook.com/thongtinckd',
    logo: logoCKD,
    cadreses: [
      {
        name: 'Nguyễn Thành Tuyên',
        position: 'Bí thư',
        description:
          'Phụ trách công tác chỉ đạo hoạt động chung của Đoàn Thanh niên',
        contact: {
          facebook: '',
          email: 'tuyennt@hcmute.edu.vn',
          instagram: '',
        },
        type: 'doan',
      },
      {
        name: 'Nguyễn Nhựt Linh',
        position: 'LCH Trưởng',
        description:
          'Phụ trách công tác chỉ đạo hoạt động chung của Liên Chi Hội Khoa',
        contact: {
          facebook: '',
          email: '18145389@student.hcmute.edu.vn',
          instagram: '',
        },
        type: 'hoi',
      },
    ],
  },
  {
    name: 'SINH VIÊN NGOẠI TRÚ',
    link: 'https://www.facebook.com/LCHSVNgoaiTruSPKT',
    logo: logoNGOAITRU,
    cadreses: [
      {
        name: 'Võ Minh Hòa',
        position: 'LCH Trưởng',
        description:
          'Phụ trách công tác chỉ đạo hoạt động chung của Liên Chi Hội Khoa',
        contact: {
          facebook: '',
          email: 'minhhoavo73@gmail.com',
          instagram: '',
        },
        type: 'hoi',
      },
    ],
  },
  {
    name: 'SINH VIÊN KÝ TÚC XÁ',
    link: 'https://www.facebook.com/lchktxhcmute',
    logo: logoKTX,
    cadreses: [
      {
        name: 'Huỳnh Vĩ Khang',
        position: 'LCH Trưởng',
        description:
          'Phụ trách công tác chỉ đạo hoạt động chung của Liên Chi Hội Khoa',
        contact: {
          facebook: '',
          email: 'khanghuynhvi123@gmail.com',
          instagram: '',
        },
        type: 'hoi',
      },
    ],
  },
]

export const listUnionClubInfo = [
  {
    name: 'CÂU LẠC BỘ KỸ NĂNG',
    link: 'https://www.facebook.com/kynangspk',
    logo: logoKyNang,
    cadreses: [
      {
        name: 'Nguyễn Thị Mỹ Duyên',
        position: 'Chủ nhiệm',
        description:
          'Phụ trách công tác chỉ đạo hoạt động chung của Liên Chi Hội Khoa',
        contact: {
          facebook: '',
          email: 'oduyen2311@gmail.com',
          instagram: '',
        },
        type: 'hoi',
      },
    ],
  },
  {
    name: 'ĐỘI CÔNG TÁC XÃ HỘI',
    link: 'https://www.facebook.com/congtacxahoispkt',
    logo: logoCTXH,
    cadreses: [
      {
        name: 'Đỗ Đình Nam',
        position: 'Đội trưởng',
        description:
          'Phụ trách công tác chỉ đạo hoạt động chung của Liên Chi Hội Khoa',
        contact: {
          facebook: '',
          email: 'dinhnam15987@gmail.com',
          instagram: '',
        },
        type: 'hoi',
      },
    ],
  },
  {
    name: 'CÂU LẠC BỘ ANH VĂN GIAO TIẾP',
    link: 'https://www.facebook.com/realesc.hcmute',
    logo: logoESC,
    cadreses: [
      {
        name: 'Phạm Thị Diễm Trinh',
        position: 'Chủ nhiệm',
        description:
          'Phụ trách công tác chỉ đạo hoạt động chung của Liên Chi Hội Khoa',
        contact: {
          facebook: '',
          email: '18950019@student.hcmute.edu.vn',
          instagram: '',
        },
        type: 'hoi',
      },
    ],
  },
  {
    name: 'CÂU LẠC BỘ GUITAR',
    link: 'https://www.facebook.com/SPKTGuitar/',
    logo: logoGuitar,
    cadreses: [
      {
        name: 'Võ Lan Như',
        position: 'Chủ nhiệm',
        description:
          'Phụ trách công tác chỉ đạo hoạt động chung của Liên Chi Hội Khoa',
        contact: {
          facebook: '',
          email: 'lannhu1905@gmail.com',
          instagram: '',
        },
        type: 'hoi',
      },
    ],
  },
  {
    name: 'CÂU LẠC BỘ NGHIÊN CỨU KHOA HỌC',
    link: 'https://www.facebook.com/SRCUTE/',
    logo: logoNghienCuuKhoaHoc,
    cadreses: [
      {
        name: 'Trương Xuân Thi',
        position: 'Chủ nhiệm',
        description:
          'Phụ trách công tác chỉ đạo hoạt động chung của Liên Chi Hội Khoa',
        contact: {
          facebook: '',
          email: 'txthi1999@gmail.com',
          instagram: '',
        },
        type: 'hoi',
      },
    ],
  },
  {
    name: 'CÂU LẠC BỘ THỂ THAO ĐIỆN TỬ',
    link: 'https://www.facebook.com/ECHCMUTE/',
    logo: logoTheThaoDienTu,
    cadreses: [
      {
        name: 'Võ Phúc Đan Thy',
        position: 'Chủ nhiệm',
        description:
          'Phụ trách công tác chỉ đạo hoạt động chung của Liên Chi Hội Khoa',
        contact: {
          facebook: '',
          email: 'danthyvophuc@gmail.com',
          instagram: '',
        },
        type: 'hoi',
      },
    ],
  },
  {
    name: 'CÂU LẠC BỘ VOVINAM VIỆT VÕ ĐẠO',
    link: 'https://www.facebook.com/vovinamspkt/',
    logo: logoVVN,
    cadreses: [
      {
        name: 'Phạm Đức Anh Đức',
        position: 'Chủ nhiệm',
        description:
          'Phụ trách công tác chỉ đạo hoạt động chung của Liên Chi Hội Khoa',
        contact: {
          facebook: '',
          email: 'pduc438@gmail.com',
          instagram: '',
        },
        type: 'hoi',
      },
    ],
  },
  {
    name: 'CLB NGƯỜI DẪN CHƯƠNG TRÌNH SPKT',
    link: 'https://www.facebook.com/clbmcute/',
    logo: logoMC,
    cadreses: [
      {
        name: 'Nguyễn Quốc Thịnh',
        position: 'Chủ nhiệm',
        description:
          'Phụ trách công tác chỉ đạo hoạt động chung của Liên Chi Hội Khoa',
        contact: {
          facebook: '',
          email: 'nguyenkhanhle21@gmail.com',
          instagram: '',
        },
        type: 'hoi',
      },
    ],
  },
]

export const typeNews = [
  {
    value: 'tin-noi-bat',
    label: 'Tin nổi bật',
  },
  {
    value: 'tin-ute',
    label: 'Tin UTE',
  },
  {
    value: 'thong-tin-thong-bao',
    label: 'Thông tin- Thông báo',
  },
  {
    value: 'chuong-trinh-hoat-dong',
    label: 'Chương trình hoạt động',
  },
  {
    value: 'hoc-tap-nghien-cuu',
    label: 'Học tập nghiên cứu',
  },
  {
    value: 'thong-tin-chung',
    label: 'Thông tin chung',
  },
]
export const FETCH_LIST_CADRES = 'FETCH_LIST_CADRES'

export const typeActivity = [
  {
    value: 'dao-duc',
    label: 'Rèn luyện Đạo đức',
  },
  {
    value: 'hoc-tap',
    label: 'Rèn luyện học tập - Nghiên cứu khoa học',
  },
  {
    value: 'the-luc',
    label: 'Rèn luyện thể chất',
  },
  {
    value: 'tinh-nguyen',
    label: 'Hoạt đồng tình nguyện vì cộng đồng',
  },
  {
    value: 'hoi-nhap',
    label: 'Hoạt động Hội nhập',
  },
  {
    value: 'khac',
    label: 'Các hoạt động khác',
  },
]

export const typeRoleUser = [
  {
    value: 'user:student',
    label: 'Sinh viên',
  },
  {
    value: 'user:unionBase',
    label: 'Cơ sở',
  },
]

