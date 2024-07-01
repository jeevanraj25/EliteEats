import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'

export const AppDownload = () => {
  return (
    <div className='app-download' id= 'app-download'>
        <p>for better Experince Download <br/> Biteful</p> 
        <div className="app-downlaod-platforms">
            <img src={assets.play_store} alt="" />
            <img src={assets.app_store} alt="" />
        </div>      
    </div>
  )
}
