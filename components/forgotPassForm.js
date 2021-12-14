import React, { Component, Fragment } from "react";
import { Button } from "reactstrap";
import axios from "axios";
import router from "next/router";
import { FormErrors } from './FormErrors';
import swal from 'sweetalert';

import Link from "next/link";

class ForgotPassword extends Component {
  state = {
    email: "",
    isLoading: false,
  };

  constructor (props) {
    super(props);
    this.state = {
      email: '',
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
      case 'email':
          emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
          fieldValidationErrors.email = emailValid ? '' : ' is invalid format';
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
    this.setState({formValid:this.state.emailValid
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
      .post("https://api-kel3.herokuapp.com/forgot-password", {
        email: this.state.email,
      })
      .then((res) => {
        console.log(res);
        swal({
          title: "Success!",
          text: "Berhasil Mengirim E-Mail Link Reset Password",
          icon: "success"
        })
        router.push(`/`);
      })
      .catch((error) => {
        console.log(error);
        swal({
          title: "Failed!",
          text: "E-mail Tidak Terdaftar",
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
            <h4 className="text-title">Forgot Password</h4>
            <p className="forgot-pwd-txt">Please Fill Your E-mail Below </p>
            <div className="panel panel-default">
               <FormErrors formErrors={this.state.formErrors} />
            </div>
            <form id="form" className="form-container" onSubmit= {this.submitRegisterForm}>
              <div className="mb-3">
                {/* <input type="email" className="form-control" name="email" placeholder="Email" onChange={this.handleChange} /> */}
                <input type="email" required className="form-control" name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleUserInput}  />
              </div>
              <Button className="btn btn-dark button-login" 
                disabled={ !this.state.formValid}  
                onClick={!this.state.isLoading ? this.handleSubmit : null}>
                {this.state.isLoading ? "Loading…" : "SUBMIT"}
              </Button>
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default ForgotPassword;
