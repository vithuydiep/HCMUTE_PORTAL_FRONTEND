/* eslint-disable require-yield */
import { takeLatest, call, put, delay } from 'redux-saga/effects'
import sliderApi from 'api/SliderApi'
import { toastError } from 'helper/toastHelper'
import CadressApi from '../../api/CadresApi'
import * as cadresActions from '../reducers/CadresSlide'
import * as loadingActions from '../reducers/LoadingSlide'
import * as newsAction from '../reducers/NewsSlice'
import * as usersAction from '../reducers/UsersSlice'
import * as authActions from '../reducers/AuthReducer'
import * as activityActions from '../reducers/ActivityReducer'
import * as sliderActions from '../reducers/SliderReducer'
import history from '../../helper/history'
import NewsApi from '../../api/NewsApi'
import userApi from '../../api/UserApi'
import activityApi from '../../api/ActivityApi'

function forwardTo(location) {
  history.push(location)
}

function* getListCadress() {
  try {
    yield put(loadingActions.showLoading())
    const response = yield call(CadressApi.getListCadres)
    const { status, data, error } = response
    if (status === 200) {
      yield put(cadresActions.fetchCadresListSuccess(data))
    } else {
      yield put(cadresActions.fetchCadresListFail(error))
    }
  } catch (e) {
    yield put(newsAction.fetchListNewsFail(e))
  }
  yield delay(1000)
  yield put(loadingActions.closeLoading())
}

function* getListNews({ payload }) {
  const params = payload
  try {
    const response = yield call(NewsApi.getListNews, params)
    const { status, data, error } = response
    if (status === 200) {
      yield put(newsAction.fetchListNewsSuccess(data))
    } else {
      yield put(newsAction.fetchListNewsFail(error))
    }
  } catch (e) {
    yield put(newsAction.fetchListNewsFail(e))
  }
}
function* getTotalPage({ payload }) {
  const response = yield call(NewsApi.getTotalPage, payload)
  const { status, data, error } = response
  if (status === 200) {
    yield put(newsAction.fetchtotalNewsSuccess(data))
  } else {
    yield put(newsAction.fetchtotalNewsFail(error))
  }
}

function* getItemNews({ payload }) {
  const response = yield call(NewsApi.getNews, payload)
  const { status, data, error } = response
  if (status === 200) {
    yield put(newsAction.fetchItemSuccess(data))
  } else {
    yield put(newsAction.fetchItemFail(error))
  }
}
function* getHotNews({ payload }) {
  const params = payload
  const response = yield call(NewsApi.getListNews, params)
  const { status, data, error } = response
  if (status === 200) {
    yield put(newsAction.fetchHotNewsSuccess(data))
  } else {
    yield put(newsAction.fetchHotNewsFail(error))
  }
}

function* handleLogin(payload) {
  try {
    let response
    if (Object.keys(payload.payload).length === 1) {
      response = yield call(userApi.loginGG, payload)
    } else if (Object.keys(payload.payload).length === 2) {
      response = yield call(userApi.loginAccount, payload)
    }
    const { status, data } = response
    if (status === 200 || status === 201) {
      yield put(authActions.loginSuccess(data))
      localStorage.setItem('authLogin', JSON.stringify(data))
      if (data.user.role === 'admin') {
        yield call(forwardTo, '/dashboard')
        window.location.reload(false)
      } else {
        window.location.replace('/')
        // window.location.reload(false)
      }
    }
    if (status === 222) {
      // eslint-disable-next-line no-alert
      window.alert('Vui lòng sử dụng Email sinh viên để đăng nhập !')
    }
  } catch (err) {
    toastError({ message: 'Kiểm tra lại thông tin đăng nhập!' })
  }
}
function* handleLogout() {
  localStorage.removeItem('authLogin')
  yield call(forwardTo, '/')
  window.location.reload(false)
}

function* handleAddNews({ payload }) {
  const response = yield call(NewsApi.addNew, payload)
  const { status, data, error } = response
  if (status === 200) {
    yield put(newsAction.fetchAddNewsSuccess(data))
  } else {
    yield put(newsAction.fetchAddNewsFail(error))
  }
}

