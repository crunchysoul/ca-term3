import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom'
import * as routes from "../constants/routes.js";
import Map from './MapUsingPosition'
import { leftCol, rightCol } from '../style/Delivery.css'

const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");

class Delivery extends Component {

  state = {

    username: '',
    userLocation: {
      lat: '',
      lng: ''
    },
    shops: [],
    selectedShop: {},
    selectedShopLocation: {
      lat: '',
      lng: ''
    },
    distance: '',
    duration: '',
    durationSeconds: undefined,
    items: [],
    specialInstructions: '',
    notification: {
      add: false,
      delete: false,
      error: false,
      form: false,
      additionalInfo: false,
      userLocation: false
    },
    methodOfTrans: '',
    methodOfTransShow: true,
    pickupTime: true,
    expectedPickupTime: '',
    favorite: false,
    paymentInfo: {
      nameOnCard: '',
      cardNumber: undefined,
      expMonth: '',
      expYear: '',
      cvv: undefined
    },
    previousOrders: [],
    favoriteOrders: [],
    menuShow: false,



    dummySentences: [
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
      'Donec hendrerit tempor tellus.',
      'Donec pretium posuere tellus.',
      'Proin quam nisl, tincidunt et, mattis eget, convallis nec, purus.',
      'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
      'Nulla posuere.',
      'Donec vitae dolor.',
      'Nullam tristique diam non turpis.',
      'Cras placerat accumsan nulla.',
      'Nullam rutrum.',
      'Nam vestibulum accumsan nisl.'
    ]
  }

  render() {
    const { dummySentences } = this.state
    return (


      <div className="orderConfirmation">

        <Row gutter={8} style={{ minHeight: '100vh' }}>
          <Col sm={12} md={16} className="leftCol">
            {/* <img src={'http://i.imgur.com/O2EOCxf.png'} alt={'Map Example'} /> */}
            <Map
              isMarkerShown
              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `600px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </Col>
          {/* <Col sm={12} md={16}>
          </Col> */}
          <Col sm={12} md={8} className="rightCol">
            <p className='height'>{dummySentences}</p>
            <br />
            <Link to={routes.PRODUCTS} className="button">Order Received</Link>
            {/* <Button className="orderConfirmationButton">Order Received</Button> */}
          </Col>

        </Row>

      </div >
    )
  }
}
export default Delivery