import React from "react";
import {connect} from "react-redux";
import {compose} from "recompose";
import {Layout} from "antd";
import PasswordChangeForm from "./PasswordChange.js";
import withAuthorization from "./withAuthorization.js";

const AccountPage = ({authUser}) => (
  <Layout style={{padding: "0 24px 24px"}}>
    <h1>Accout Page</h1>
    <p>Accout: {authUser.email}</p>
    <div className="login-form">
      <h1>Change Password</h1>
      <PasswordChangeForm />
    </div>
  </Layout>
);

const mapStateToProps = state => ({authUser: state.sessionState.authUser});

const authCondition = authUser => !!authUser;

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps),
)(AccountPage);
