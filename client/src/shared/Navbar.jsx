import React from 'react'
import {Link,NavLink, withRouter } from 'react-router-dom'
import '../utilities/my.css'

const Navbar  = (props) => {
    //setTimeout(() =>{
       // props.history.push('about')
   //},2000)
    return(
<nav className="nav-wrapper ">
      <div className="container">
        
          <ul >
         
              <li><Link to="/home">Home</Link></li>
              <li><NavLink to="/search">Search in FeedBack</NavLink></li>
          
          </ul>
      </div>
  </nav>
    )
  
}

export default  withRouter(Navbar)