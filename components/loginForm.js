import React, { Component, Fragment } from "react";
import { Button } from "reactstrap";
import axios from "axios";
import router from "next/router";
import { connect } from "react-redux";
import { setBtnLoading, setBtnNotLoading } from "../redux/actions/buttonActions";
import { setUserLogin } from "../redux/actions/authActions";
import { getCurrentUserId } from "../redux/actions/CurrentUserIdAction";
import { FormErrors } from './FormErrors';
import swal from 'sweetalert';

import Link from "next/link";

class Login extends Component {
  state = {
    username: "",
    password: "",
  };
  
  constructor (props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      formErrors: {username: '', password: ''},
      usernameCheck: false,
      passwordValid: false,
      formValid: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.submitLoginForm = this.submitLoginForm.bind(this);
  }

  submitLoginForm(e) {
    e.preventDefault();
    if (this.validateField()) {
        alert("Form submitted");
    }

  }
  

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let usernameCheck = this.state.usernameCheck;
    let passwordValid = this.state.passwordValid;

    switch(fieldName) {
      case 'username':
        usernameCheck = value.length >= 1;
        fieldValidationErrors.username = usernameCheck ? '' : ' required';
        break;
      case 'password':
        passwordValid = value.length >= 3;
        fieldValidationErrors.password = passwordValid ? '': ' is too short';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    usernameCheck: usernameCheck,
                    passwordValid: passwordValid
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.usernameCheck && this.state.passwordValid});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleLoading = () => {
    this.props.setBtnLoading();
  };

  handleSendForm = () => {
    this.props.setBtnLoading();
    axios
      .post("https://api-kel3.herokuapp.com/auth/login", {
        username: this.state.username,
        password: this.state.password,
      })
      .then((res) => {
        this.props.setBtnNotLoading();
        console.log(res);
        localStorage.setItem("token", res.data.accessToken);
        this.props.setUserLogin();
        this.props.getCurrentUserId(localStorage.token);
        swal({
          title: "Success!",
          text: "Login Berhasil",
          icon: "success"
        })
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
        // alert("username atau password salah");
        swal({
          title: "Failed!",
          text: "Username atau Password Salah",
          icon: "error"
        })
        this.props.setBtnNotLoading();
      });
  };

  handleSubmit = async () => {
    this.handleLoading();
    await this.handleSendForm();
    this.props.setBtnNotLoading();
  };

  render() {
    return (
      <Fragment>
        <div className="auth-container">
          <div className="auth-card-container">
            <h4 className="text-title">Log In</h4>
            <div className="panel panel-default">
               <FormErrors formErrors={this.state.formErrors} />
            </div>
            <form id="form" className="form-container"  onSubmit= {this.submitLoginForm}>
              <div className="mb-3">
                {/* <input type="text" className="form-control" name="username" placeholder="Username" onChange={this.handleChange} /> */}
                <input type="username" required className="form-control" name="username"
                placeholder="Username"
                value={this.state.username}
                onChange={this.handleUserInput}  />
              </div>
              <div className="mb-3">
                {/* <input type="password" className="form-control" name="password" placeholder="Password" onChange={this.handleChange} /> */}
                <input type="password" className="form-control" name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleUserInput}  />
                <Link href="/forgot-password">
                  <a className="link-style link-forgot-pwd">Forgot password?</a>
                </Link>
              </div>
              <Button className="btn btn-dark button-login" 
                disabled={ !this.state.formValid} 
                onClick={!this.props.isLoading ? this.handleSendForm : null}>
                {this.props.isLoading ? "Loading…" : "SUBMIT"}
              </Button>
              <Link href="/register">
                <a className="link-style link-register">Don't have an account? Sign Up</a>
              </Link>
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToPros = (state) => {
  return {
    isLoading: state.isLoading,
    isLoggedIn: state.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setBtnLoading: () => dispatch(setBtnLoading()),
    setBtnNotLoading: () => dispatch(setBtnNotLoading()),
    setUserLogin: () => dispatch(setUserLogin()),
    getCurrentUserId: (token) => dispatch(getCurrentUserId(token))
  };
};

const ConnectLogin = connect(mapStateToPros, mapDispatchToProps)(Login);

export default ConnectLogin;
