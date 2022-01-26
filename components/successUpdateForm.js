import React, { Component } from 'react';
import Link from 'next/link';

// eslint-disable-next-line react/prefer-stateless-function
class SuccessUpdate extends Component {
  render() {
    return (
      <div className="auth-container container-forgot-pwd">
        <div className="auth-card-container card-forgot-pwd">
          <h4 className="text-title">Edit Player</h4>
          <form id="form" className="form-container">
            <p className="forgot-pwd-txt">Success to change your profile.</p>
            <div className="mb-3">
              <Link href="/"><a href="/" className="btn btn-dark button-login">Back To Home</a></Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SuccessUpdate;
