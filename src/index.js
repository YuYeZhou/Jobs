import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import GeniusInfo from './containers/geniusinfo/geniusinfo'
import BossInfo from './containers/bossinfo/bossinfo'
import Login from './containers/login/login'
import Register from './containers/register/register'
import AuthRoute from './components/authroute/authroute'
import Chat from './components/chat/chat'
import Dashbroad from './components/dashbroad/dashbroad'
import 'antd-mobile/dist/antd-mobile.css'
import reducers from './reducer'
import './config'

const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension?window.devToolsExtension():f => f
))

ReactDOM.render(
  (<Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRoute />
        <Switch>
          <Route path='/geniusinfo' component={GeniusInfo}/>
          <Route path='/bossinfo' component={BossInfo}/>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
          <Route path='/chat/:user' component={Chat}/>
          <Route component={Dashbroad}/>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>),
  document.getElementById('root')
);
