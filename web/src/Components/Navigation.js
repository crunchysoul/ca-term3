import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";

import SignOutButton from "./SignOut";
import * as routes from "../constants/routes";

const { Header } = Layout;

const Navigation = ({ authUser }) => (
  <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
);

const NavigationAuth = () => (
  <Layout>
    <Header style={{ position: "fixed", width: "100%" }}>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        style={{ lineHeight: "64px" }}
      >
        <Menu.Item key="1">
          {/* <Link to={routes.LANDING}>
            <Icon type="rocket" />
            <span className="nav-text">Landing</span>
          </Link> */}
        </Menu.Item>
        <Menu.Item key="2">
          <Link to={routes.HOME}>
            <Icon type="home" />
            <span className="nav-text">Home</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to={routes.PRODUCTS}>
            <Icon type="home" />
            <span className="nav-text">Products</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to={routes.ACCOUNT}>
            <Icon type="user" />
            <span className="nav-text">Account</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="5">
          <Link to={routes.ADMIN}>
            <Icon type="key" />
            <span className="nav-text">Admin</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="6">
          <Icon type="key" />
          <span className="nav-text">
            <SignOutButton />
          </span>
        </Menu.Item>
      </Menu>
    </Header>
  </Layout>
);

const NavigationNonAuth = () => (
  <Menu
    theme="dark"
    mode="horizontal"
    defaultSelectedKeys={["2"]}
    style={{ lineHeight: "64px" }}
  >
    <Menu.Item key="1">
      <Link to={routes.LANDING}>
        <Icon type="rocket" />
        <span className="nav-text">Landing</span>
      </Link>
    </Menu.Item>
    <Menu.Item key="2">
      <Link to={routes.SIGN_IN}>
        <Icon type="login" />
        <span className="nav-text">Sign In</span>
      </Link>
    </Menu.Item>
  </Menu>
);

const mapStateToProps = state => ({ authUser: state.sessionState.authUser });

export default connect(mapStateToProps)(Navigation);
