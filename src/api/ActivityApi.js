import AxiosService from './AxiosService'

class ActivityApi {
  createActivity = (data) => {
    const url = 'api/v1/activitys/create-activity'
    return AxiosService.post(url, data)
  }

  registerActivityForStudent = (data) => {
    const url = 'api/v1/activitys/register-activity'
    return AxiosService.post(url, data)
  }

  getTotalActivity = (params) => {
    const url = `api/v1/activitys/total/${params}`
    return AxiosService.get(url)
  }

  getActivity = (params) => {
    const url = `api/v1/activitys/${params}`
    return AxiosService.get(url)
  }

  getListActivities = (params) => {
    const url = 'api/v1/activitys'
    return AxiosService.get(url, { params })
  }

  getListActivitiesForUser = (params) => {
    const url = 'api/v1/activitys/student/list-activity-for-user'
    return AxiosService.get(url, { params })
  }

  getTotalActivityForUser = (params) => {
    const url = `api/v1/activitys/student/total-activity-for-user`
    return AxiosService.get(url, { params })
  }

  getListActivitiesForAdmin= (params) => {
    const url = `api/v1/activitys/admin/activity/get-all-list-activity`
    return AxiosService.get(url, { params })
  }

  deleteActivity = (params) => {
    const url = `api/v1/activitys/${params}`
    return AxiosService.delete(url)
  }

  editActivity = (data) => {
    const url = 'api/v1/activitys/admin/activity/edit-activity'
    return AxiosService.post(url, data)
  }

  getListAttendance = (params) => {
    const url = `api/v1/activitys/admin/getListAttendance/${params}`
    return AxiosService.get(url)
}

  getRequestTotalActivity = () => {
    const url = 'api/v1/activitys/admin/total-request'
    return AxiosService.get(url)
  }
}

const activityApi = new ActivityApi()
export default activityApi
