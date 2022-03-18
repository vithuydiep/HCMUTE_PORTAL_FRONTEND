import AxiosService from './AxiosService'

class SliderApi {
  getListSlider = () => {
    const url = 'api/v1/slider/getListSlider'
    return AxiosService.get(url)
  }

  createNewSlider = (data) => {
    const url = 'api/v1/slider/add-slider'
    return AxiosService.post(url, data)
  }

  getSliderById = (id) => {
    const url = `api/v1/slider/${id}`
    return AxiosService.get(url)
  }

  updateSlider = (data) => {
    const url = 'api/v1/slider/update'
    return AxiosService.put(url, data)
  }

  deleteSlider = (id) => {
    const url = `api/v1/slider/${id}`
    return AxiosService.delete(url)
  }
}

const sliderApi = new SliderApi()
export default sliderApi
