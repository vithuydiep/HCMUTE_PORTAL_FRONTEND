import CadresSlide from './reducers/CadresSlide'
import DrawerReducer from './reducers/DrawerSlide'
import LoadingSlide from './reducers/LoadingSlide'
import NewsSlice from './reducers/NewsSlice'
import UsersSlice from './reducers/UsersSlice'
import authReducer from './reducers/AuthReducer'
import EditorSlice from './reducers/EditorSlice'
import Activity from './reducers/ActivityReducer'
import SliderReducer from './reducers/SliderReducer'

const reducer = {
  drawer: DrawerReducer,
  listCadres: CadresSlide,
  loading: LoadingSlide,
  news: NewsSlice,
  Auth: authReducer,
  editor: EditorSlice,
  activities: Activity,
  users: UsersSlice,
  slider: SliderReducer,
}

export default reducer
