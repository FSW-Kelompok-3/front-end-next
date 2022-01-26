/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';
import router from 'next/router';
import swal from 'sweetalert';
import { FormErrors } from './FormErrors';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      nama: '',
      umur: '',
      isLoading: false,
      image: '',
      // eslint-disable-next-line react/no-unused-state
      url: '',
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
      username, email, password, nama, umur, url,
    } = this.state;
    axios
      .post('https://api-kel3.herokuapp.com/update/', {
        username,
        email,
        password,
        nama,
        umur,
        url,
      }, { headers: { 'content-type': 'application/json;charset=UTF-8', Authorization: localStorage.getItem('token') } })
      .then((res) => {
        console.log(res);
        swal({
          title: 'Success!',
          text: 'Edit Player Berhasil',
          icon: 'success',
        });
        router.push('/');
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

  uploadImage = () => {
    const data = new FormData();
    const { image } = this.state;
    data.append('file', image);
    data.append('upload_preset', 'profil_image');
    data.append('cloud_name', 'dkqxlkrj5');
    fetch('https://api.cloudinary.com/v1_1/dkqxlkrj5/image/upload', {
      method: 'post',
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({ url: data.url });
        this.handleSendForm();
      })
      .catch((err) => console.log(err));
  };

  handleSubmit = async () => {
    await this.handleLoading();
    await this.uploadImage();
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
          <h4 className="text-title">Edit Player</h4>
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
            <div className="mb-3">
              <label htmlFor="file" className="form-label m-0">Photo Profile:</label>
              <input
                type="file"
                className="form-control"
                name="file"
                id="file"
                onChange={(e) => this.setState({ image: e.target.files[0] })}
              />
            </div>
            <Button
              className="btn btn-dark button-login m-0"
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

export default Edit;
