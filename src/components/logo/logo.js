import React from 'react'
import imgUrl from './logo.png'
import './logo.css'

class Logo extends React.Component{
  render() {
    return(
      <div className="logo-container">
        <img src={imgUrl} alt="logo"/>
      </div>
    )
  }
}

export default Logo