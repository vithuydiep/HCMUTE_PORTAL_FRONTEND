import { GlobalLoading } from 'components/layout'
import { ConfirmProvider } from 'material-ui-confirm'
import React from 'react'
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ROUTES from 'utils/routes'
import './App.css'
import configureStore from './store'
import history from './helper/history'

const store = configureStore()

function App() {
  return (
    <IntlProvider>
      <ConfirmProvider>
        <Provider store={store}>
          <div className="App">
            <Router history={history}>
              <Switch>
                {ROUTES.map((route) => {
                  return (
                    <Route
                      key={route.path}
                      exact={route.exact}
                      path={route.path}
                      component={route.component}
                    />
                  )
                })}
              </Switch>
            </Router>
          </div>
          <ToastContainer hideProgressBar />
          <GlobalLoading />
        </Provider>
      </ConfirmProvider>
    </IntlProvider>
  )
}

export default App