function* handleAddUsers({ payload }) {
  const response = yield call(userApi.addUser, payload)
  const { status, data, error } = response
  if (status === 200) {
    yield put(usersAction.fetchAddUsersSuccess(data))
  } else {
    yield put(usersAction.fetchAddUsersFail(error))
  }
}

function* handleRefresh({ payload }) {
  const response = yield call(userApi.refreshToken, payload)
  const { status, data } = response
  if (status === 200 || status === 201) {
    const user = JSON.parse(localStorage.getItem('authLogin'))
    user.tokens = data
    localStorage.setItem('authLogin', JSON.stringify(user))
  }
}
// Activity
function* getTotalActivity({ payload }) {
  const response = yield call(activityApi.getTotalActivity, payload)
  const { status, data, error } = response
  if (status === 200) {
    yield put(activityActions.fetchtotalActivitiesSuccess(data))
  } else {
    yield put(activityActions.fetchtotalActivitiesFail(error))
  }
}
function* getListActivities({ payload }) {
  const params = payload
  try {
    const response = yield call(activityApi.getListActivities, params)
    const { status, data, error } = response
    if (status === 200) {
      yield put(activityActions.fetchListActivitySuccess(data))
    } else {
      yield put(activityActions.fetchListActivityFail(error))
    }
  } catch (e) {
    yield put(activityActions.fetchListActivityFail(e))
  }
}
function* getActivity({ payload }) {
  const response = yield call(activityApi.getActivity, payload)
  const { status, data, error } = response
  if (status === 200) {
    yield put(activityActions.fetchActivitySuccess(data))
  } else {
    yield put(activityActions.fetchActivityFail(error))
  }
}
function* handleAddActivity({ payload }) {
  const response = yield call(activityApi.createActivity, payload)
  const { status, data, error } = response
  if (status === 200) {
    yield put(activityActions.fetchAddActivitySuccess(data))
  } else {
    yield put(activityActions.fetchAddActivityFail(error))
  }
}

function* handleGetInformationUser() {
  try {
    const response = yield call(userApi.getInfo)
    const { status, data, error } = response
    if (status === 200) {
      yield put(authActions.getUserSuccess(data))
    } else {
      yield put(authActions.getUserFail(error))
    }
  } catch (error) {
    yield put(authActions.getUserFail(error))
  }
}
function* handleUpdateInformationUser({ payload }) {
  try {
    const response = yield call(userApi.updateInfo, payload)
    const { status, data, error } = response
    if (status === 200) {
      yield put(authActions.updateInfoUserSuccess(data))
      const user = JSON.parse(localStorage.getItem('authLogin'))
      user.user = data
      localStorage.setItem('authLogin', JSON.stringify(user))
    } else {
      yield put(authActions.updateInfoUserFail(error))
    }
  } catch (error) {
    yield put(authActions.updateInfoUserFail(error))
  } finally {
    yield put(loadingActions.closeLoading())
  }
}

function* handleUpdateInformationUserEditAdmin({ payload }) {
  try {
    const response = yield call(userApi.updateInfoUserEditAdmin, payload)
    const { status, data, error } = response
    if (status === 200) {
      yield put(authActions.updateInfoUserEditAdminSuccess(data))
      window.location.reload(false)
    } else {
      yield put(authActions.updateInfoUserEditAdminFail(error))
    }
  } catch (error) {
    yield put(authActions.updateInfoUserEditAdminFail(error))
  } finally {
    yield put(loadingActions.closeLoading())
  }
}

function* handleRegisterActivityForStudent({ payload }) {
  try {
    const response = yield call(activityApi.registerActivityForStudent, payload)
    const { status, data, error } = response
    if (status === 200) {
      yield put(activityActions.fetchRegisterActivityForStudentSucces(data))
    } else {
      yield put(activityActions.fetchRegisterActivityForStudentFail(error))
    }
  } catch (e) {
    yield put(activityActions.fetchListActivityFail(e))
  }
}
function* getActivityForUer({ payload }) {
  const response = yield call(activityApi.getListActivitiesForUser, payload)
  const { status, data, error } = response
  if (status === 200) {
    yield put(activityActions.fetchActivityForUserSuccess(data))
  } else {
    yield put(activityActions.fetchActivityForUserFail(error))
  }
}
function* getTotalActivityForUser({ payload }) {
  const response = yield call(activityApi.getTotalActivityForUser, payload)
  const { status, data, error } = response
  if (status === 200) {
    yield put(activityActions.fetchTotalActivitiesForUserSuccess(data))
  } else {
    yield put(activityActions.fetchTotalActivitiesForUserFail(error))
  }
}

