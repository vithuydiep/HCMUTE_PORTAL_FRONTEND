import AxiosService from './AxiosService'

class CadresApi {
  getListCadres = () => {
    const url = 'api/v1/cadres'
    return AxiosService.get(url)
  }
}

const cadresApi = new CadresApi()
export default cadresApi
