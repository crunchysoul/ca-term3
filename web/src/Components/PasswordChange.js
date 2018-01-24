import React from "react";
import {Form, Icon, Input, Button} from "antd";
import {auth} from "../firebase";
import "./Account.css";

const FormItem = Form.Item;

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  passwordOne: "",
  passwordTwo: "",
  error: null,
};

class PasswordChangeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE,
    };
  }

  onSubmit = event => {
    const {passwordOne} = this.state;

    auth
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({...INITIAL_STATE});
      })
      .catch(error => {
        this.setState(byPropKey("error", error));
      });

    event.preventDefault();
  };

  render() {
    const {passwordOne, passwordTwo, error} = this.state;
    const isInvalid = passwordOne !== passwordTwo || passwordOne === "";

    return (
      <Form onSubmit={this.onSubmit}>
        <FormItem>
          <Input
            prefix={<Icon type="lock" style={{color: "rgba(0,0,0,.25)"}} />}
            value={passwordOne}
            type="password"
            placeholder="New Password"
            onChange={event =>
              this.setState(byPropKey("passwordOne", event.target.value))
            }
          />
        </FormItem>

        <FormItem>
          <Input
            prefix={<Icon type="lock" style={{color: "rgba(0,0,0,.25)"}} />}
            value={passwordTwo}
            type="password"
            placeholder="Confirm New Password"
            onChange={event =>
              this.setState(byPropKey("passwordTwo", event.target.value))
            }
          />
        </FormItem>

        <FormItem>
          <Button
            disabled={isInvalid}
            type="primary"
            htmlType="submit"
            className="account-form-button"
          >
            Reset My Password
          </Button>
        </FormItem>

        {error && <p className="account-form-error">{error.message}</p>}
      </Form>
    );
  }
}

export default PasswordChangeForm;
