/* eslint-disable no-param-reassign */
// Abstraction of all the communication with backend through rest api calls, so all that logic is isolated to this section.
// use of a http service with axios or similar
import axios from 'axios'
import queryString from 'query-string'
import configuration from '../configuration'

const { ApiUrl } = configuration

const AxiosService = axios.create({
  baseURL: ApiUrl,
  timeout: 30 * 1000,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
})

AxiosService.interceptors.request.use(async (req) => {
  const ApiRequestToken =
    localStorage.getItem('authLogin') &&
    JSON.parse(localStorage.getItem('authLogin')).tokens.access.token
  if (ApiRequestToken) {
    req.headers.Authorization = `Bearer ${ApiRequestToken}`
  }
  return req
})

AxiosService.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    if (error.response.status === 401) {
      const authLogin = JSON.parse(localStorage.getItem('authLogin'))
      const response = await AxiosService.post('api/v1/auth/refreshToken', {
        refreshToken: authLogin.tokens.refresh.token,
      })
      const { status, data } = response
      if (status === 200 || status === 201) {
        const user = JSON.parse(localStorage.getItem('authLogin'))
        user.tokens = data
        localStorage.setItem('authLogin', JSON.stringify(user))
        window.location.reload()
      }
    }
  }
)

export default AxiosService
