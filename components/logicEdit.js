import React, { Component, Fragment } from "react";
import axios from 'axios'
import router from 'next/router'
import styles from '../styles/styles.module.css'




class Edit extends Component {
    state = {
        username: "",
        email: "",
        password: "",
        nama: "",
        umur: "",
    }
  
    handleChange = event => {
      this.setState({ [event.target.name]: event.target.value })
    }
  
    handleSubmit = event => {
      event.preventDefault()
      console.log(this.state)
    }
  
    send = () => {
      axios.post('https://api-kel3.herokuapp.com/update',{
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        nama: this.state.nama,
        umur: this.state.umur
      },{headers: { 'content-type': 'application/json;charset=UTF-8', Authorization: localStorage.getItem('token') }})
      .then((res) => {
        console.log(res)
        router.push('/success-update')
      })
      .catch((error)=> {
        console.log(error)
        alert("username atau password salah")
      })
    }
  
    render() {
      return (
       <Fragment>
         <div className={styles.authContainer}>
           <div className={styles.authCardContainer}>
             <h4 className={styles.textTitle}>SIGN UP</h4>
             <form className={styles.formContainer} onSubmit={this.handleSubmit}>
              <div>
                <input className="form-control" type="text" name="username" placeholder="Username" onChange={this.handleChange} />
              </div>
              <br/>
              <div>
              <input className="form-control" type="email" name="email" placeholder="Email" onChange={this.handleChange} />
              </div>
              <br/>
              <div>
              <input className="form-control" type="password" name="password" placeholder="Password" onChange={this.handleChange} />
              </div>
              <br/>
              <div>
              <input className="form-control" type="text" name="nama" placeholder="Nama" onChange={this.handleChange} />
              </div>
              <br/>
              <div>
              <input className="form-control" type="text" name="umur" placeholder="Umur" onChange={this.handleChange} />
              </div>
              <br/>
              <button className="btn btn-dark button-login" type="submit" onClick={this.send}>Submit</button>
            </form>
           </div>
         </div>
       </Fragment>
      )
    }
  }
  
  export default Edit