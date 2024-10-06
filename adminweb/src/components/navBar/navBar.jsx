import React from 'react'
import './navBar.css'
const navBar = () => {
  return (
    <div className='navBar'>
        <div className='navBarCointainer'>
            <div className='navBarCointainerLeft'>
            <img 
                src='/nft-image-1.png' 
                alt='logo'
                className='navBarLogo'
                />
            <h2>BOOKING</h2>
            </div>
            <div className='navBarInputSearch'>

            </div>
            <div className='navBarRight'>
                <div className='navBarNotification'>

                </div>
                <div className='navBarProfile'>

                </div>
            </div>
        </div>
    </div>
  )
}

export default navBar