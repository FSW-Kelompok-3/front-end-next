import React, { Component } from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';
import router from 'next/router';
import swal from 'sweetalert';

import { FormErrors } from './FormErrors';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      isLoading: false,
      formErrors: {
        username: '', password: '', email: '', nama: '', umur: '',
      },
      usernameCheck: false,
      emailValid: false,
      passwordValid: false,
      nameCheck: false,
      umurCheck: false,
      formValid: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.submitRegisterForm = this.submitRegisterForm.bind(this);
  }

  async componentDidMount() {
    const { isLoading } = this.state;
    if (isLoading) {
      // eslint-disable-next-line no-undef
      simulateNetworkRequest().then(() => {
        this.setState({ isLoading: false });
      });
    }
  }

  handleUserInput = (e) => {
    const { name } = e.target;
    const { value } = e.target;
    this.setState(
      { [name]: value },
      () => { this.validateField(name, value); },
    );
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleLoading = () => {
    this.setState({ isLoading: true });
  };

  handleSendForm = () => {
    const { email } = this.state;
    axios
      .post('https://api-kel3.herokuapp.com/forgot-password', {
        email,
      })
      .then((res) => {
        console.log(res);
        swal({
          title: 'Success!',
          text: 'Berhasil Mengirim E-Mail Link Reset Password',
          icon: 'success',
        });
        router.push('/');
      })
      .catch((error) => {
        console.log(error);
        swal({
          title: 'Failed!',
          text: 'E-mail Tidak Terdaftar',
          icon: 'error',
        });
        this.setState({ isLoading: false });
      });
  };

  handleSubmit = () => {
    this.handleLoading();
    this.handleSendForm();
  };

  validateForm() {
    const { emailValid } = this.state;
    this.setState({ formValid: emailValid });
  }

  validateField(fieldName, value) {
    const { formErrors } = this.state;
    const fieldValidationErrors = formErrors;
    const { usernameCheck } = this.state;
    let { emailValid } = this.state;
    const { passwordValid } = this.state;
    const { nameCheck } = this.state;
    const { umurCheck } = this.state;

    switch (fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid format';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      usernameCheck,
      emailValid,
      passwordValid,
      nameCheck,
      umurCheck,
    }, this.validateForm);
  }

  submitRegisterForm(e) {
    e.preventDefault();
    if (this.validateField()) {
      alert('Form submitted');
    }
  }

  render() {
    const {
      formErrors, email, formValid, isLoading,
    } = this.state;
    return (
      <div className="auth-container">
        <div className="auth-card-container">
          <h4 className="text-title">Forgot Password</h4>
          <p className="forgot-pwd-txt">Please Fill Your E-mail Below </p>
          <div className="panel panel-default">
            <FormErrors formErrors={formErrors} />
          </div>
          <form id="form" className="form-container" onSubmit={this.submitRegisterForm}>
            <div className="mb-3">
              <input
                type="email"
                required
                className="form-control"
                name="email"
                placeholder="Email"
                value={email}
                onChange={this.handleUserInput}
              />
            </div>
            <Button
              className="btn btn-dark button-login"
              disabled={!formValid}
              onClick={!isLoading ? this.handleSubmit : null}
            >
              {isLoading ? 'Loading…' : 'SUBMIT'}
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