function* handleGetNewsForAdmin({ payload }) {
  try {
    const response = yield call(NewsApi.getNewsForAdmin, payload)
    const { status, data, error } = response
    if (status === 200) {
      yield put(newsAction.fetchNewsForAdminSuccess(data))
    } else {
      yield put(newsAction.fetchNewsForAdminFail(error))
    }
  } catch (e) {
    yield put(newsAction.fetchNewsForAdminFail(e))
  }
}

function* handleDeleteNews({ payload }) {
  try {
    const response = yield call(NewsApi.deleteNews, payload)
    const { status, error } = response
    if (status === 200) {
      yield put(newsAction.fetchDeleteNewsSuccess(payload))
    } else {
      yield put(newsAction.fetchDeleteNewsFail(error))
    }
  } catch (e) {
    yield put(newsAction.fetchDeleteNewsFail(e))
  }
}

function* handleUpdateNews({ payload }) {
  try {
    const response = yield call(NewsApi.updateNews, payload)
    const { status, error } = response
    if (status === 200) {
      yield put(newsAction.fetchUpdateNewsSuccess(payload))
      yield delay(1000)
      const { location } = history
      const arr = location.pathname.split('/')
      const url = `${arr[0]}/${arr[1]}/${arr[2]}`
      history.replace(url)
      window.location.reload(false)
    } else {
      yield put(newsAction.fetchUpdateNewsFail(error))
    }
  } catch (e) {
    yield put(newsAction.fetchUpdateNewsFail(e))
  }
}

function* handleGetTotalRequestNews() {
  try {
    const response = yield call(NewsApi.getRequestNews)
    const { status, data, error } = response
    if (status === 200) {
      yield put(newsAction.fetchTotalRequestNewsSuccess(data))
    } else {
      yield put(newsAction.fetchTotalRequestNewsFail(error))
    }
  } catch (e) {
    yield put(newsAction.fetchTotalRequestNewsFail(e))
  }
}

function* handleGetRequestNewsByUser() {
  try {
    const response = yield call(NewsApi.getListNewsByUser)
    const { status, data, error } = response
    if (status === 200) {
      yield put(newsAction.fetchRequestNewsByUserSuccess(data))
    } else {
      yield put(newsAction.fetchRequestNewsByUserFail(error))
    }
  } catch (e) {
    yield put(newsAction.fetchRequestNewsByUserFail(e))
  }
}

// Admin - Activity
function* getActivityForAdmin(payload) {
  try {
    const response = yield call(
      activityApi.getListActivitiesForAdmin,
      payload.payload
    )
    const { status, data, error } = response
    if (status === 200) {
      yield put(activityActions.fetchActivityForAdminSuccess(data))
    } else {
      yield put(activityActions.fetchActivityForAdminFail(error))
    }
  } catch (e) {
    yield put(activityActions.fetchActivityForAdminFail(e))
  }
}
function* handleEditActivity({ payload }) {
  const response = yield call(activityApi.editActivity, payload)
  const { status, data, error } = response
  if (status === 200) {
    yield put(activityActions.fetchEditActivitySuccess(data))
    history.replace('/dashboard/request-activity')
    window.location.reload(false)
  } else {
    yield put(activityActions.fetchEditctivityFail(error))
  }
}
function* handleDeleteActivity({ payload }) {
  try {
    const response = yield call(activityApi.deleteActivity, payload)
    const { status, error } = response
    if (status === 200) {
      yield put(activityActions.fetchDeleteActivitySuccess(payload))
      window.location.reload(false)
    } else {
      yield put(activityActions.fetchDeleteActivityFail(error))
    }
  } catch (e) {
    yield put(activityActions.fetchDeleteActivityFail(e))
  }
}
function* handleGetTotalRequestActivity() {
  try {
    const response = yield call(activityApi.getRequestTotalActivity)
    const { status, data, error } = response
    if (status === 200) {
      yield put(activityActions.fetchTotalRequestActivitySuccess(data))
    } else {
      yield put(activityActions.fetchTotalRequestActivityFail(error))
    }
  } catch (e) {
    yield put(activityActions.fetchTotalRequestActivityFail(e))
  }
}

