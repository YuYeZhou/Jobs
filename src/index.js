import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import Login from './containers/login/login'
import Register from './containers/register/register'
import 'antd-mobile/dist/antd-mobile.css'

ReactDOM.render(
  (<BrowserRouter>
    <div>
      <Route path='/login' component={Login}/>
      <Route path='/register' component={Register}/>
    </div>
  </BrowserRouter>),
  document.getElementById('root')
);
registerServiceWorker();
