import React, { Component, Fragment } from "react";
import { Button } from "reactstrap";
import axios from 'axios';
import router from 'next/router';
import {connect} from 'react-redux';
import { setBtnLoading, setBtnNotLoading } from '../redux/actions/buttonActions';
import { setUserLogin } from '../redux/actions/authActions';

import Link from 'next/link';

class Login extends Component {
  state = {
    username: '',
    password: ''
    // isLoading: false
  }

  simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  }

  async componentDidMount() {
    if(this.props.isLoading) {
      simulateNetworkRequest().then(() => {
        // this.setState({isLoading: false});
        this.props.setBtnNotLoading()
      });
    }
  }
  
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleLoading = () => {
    // this.setState({isLoading: true})
    this.props.setBtnLoading()
  }

  handleSendForm = () => {
    axios.post('https://api-kel3.herokuapp.com/auth/login',{
      username: this.state.username,
      password: this.state.password
    })
    .then((res) => {
      console.log(res)
      localStorage.setItem('token', res.data.accessToken)
      router.push('/')
    })
    .catch((error)=> {
      console.log(error)
      alert("username atau password salah")
    })
  }

  handleSubmit = async() => {
    this.handleLoading();
    await this.handleSendForm();
    this.props.setBtnNotLoading();
    this.props.setUserLogin();
  }

  render() {
    return (
      <Fragment>
        <div className="auth-container">
          <div className="auth-card-container">
            <h4 className="text-title">SIGN IN</h4>
            <form id="form" className="form-container">
              <div className="mb-3">
              <input type="text" className="form-control" name="username" placeholder="Username" onChange={this.handleChange} />
              </div>
              <div className="mb-3">
              <input type="password" className="form-control" name="password" placeholder="Password" onChange={this.handleChange} />
                <Link href='/forgot-password'><a className="link-style link-forgot-pwd">Forgot password?</a></Link>
              </div>
              <Button 
                className="btn btn-dark button-login" 
                disabled={this.props.isLoading}
                onClick={!this.props.isLoading ? this.handleSubmit : null}>
                  {this.props.isLoading ? 'Loading…' : 'SUBMIT'}
              </Button>
              {/* <h1>{this.props.isLoading.toString()}</h1> */}
              {console.log(this.props.isLoading)}
              <Link href='/register'><a className="link-style link-register">Don't have an account? Sign Up</a></Link>
            </form>
          </div>
        </div>
      </Fragment>
    )
  }
}

const mapStateToPros = (state) => {
  return {
    isLoading: state.isLoading
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setBtnLoading: () => dispatch(setBtnLoading()),
    setBtnNotLoading: () => dispatch(setBtnNotLoading()),
    setUserLogin: () => dispatch(setUserLogin())
  };
}

const ConnectLogin = connect(mapStateToPros, mapDispatchToProps)(Login);

export default ConnectLogin;