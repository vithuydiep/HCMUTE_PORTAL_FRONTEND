import AxiosService from './AxiosService'

class UserApi {
  loginGG = (data) => {
    const url = 'api/v1/auth/logingoogle'
    return AxiosService.post(url, data.payload)
  }

  loginAccount = (data) => {
    const url = 'api/v1/auth/login'
    return AxiosService.post(url, data.payload)
  }

  refreshToken = (data) => {
    const url = 'api/v1/auth/refreshToken'
    return AxiosService.post(url, { refreshToken: data })
  }

  getInfo = () => {
    const url = 'api/v1/users/info'
    return AxiosService.get(url)
  }

  updateInfo = (data) => {
    const url = 'api/v1/users/info'
    return AxiosService.put(url, data)
  }

  getUsersForAdmin = (params) => {
    const url = '/api/v1/users/getUsersForAdmin'
    return AxiosService.get(url, { params })
  }

  deleteUsers = (params) => {
    const url = `api/v1/users/${params}`
    return AxiosService.delete(url)
  }

  updateUsersForAdmin = (data) => {
    const url = 'api/v1/users'
    return AxiosService.put(url, data)
  }

  getUserEditForAdmin = (params) => {
    const url = `api/v1/users/getUserEditForAdmin/${params}`
    return AxiosService.get(url)
  }

  setCheckAttendance = (data) => {
    const url = '/api/v1/users/checking'
    return AxiosService.post(url, data)
  }

  updateInfoUserEditAdmin = (data) => {
    const url = 'api/v1/users/updateInfoUserEditAdmin'
    return AxiosService.put(url, data)
  }

  addUser = (data) => {
    const url = 'api/v1/users'
    return AxiosService.post(url, data)
  }
}
const userApi = new UserApi()
export default userApi
