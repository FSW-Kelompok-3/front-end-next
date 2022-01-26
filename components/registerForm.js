import React, { Component } from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';
import router from 'next/router';
import swal from 'sweetalert';
import Link from 'next/link';
import { FormErrors } from './FormErrors';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      nama: '',
      umur: '',
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
    const {
      username, email, password, nama, umur,
    } = this.state;
    axios
      .post('https://api-kel3.herokuapp.com/auth/register', {
        username,
        email,
        password,
        nama,
        umur,
      })
      .then((res) => {
        console.log(res);
        swal({
          title: 'Success!',
          text: 'Register Berhasil',
          icon: 'success',
        });
        router.push('/login');
      })
      .catch((error) => {
        console.log(error);
        swal({
          title: 'Failed!',
          text: 'Username atau Email Telah Terdaftar',
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
    const {
      usernameCheck, passwordValid, emailValid, nameCheck, umurCheck,
    } = this.state;
    this.setState({
      formValid: usernameCheck && passwordValid && emailValid && nameCheck && umurCheck,
    });
  }

  validateField(fieldName, value) {
    const { formErrors } = this.state;
    const fieldValidationErrors = formErrors;
    let { usernameCheck } = this.state;
    let { emailValid } = this.state;
    let { passwordValid } = this.state;
    let { nameCheck } = this.state;
    let { umurCheck } = this.state;

    switch (fieldName) {
      case 'username':
        usernameCheck = value.length >= 1;
        fieldValidationErrors.username = usernameCheck ? '' : ' required';
        break;
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid format';
        break;
      case 'password':
        passwordValid = value.length >= 3;
        fieldValidationErrors.password = passwordValid ? '' : ' is too short';
        break;
      case 'nama':
        nameCheck = value.length >= 1;
        fieldValidationErrors.nama = nameCheck ? '' : ' required';
        break;
      case 'umur':
        umurCheck = value.match(/^[0-9]*$/);
        fieldValidationErrors.umur = umurCheck ? '' : ' is invalid format';
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
      formErrors, username, email, password, nama, umur, formValid, isLoading,
    } = this.state;
    return (
      <div className="auth-container">
        <div className="auth-card-container">
          <h4 className="text-title">Sign Up</h4>
          <div className="panel panel-default">
            <FormErrors formErrors={formErrors} />
          </div>
          <form id="form" className="form-container" onSubmit={this.submitRegisterForm}>
            <div className="mb-3">
              <input
                type="username"
                required
                className="form-control"
                name="username"
                placeholder="Username"
                value={username}
                onChange={this.handleUserInput}
              />
            </div>
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
                type="nama"
                required
                className="form-control"
                name="nama"
                placeholder="Nama"
                value={nama}
                onChange={this.handleUserInput}
              />
            </div>
            <div className="mb-3">
              <input
                type="umur"
                required
                className="form-control"
                name="umur"
                placeholder="Umur"
                value={umur}
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
            <Link href="/login">
              <a href="/login" className="link-style link-register">Already have an account? Sign In</a>
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
