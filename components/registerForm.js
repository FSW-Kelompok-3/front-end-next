import React, { Component, Fragment } from "react";
import { Button } from "reactstrap";
import axios from "axios";
import router from "next/router";
import { FormErrors } from './FormErrors';
import swal from 'sweetalert';

import Link from "next/link";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    nama: "",
    umur: "",
    isLoading: false,
  };

  constructor (props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      nama: '',
      umur: '',
      formErrors: {username: '', password: '', email: '', nama: '', umur: ''},
      usernameCheck: false,
      emailValid: false,
      passwordValid: false,
      nameCheck: false,
      umurCheck: false,
      formValid: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.submitRegisterForm = this.submitRegisterForm.bind(this);
  }

  submitRegisterForm(e) {
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
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let nameCheck = this.state.nameCheck;
    let umurCheck = this.state.umurCheck;


    switch(fieldName) {
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
        fieldValidationErrors.password = passwordValid ? '': ' is too short';
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
    this.setState({formErrors: fieldValidationErrors,
                    usernameCheck: usernameCheck,
                    emailValid: emailValid,
                    passwordValid: passwordValid,
                    nameCheck: nameCheck,
                    umurCheck: umurCheck 
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.usernameCheck && this.state.passwordValid 
      && this.state.emailValid && this.state.nameCheck && this.state.umurCheck
    });
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  //end validate

  simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  }

  async componentDidMount() {
    if (this.state.isLoading) {
      simulateNetworkRequest().then(() => {
        this.setState({ isLoading: false });
      });
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleLoading = () => {
    this.setState({ isLoading: true });
  };

  handleSendForm = () => {
    axios
      .post("https://api-kel3.herokuapp.com/auth/register", {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        nama: this.state.nama,
        umur: this.state.umur,
      })
      .then((res) => {
        console.log(res);
        swal({
          title: "Success!",
          text: "Register Berhasil",
          icon: "success"
        })
        router.push("/login");
      })
      .catch((error) => {
        console.log(error);
        swal({
          title: "Failed!",
          text: "Username atau Email Telah Terdaftar",
          icon: "error"
        })
        this.setState({ isLoading: false });
      });
  };

  handleSubmit = () => {
    this.handleLoading();
    this.handleSendForm();
  };

  render() {
    return (
      <Fragment>
        <div className="auth-container">
          <div className="auth-card-container">
            <h4 className="text-title">Sign Up</h4>
            <div className="panel panel-default">
               <FormErrors formErrors={this.state.formErrors} />
            </div>
            <form id="form" className="form-container" onSubmit= {this.submitRegisterForm}>
              <div className="mb-3">
                {/* <input type="text" className="form-control" name="username" placeholder="Username" onChange={this.handleChange} /> */}
                <input type="username" required className="form-control" name="username"
                placeholder="Username"
                value={this.state.username}
                onChange={this.handleUserInput}  />
              </div>
              <div className="mb-3">
                {/* <input type="email" className="form-control" name="email" placeholder="Email" onChange={this.handleChange} /> */}
                <input type="email" required className="form-control" name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleUserInput}  />
              </div>
              <div className="mb-3">
                {/* <input type="password" className="form-control" name="password" placeholder="Password" onChange={this.handleChange} /> */}
                <input type="password" className="form-control" name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleUserInput}  />
              </div>
              <div className="mb-3">
                {/* <input type="text" className="form-control" name="nama" placeholder="Nama" onChange={this.handleChange} /> */}
                <input type="nama" required className="form-control" name="nama"
                placeholder="Nama"
                value={this.state.nama}
                onChange={this.handleUserInput}  />
              </div>
              <div className="mb-3">
                {/* <input type="number" className="form-control" name="umur" placeholder="Umur" onChange={this.handleChange} /> */}
                <input type="umur" required className="form-control" name="umur"
                placeholder="Umur"
                value={this.state.umur}
                onChange={this.handleUserInput}  />
              </div>
              <Button className="btn btn-dark button-login" 
                disabled={ !this.state.formValid}  
                onClick={!this.state.isLoading ? this.handleSubmit : null}>
                {this.state.isLoading ? "Loading…" : "SUBMIT"}
              </Button>
              <Link href="/login">
                <a className="link-style link-register">Already have an account? Sign In</a>
              </Link>
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Register;
