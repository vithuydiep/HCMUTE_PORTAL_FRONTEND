import AxiosService from './AxiosService'

class NewsApi {
  getListNews = (params) => {
    const url = 'api/v1/news'
    return AxiosService.get(url, { params })
  }

  getNews = (params) => {
    const url = `api/v1/news/${params}`
    return AxiosService.get(url)
  }

  addNew = (data) => {
    const url = 'api/v1/news'
    return AxiosService.post(url, data)
  }

  getTotalPage = (params) => {
    const url = `api/v1/news/total`
    return AxiosService.get(url, { params })
  }

  getNewsForAdmin = (params) => {
    const url = '/api/v1/news/getNewsForAdmin'
    return AxiosService.get(url, { params })
  }

  updateStatusForNew = (data) => {
    const url = '/api/v1/news/updateStatus'
    return AxiosService.post(url, data)
  }

  deleteNews = (params) => {
    const url = `api/v1/news/${params}`
    return AxiosService.delete(url)
  }

  updateNews = (data) => {
    const url = 'api/v1/news'
    return AxiosService.put(url, data)
  }

  getRequestNews = () => {
    const url = 'api/v1/news/total-request'
    return AxiosService.get(url)
  }

  getListNewsByUser = () => {
    const url = 'api/v1/news//request-news'
    return AxiosService.get(url)
  }
}

const newsApi = new NewsApi()
export default newsApi
