import React, { Component, Fragment } from "react";
import Link from 'next/link';

class SuccessReset extends Component {
  state = {
    email: null
  };

  setEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { email } = this.state;

  };

  render() {
    return (
      <Fragment>
        <div className="auth-container container-forgot-pwd">
          <div className="auth-card-container card-forgot-pwd">
            <h4 className="text-title">RESET PASSWORD</h4>
            <form id="form" className="form-container" onSubmit={this.handleSubmit}>
              <p className="forgot-pwd-txt">Success to change your password.</p>
              <Link href='/login'><a className="btn btn-dark button-login">Try Login ?</a></Link>
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default SuccessReset;
