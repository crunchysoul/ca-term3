import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {Layout, Form, Icon, Input, Button} from "antd";

import {SignUpLink} from "./SignUp";
import {PasswordForgetLink} from "./PasswordForget.js";
import {auth} from "../firebase";
import * as routes from "../constants/routes";

import "./SignIn.css";

const FormItem = Form.Item;

const SignInPage = ({history}) => (
  <Layout style={{padding: "0 24px 24px"}}>
    <div className="login-form">
      <h1>Log In</h1>
      <SignInForm history={history} />
      <PasswordForgetLink className="login-form-forgot" />
      <SignUpLink className="login-form-forgot" />
    </div>
  </Layout>
);

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
};

// function hasErrors(fieldsError) {
//   return Object.keys(fieldsError).some(field => fieldsError[field]);
// }

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = {...INITIAL_STATE};
  }

  onSubmit = event => {
    const {email, password} = this.state;

    const {history} = this.props;

    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({...INITIAL_STATE}));
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey("error", error));
      });

    event.preventDefault();
  };

  render() {
    const {email, password, error} = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <Form onSubmit={this.onSubmit}>
        <FormItem>
          <Input
            prefix={<Icon type="mail" style={{color: "rgba(0,0,0,.25)"}} />}
            value={email}
            onChange={event =>
              this.setState(byPropKey("email", event.target.value))
            }
            type="text"
            placeholder="Email Address"
          />
        </FormItem>

        <FormItem>
          <Input
            prefix={<Icon type="lock" style={{color: "rgba(0,0,0,.25)"}} />}
            value={password}
            onChange={event =>
              this.setState(byPropKey("password", event.target.value))
            }
            type="password"
            placeholder="Password"
          />
        </FormItem>

        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            disabled={isInvalid}
            className="login-form-button"
          >
            Log In
          </Button>
        </FormItem>

        {error && <p className="login-form-error">{error.message}</p>}
      </Form>
    );
  }
}

export default withRouter(SignInPage);

export {SignInForm};
