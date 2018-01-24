import React from 'react'
import { showcase, button } from '../style/LandingPage.css'
import { Link } from 'react-router-dom'
import { Layout } from 'antd';
const { Content } = Layout;


const landingPage = () => {
  return (
    <Content>
      <div className="showcase">
        <h1>Welcome To Xiao Ping Gao</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi officiis ipsum officia numquam expedita ullam.</p>
        <Link to="/signin" className="button">SIGN IN</Link>
      </div>
    </Content>

  )

}

export default landingPage
