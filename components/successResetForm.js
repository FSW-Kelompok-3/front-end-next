import React, { Component } from 'react';
import Link from 'next/link';

// eslint-disable-next-line react/prefer-stateless-function
class SuccessReset extends Component {
  render() {
    return (
      <div className="auth-container container-forgot-pwd">
        <div className="auth-card-container card-forgot-pwd">
          <h4 className="text-title">RESET PASSWORD</h4>
          <form id="form" className="form-container">
            <p className="forgot-pwd-txt">Success to change your password.</p>
            <Link href="/login"><a href="/login" className="btn btn-dark button-login">Try Login ?</a></Link>
          </form>
        </div>
      </div>
    );
  }
}

export default SuccessReset;
