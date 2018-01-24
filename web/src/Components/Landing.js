import React from 'react'
import { showcase, button } from '../style/LandingPage.css'
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import { Layout } from 'antd';
import * as routes from "../constants/routes.js";
const { Content } = Layout;


const landingPage = () => {
  return (
    <Content>
      <div className="showcase">
        <h1>Welcome To Seamless Order Tracking API</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi officiis ipsum officia numquam expedita ullam.</p>
        <Link to={routes.PRODUCTS} className="button">SIGN IN</Link>
      </div>
    </Content>

  )

}

export default landingPage
