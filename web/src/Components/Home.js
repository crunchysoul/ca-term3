import React from "react";
import {Layout, List, Pagination} from "antd";
import {connect} from "react-redux";
import {compose} from "recompose";
import withAuthorization from "./withAuthorization.js";
import {db} from "../firebase";

const {Content} = Layout;

class HomePage extends React.Component {
  componentDidMount() {
    const {onSetUsers} = this.props;

    db.onceGetUsers().then(snapshot => onSetUsers(snapshot.val()));
  }

  render() {
    const {users} = this.props;

    return (
      <Content
        style={{
          background: "#fff",
          padding: "0 50px",
          marginTop: 64,
          minHeight: 280,
        }}
      >
        <h1>Home Page</h1>
        <p>The Home Page is accessible by every signed in user.</p>
        {!!users && <UserList users={users} />}
      </Content>
    );
  }
}

const UserList = ({users}) => (
  // <Content
  //   style={{
  //     background: "#fff",
  //     padding: "0 50px",
  //     marginTop: 64,
  //     minHeight: 280,
  //   }}
  // >
  <List
    dataSource={users}
    bordered
    header={
      <div>
        <h2>List of Usernames of Users</h2>{" "}
        <p>(Saved on Sign Up in Firebase Database)</p>
      </div>
    }
  >
    {Object.keys(users).map(key => (
      <List.Item key={key}>{users[key].username}</List.Item>
    ))}
    <Pagination />
  </List>
  // </Content>
);

const mapStateToProps = state => ({
  users: state.userState.users,
});

const mapDispatchToProps = dispatch => ({
  onSetUsers: users => dispatch({type: "USERS_SET", users}),
});

const authCondition = authUser => !!authUser;

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps),
)(HomePage);
