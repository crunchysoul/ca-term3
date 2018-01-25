import React, { Component, Fragment } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");


// source : http://react.tips/reactjs-and-geocoding/

const Map = withScriptjs(withGoogleMap((props) => {
  return (
    <Fragment>
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
      >

        {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} labelStyle={{ backgroundColor: "yellow", fontSize: "50px", padding: "16px" }} />}
      </GoogleMap>
    </Fragment>
  )
}
)
)


export default Map