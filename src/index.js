import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import Login from './containers/login/login'
import Register from './containers/register/register'
import AuthRoute from './components/authroute/authroute'
import 'antd-mobile/dist/antd-mobile.css'

ReactDOM.render(
  (<BrowserRouter>
    <div>
      <AuthRoute />
      <Route path='/login' component={Login}/>
      <Route path='/register' component={Register}/>
    </div>
  </BrowserRouter>),
  document.getElementById('root')
);
