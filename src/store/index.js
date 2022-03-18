// Store Configuration: create store, applyMiddleware, etc
import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import { configureStore } from '@reduxjs/toolkit'
import reducer from './rootReducers'
import mySaga from './sagas'

const sagaMiddleware = createSagaMiddleware()

const createstore = () => {
  const middlewares = [thunk, sagaMiddleware]
  const enhancers = [applyMiddleware(...middlewares)]
  const store = configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production',
    enhancers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  })
  sagaMiddleware.run(mySaga)
  return store
}

export default createstore
