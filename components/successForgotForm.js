import React, { Component } from 'react';

// eslint-disable-next-line react/prefer-stateless-function
class SuccessForgot extends Component {
  render() {
    return (
      <div className="auth-container container-forgot-pwd">
        <div className="auth-card-container card-forgot-pwd">
          <h4 className="text-title">FORGOT PASSWORD</h4>
          <form id="form" className="form-container">
            <p className="forgot-pwd-txt">We already send you an email to change your password.</p>
            <div className="mb-3" />
          </form>
        </div>
      </div>
    );
  }
}

export default SuccessForgot;
