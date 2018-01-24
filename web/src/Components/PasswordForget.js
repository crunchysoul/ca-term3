import React from "react";
import {Link} from "react-router-dom";
import {Layout, Form, Icon, Input, Button} from "antd";
import {auth} from "../firebase";

const FormItem = Form.Item;

const PasswordForgetPage = () => (
  <Layout style={{padding: "0 24px 24px"}}>
    <div className="login-form">
      <h1>Reset Password</h1>
      <PasswordForgetForm />
    </div>
  </Layout>
);

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: "",
  error: null,
};

class PasswordForgetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE,
    };
  }

  onSubmit = event => {
    const {email} = this.state;

    auth
      .doPasswordReset(email)
      .then(() => {
        this.setState({...INITIAL_STATE});
      })
      .catch(error => {
        this.setState(byPropKey("error", error));
      });

    event.preventDefault();
  };

  render() {
    const {email, error} = this.state;

    const isInvalid = email === "";

    return (
      <Form onSubmit={this.onSubmit}>
        <FormItem>
          <Input
            prefix={<Icon type="user" style={{color: "rgba(0,0,0,.25)"}} />}
            type="text"
            value={this.state.email}
            placeholder="Email Address"
            onChange={event =>
              this.setState(byPropKey("email", event.target.value))
            }
          />
        </FormItem>

        <FormItem>
          <Button
            disabled={isInvalid}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Rest My Password
          </Button>
        </FormItem>

        {error && <p className="login-form-error">{error.message}</p>}
      </Form>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to="/pw-forget">Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

export {PasswordForgetForm, PasswordForgetLink};