// Admin - Users

function* handleGetUsersForAdmin({ payload }) {
  try {
    const response = yield call(userApi.getUsersForAdmin, payload)
    const { status, data, error } = response
    if (status === 200) {
      yield put(usersAction.fetchUsersForAdminSuccess(data))
    } else {
      yield put(usersAction.fetchUsersForAdminFail(error))
    }
  } catch (e) {
    yield put(usersAction.fetchUsersForAdminFail(e))
  }
}

function* handleGetSliderList() {
  try {
    const response = yield call(sliderApi.getListSlider)
    const { status, data, error } = response
    if (status === 200) {
      yield put(sliderActions.fetchSliderListSuccess(data))
    } else {
      yield put(sliderActions.fetchSliderListFail(error))
    }
  } catch (e) {
    yield put(sliderActions.fetchSliderListFail(e))
  }
}

function* handleCreateSlider({ payload }) {
  try {
    const response = yield call(sliderApi.createNewSlider, payload)
    const { status, data, error } = response
    if (status === 200) {
      yield put(sliderActions.fetchCreateSliderSuccess(data))
    } else {
      yield put(sliderActions.fetchCreateSliderFail(error))
    }
  } catch (e) {
    yield put(sliderActions.fetchCreateSliderFail(e))
  }
}

function* handleGetSliderById({ payload }) {
  try {
    const response = yield call(sliderApi.getSliderById, payload)
    const { status, data, error } = response
    if (status === 200) {
      yield put(sliderActions.fetchGetSliderByIDSuccess(data))
    } else {
      yield put(sliderActions.fetchGetSliderByIDFail(error))
    }
  } catch (e) {
    yield put(sliderActions.fetchGetSliderByIDFail(e))
  }
}

function* handleUpdateSlider({ payload }) {
  try {
    const response = yield call(sliderApi.updateSlider, payload)
    const { status, data, error } = response
    if (status === 200) {
      yield put(sliderActions.fetchUpdateSliderSuccess(data))
    } else {
      yield put(sliderActions.fetchUpdateSliderFail(error))
    }
  } catch (e) {
    yield put(sliderActions.fetchUpdateSliderFail(e))
  }
}

function* handleDeleteSlider({ payload }) {
  try {
    const response = yield call(sliderApi.deleteSlider, payload)
    const { status, error } = response
    if (status === 200) {
      yield put(sliderActions.fetchDeleteSliderSuccess(payload))
    } else {
      yield put(sliderActions.fetchDeleteSliderFail(error))
    }
  } catch (e) {
    yield put(sliderActions.fetchDeleteSliderFail(e))
  }
}

function* handleDeleteUsers({ payload }) {
  try {
    const response = yield call(userApi.deleteUsers, payload)
    const { status, error } = response
    if (status === 200) {
      yield put(usersAction.fetchDeleteUsersSuccess(payload))
    } else {
      yield put(usersAction.fetchDeleteUsersFail(error))
    }
  } catch (e) {
    yield put(usersAction.fetchDeleteUsersFail(e))
  }
}

function* handleUpdateUsersForAdmin({ payload }) {
  try {
    const response = yield call(userApi.updateUsersForAdmin, payload)
    const { status, error } = response
    if (status === 200) {
      yield put(usersAction.fetchUpdateUsersForAdminSuccess(payload))
      yield delay(1000)
      const { location } = history
      const arr = location.pathname.split('/')
      const url = `${arr[0]}/${arr[1]}/${arr[2]}`
      history.replace(url)
      window.location.reload(false)
    } else {
      yield put(usersAction.fetchUpdateUsersForAdminFail(error))
    }
  } catch (e) {
    yield put(usersAction.fetchUpdateUsersForAdminFail(e))
  }
}

function* handleGetUserEditForAdmin({ payload }) {
  try {
    const response = yield call(userApi.getUserEditForAdmin, payload)
    const { status, data, error } = response
    if (status === 200) {
      yield put(authActions.fetchUserEditForAdminSuccess(data))
    } else {
      yield put(authActions.fetchUserEditForAdminFail(error))
    }
  } catch (error) {
    yield put(authActions.fetchUserEditForAdminFail(error))
  }
}

