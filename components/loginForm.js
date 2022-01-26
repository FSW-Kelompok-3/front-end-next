/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';
import router from 'next/router';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import Link from 'next/link';
import { setBtnLoading, setBtnNotLoading } from '../redux/actions/buttonActions';
import { setUserLogin } from '../redux/actions/authActions';
import { getCurrentUserId } from '../redux/actions/CurrentUserIdAction';
import { FormErrors } from './FormErrors';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      formErrors: { username: '', password: '' },
      usernameCheck: false,
      passwordValid: false,
      formValid: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.submitLoginForm = this.submitLoginForm.bind(this);
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
    // eslint-disable-next-line react/destructuring-assignment
    this.props.setBtnLoading();
  };

  handleSendForm = () => {
    const {
      setBtnLoading,
      setBtnNotLoading,
      setUserLogin,
      getCurrentUserId,
    } = this.props;
    const { username, password } = this.state;
    setBtnLoading();
    axios
      .post('https://api-kel3.herokuapp.com/auth/login', {
        username,
        password,
      })
      .then((res) => {
        setBtnNotLoading();
        console.log(res);
        localStorage.setItem('token', res.data.accessToken);
        setUserLogin();
        getCurrentUserId(localStorage.token);
        swal({
          title: 'Success!',
          text: 'Login Berhasil',
          icon: 'success',
        });
        router.push('/');
      })
      .catch((error) => {
        console.log(error);
        // alert("username atau password salah");
        swal({
          title: 'Failed!',
          text: 'Username atau Password Salah',
          icon: 'error',
        });
        setBtnNotLoading();
      });
  };

  // eslint-disable-next-line react/no-unused-class-component-methods
  handleSubmit = async () => {
    this.handleLoading();
    await this.handleSendForm();
    setBtnNotLoading();
  };

  submitLoginForm(e) {
    e.preventDefault();
    if (this.validateField()) {
      alert('Form submitted');
    }
  }

  validateForm() {
    const { usernameCheck, passwordValid } = this.state;
    this.setState({ formValid: usernameCheck && passwordValid });
  }

  validateField(fieldName, value) {
    const { formErrors } = this.state;
    const fieldValidationErrors = formErrors;
    let { usernameCheck } = this.state;
    let { passwordValid } = this.state;

    switch (fieldName) {
      case 'username':
        usernameCheck = value.length >= 1;
        fieldValidationErrors.username = usernameCheck ? '' : ' required';
        break;
      case 'password':
        passwordValid = value.length >= 3;
        fieldValidationErrors.password = passwordValid ? '' : ' is too short';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      usernameCheck,
      passwordValid,
    }, this.validateForm);
  }

  render() {
    const {
      formErrors, username, password, formValid,
    } = this.state;
    const { isLoading } = this.props;
    return (
      <div className="auth-container">
        <div className="auth-card-container">
          <h4 className="text-title">Sign In</h4>
          <div className="panel panel-default">
            <FormErrors formErrors={formErrors} />
          </div>
          <form id="form" className="form-container" onSubmit={this.submitLoginForm}>
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
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                value={password}
                onChange={this.handleUserInput}
              />
              <Link href="/forgot-password">
                <a href="/forgot-password" className="link-style link-forgot-pwd">Forgot password?</a>
              </Link>
            </div>
            <Button
              className="btn btn-dark button-login"
              disabled={!formValid}
              onClick={!isLoading ? this.handleSendForm : null}
            >
              {isLoading ? 'Loading…' : 'SUBMIT'}
            </Button>
            <Link href="/register">
              <a href="/register" className="link-style link-register">Don&apos;t have an account? Sign Up</a>
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToPros = (state) => ({
  isLoading: state.isLoading,
  isLoggedIn: state.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  setBtnLoading: () => dispatch(setBtnLoading()),
  setBtnNotLoading: () => dispatch(setBtnNotLoading()),
  setUserLogin: () => dispatch(setUserLogin()),
  getCurrentUserId: (token) => dispatch(getCurrentUserId(token)),
});

const ConnectLogin = connect(mapStateToPros, mapDispatchToProps)(Login);

export default ConnectLogin;
