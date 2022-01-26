import React, { Component } from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';
import router from 'next/router';
import swal from 'sweetalert';
import { FormErrors } from './FormErrors';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmP: '',
      isLoading: false,
      formErrors: {
        username: '', password: '', email: '', nama: '', umur: '',
      },
      passwordValid: false,
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
    const { password, confirmP } = this.state;
    const { id, token } = router.query;
    axios
      .post(`https://api-kel3.herokuapp.com/reset-password/${id}/${token}`, {
        password,
        confirmP,
      }, { headers: { 'content-type': 'application/json;charset=UTF-8', Authorization: localStorage.getItem('token') } })
      .then((res) => {
        console.log(res);
        swal({
          title: 'Success!',
          text: 'Success Reset Password',
          icon: 'success',
        });
        router.push('/');
      })
      .catch((error) => {
        console.log(error);
        swal({
          title: 'Failed!',
          text: 'Password And Confirm Password is not same',
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
    const { passwordValid, confirmPValid } = this.state;
    this.setState({
      formValid: passwordValid
      && confirmPValid,
    });
  }

  validateField(fieldName, value) {
    const { formErrors } = this.state;
    const fieldValidationErrors = formErrors;
    let { passwordValid } = this.state;
    let { confirmPValid } = this.state;

    switch (fieldName) {
      case 'password':
        passwordValid = value.length >= 3;
        fieldValidationErrors.password = passwordValid ? '' : ' is too short';
        break;
      case 'confirmP':
        confirmPValid = value.length >= 3;
        fieldValidationErrors.password = confirmPValid ? '' : ' is too short';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      passwordValid,
      confirmPValid,
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
      formErrors, password, confirmP, formValid, isLoading,
    } = this.state;
    return (
      <div className="auth-container">
        <div className="auth-card-container">
          <h4 className="text-title">Reset Password</h4>
          <div className="panel panel-default">
            <FormErrors formErrors={formErrors} />
          </div>
          <form id="form" className="form-container" onSubmit={this.submitRegisterForm}>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                value={password}
                onChange={this.handleUserInput}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                required
                className="form-control"
                name="confirmP"
                placeholder="Confirm Password"
                value={confirmP}
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

export default ResetPassword;
