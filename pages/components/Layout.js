import React from 'react'
import Header from './Header'


const Layout = (props) => {
    return (
        <div class='bg-main'>
              {/* <Header/> */}
              <div>
                {props.children}
              </div>
            
        </div>
    )
}

export default Layout
