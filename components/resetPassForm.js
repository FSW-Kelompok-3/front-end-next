import React, { Component, Fragment } from "react";
import { Button } from "reactstrap";
import axios from "axios";
import router from "next/router";
import { FormErrors } from './FormErrors';
import swal from 'sweetalert';
import Link from "next/link";


class ResetPassword extends Component {
  
  state = {
    password: "",
    confirmP: "",
    isLoading: false,
  };

  constructor (props) {
    super(props);
    this.state = {
      password: '',
      confirmP: '',
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
    let passwordValid = this.state.passwordValid;
    let confirmPValid = this.state.confirmPValid;


    switch(fieldName) {
      case 'password':
        passwordValid = value.length >= 3;
        fieldValidationErrors.password = passwordValid ? '': ' is too short';
        break;
        case 'confirmP':
          confirmPValid = value.length >= 3;
          fieldValidationErrors.password = confirmPValid ? '': ' is too short';
          break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    passwordValid: passwordValid,
                    confirmPValid : confirmPValid,
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.passwordValid 
      && this.state.confirmPValid
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
    const { id, token } = router.query;
    axios
      .post(`https://api-kel3.herokuapp.com/reset-password/${id}/${token}`, {
        password: this.state.password,
        confirmP: this.state.confirmP
      }, {headers: { 'content-type': 'application/json;charset=UTF-8', Authorization: localStorage.getItem('token') }})
      .then((res) => {
        console.log(res);
        swal({
          title: "Success!",
          text: "Success Reset Password",
          icon: "success"
        })
        router.push(`/`);
      })
      .catch((error) => {
        console.log(error);
        swal({
          title: "Failed!",
          text: "Password And Confirm Password is not same",
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
            <h4 className="text-title">Reset Password</h4>
            <div className="panel panel-default">
               <FormErrors formErrors={this.state.formErrors} />
            </div>
            <form id="form" className="form-container" onSubmit= {this.submitRegisterForm}>
              <div className="mb-3">
                {/* <input type="password" className="form-control" name="password" placeholder="Password" onChange={this.handleChange} /> */}
                <input type="password" className="form-control" name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleUserInput}  />
              </div>
              <div className="mb-3">
                {/* <input type="text" className="form-control" name="nama" placeholder="Nama" onChange={this.handleChange} /> */}
                <input type="password" required className="form-control" name="confirmP"
                placeholder="Confirm Password"
                value={this.state.confirmP}
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

export default ResetPassword;
