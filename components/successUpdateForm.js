import React, { Component, Fragment } from "react";
import Link from 'next/link';

class SuccessUpdate extends Component {
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
            <h4 className="text-title">Edit Player</h4>
            <form id="form" className="form-container" onSubmit={this.handleSubmit}>
              <p className="forgot-pwd-txt">Success to change your profile.</p>
              <div className="mb-3">
              <Link href='/'><a className="btn btn-dark button-login">Back To Home</a></Link>
              </div>
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default SuccessUpdate;
