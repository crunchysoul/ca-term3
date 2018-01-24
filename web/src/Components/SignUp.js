import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import {Layout} from "antd";
import {Form, Icon, Input, Button} from "antd";

import {auth, db} from "../firebase";
import * as routes from "../constants/routes";

const FormItem = Form.Item;

const SignUpPage = ({history}) => (
  <Layout style={{padding: "0 24px 24px"}}>
    <div className="login-form">
      <h1>Sign Up</h1>
      <SignUpForm history={history} />
    </div>
  </Layout>
);

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null,
};

const byPropKey = (propName, propValue) => () => ({
  [propName]: propValue,
});

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...INITIAL_STATE,
    };
  }

  onSubmit = event => {
    const {username, email, passwordOne} = this.state;

    const {history} = this.props;

    auth
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        db
          .doCreateUser(authUser.uid, username, email)
          .then(() => {
            this.setState(...INITIAL_STATE);
            history.push(routes.HOME);
          })
          .catch(error => {
            this.setState(byPropKey("error", error));
          });
      })
      .catch(error => {
        this.setState(byPropKey("error", error));
      });

    event.preventDefault();
  };

  render() {
    const {username, email, passwordOne, passwordTwo, error} = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";

    return (
      <Form onSubmit={this.onSubmit}>
        <FormItem>
          <Input
            prefix={<Icon type="mail" style={{color: "rgba(0,0,0,.25)"}} />}
            type="text"
            value={username}
            placeholder="Full Name"
            onChange={event =>
              this.setState(byPropKey("username", event.target.value))
            }
          />
        </FormItem>
        <FormItem>
          <Input
            prefix={<Icon type="mail" style={{color: "rgba(0,0,0,.25)"}} />}
            type="text"
            value={email}
            placeholder="Email Address"
            onChange={event =>
              this.setState(byPropKey("email", event.target.value))
            }
          />
        </FormItem>
        <FormItem>
          <Input
            prefix={<Icon type="mail" style={{color: "rgba(0,0,0,.25)"}} />}
            type="text"
            value={passwordOne}
            placeholder="Password"
            onChange={event =>
              this.setState(byPropKey("passwordOne", event.target.value))
            }
          />
        </FormItem>
        <FormItem>
          <Input
            prefix={<Icon type="mail" style={{color: "rgba(0,0,0,.25)"}} />}
            type="text"
            value={passwordTwo}
            placeholder="Confirm Password"
            onChange={event =>
              this.setState(byPropKey("passwordTwo", event.target.value))
            }
          />
        </FormItem>

        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            disabled={isInvalid}
            className="login-form-button"
          >
            Sign Up
          </Button>
        </FormItem>

        {error && <p className="login-form-error">{error.message}</p>}
      </Form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>
);

export default withRouter(SignUpPage);

export {SignUpForm, SignUpLink};