function* rootSaga() {
  yield takeLatest(cadresActions.fetchCadresList.type, getListCadress)
  yield takeLatest(newsAction.fetchListNews.type, getListNews)
  yield takeLatest(newsAction.fetchItem.type, getItemNews)
  yield takeLatest(newsAction.fetchtotalNews.type, getTotalPage)
  yield takeLatest(newsAction.fetchHotNews.type, getHotNews)
  const isLoggedIn = Boolean(localStorage.getItem('authLogin'))
  if (!isLoggedIn) {
    yield takeLatest(authActions.login.type, handleLogin)
  }
  yield takeLatest(authActions.logout.type, handleLogout)
  yield takeLatest(authActions.refreshToken.type, handleRefresh)
  yield takeLatest(newsAction.fetchAddNews.type, handleAddNews)
  // Activity
  yield takeLatest(activityActions.fetchAddActivity.type, handleAddActivity)
  yield takeLatest(activityActions.fetchtotalActivities.type, getTotalActivity)
  yield takeLatest(activityActions.fetchListActivity.type, getListActivities)
  yield takeLatest(activityActions.fetchActivity.type, getActivity)

  yield takeLatest(authActions.getUser.type, handleGetInformationUser)
  yield takeLatest(authActions.updateInfoUser.type, handleUpdateInformationUser)
  yield takeLatest(
    authActions.updateInfoUserEditAdmin.type,
    handleUpdateInformationUserEditAdmin
  )
  yield takeLatest(
    activityActions.fetchRegisterActivityForStudent.type,
    handleRegisterActivityForStudent
  )
  yield takeLatest(activityActions.fetchActivityForUser.type, getActivityForUer)
  yield takeLatest(
    activityActions.fetchTotalActivitiesForUser.type,
    getTotalActivityForUser
  )

  // Get News for admin
  yield takeLatest(newsAction.fetchNewsForAdmin.type, handleGetNewsForAdmin)
  yield takeLatest(newsAction.fetchDeleteNews.type, handleDeleteNews)
  yield takeLatest(newsAction.fetchUpdateNews.type, handleUpdateNews)
  yield takeLatest(
    newsAction.fetchTotalRequestNews.type,
    handleGetTotalRequestNews
  )
  yield takeLatest(
    newsAction.fetchRequestNewsByUser.type,
    handleGetRequestNewsByUser
  )
  yield takeLatest(
    activityActions.fetchTotalActivitiesForUser.type,
    getTotalActivityForUser
  )
  yield takeLatest(
    activityActions.fetchActivityForAdmin.type,
    getActivityForAdmin
  )
  yield takeLatest(activityActions.fetchEditActivity.type, handleEditActivity)
  yield takeLatest(
    activityActions.fetchDeleteActivity.type,
    handleDeleteActivity
  )
  // Get Users for admin
  yield takeLatest(usersAction.fetchUsersForAdmin.type, handleGetUsersForAdmin)

  // Slider
  yield takeLatest(sliderActions.fetchSliderList.type, handleGetSliderList)
  yield takeLatest(sliderActions.fetchCreateSlider.type, handleCreateSlider)
  yield takeLatest(sliderActions.fetchGetSliderByID.type, handleGetSliderById)
  yield takeLatest(sliderActions.fetchUpdateSlider.type, handleUpdateSlider)
  yield takeLatest(sliderActions.fetchDeleteSlider.type, handleDeleteSlider)
  yield takeLatest(
    activityActions.fetchDeleteActivity.type,
    handleDeleteActivity
  )
  yield takeLatest(
    activityActions.fetchTotalRequestActivity.type,
    handleGetTotalRequestActivity
  )
  yield takeLatest(
    usersAction.fetchUpdateUsersForAdmin.type,
    handleUpdateUsersForAdmin
  )
  yield takeLatest(usersAction.fetchDeleteUsers.type, handleDeleteUsers)
  yield takeLatest(
    authActions.fetchUserEditForAdmin.type,
    handleGetUserEditForAdmin
  )
  yield takeLatest(usersAction.fetchAddUsers.type, handleAddUsers)
}

export default rootSaga
