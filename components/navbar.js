import React, { useState, useEffect, Fragment, Component } from "react";
import Link from "next/link";
import router from "next/router";
import { connect } from "react-redux";
import { setUserLogin, setUserLogout } from "../redux/actions/authActions";
import { resetPlayedDummy, setPlayed } from "../redux/actions/gameListdetailActions";


class Navbar extends Component {
  static getInitialProps({ store }) {}

  constructor(props) {
    super(props);
  }

  state = {
    click: false,
  };

  handleClick = () => {
    this.setState({ click: !this.state.click });
  };

  closeMobileMenu = () => {
    this.setState({ click: false });
  };

  funcLogOut = () => {
    localStorage.removeItem("token");
    this.props.setUserLogout();
    this.props.resetPlayedDummy();
    this.props.setPlayed(false);
  };

  handleSubmit = () => {
    this.funcLogOut();
    router.push("/login");
  };

  guestMode() {
    return (
      <Fragment>
        <li className="nav-item">
          <Link href="/register" className="nav-links" onClick={this.closeMobileMenu}>
            <a>Sign Up</a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/login" className="nav-links" onClick={this.closeMobileMenu}>
            <a>Sign In</a>
          </Link>
        </li>
      </Fragment>
    );
  }

  userMode() {
    return (
      <Fragment>
        <li className="nav-item">
          <Link href={`/profile/${this.props.currentUserId.id}`} className="nav-links">
            <a>Profile</a>
          </Link>
        </li>
        {/* <li className="nav-item">
          <Link href="/score" className="nav-links">
            <a>Score</a>
          </Link>
        </li> */}
        <li className="nav-item">
          <button className="btn nav-button" onClick={this.handleSubmit}>
            Log Out
          </button>
        </li>
      </Fragment>
    );
  }

  render() {
    return (
      <Fragment>
        <nav className="navbar">
          <div className="navbar-container">
            <Link href="/" onClick={this.closeMobileMenu}>
              <a className="navbar-logo">BINAR GAMES</a>
            </Link>
            <div className="menu-icon" onClick={this.handleClick}>
              <i className={this.state.click ? "fas fa-times" : "fas fa-bars"} />
            </div>
            <ul className={this.state.click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <Link href="/gamelist" className="nav-links" onClick={this.state.closeMobileMenu}>
                  <a>Game List</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/edit" className="nav-links" onClick={this.state.closeMobileMenu}>
                  <a>Edit Player</a>
                </Link>
              </li>
              {!this.props.isLoggedIn ? this.guestMode() : this.userMode()}
            </ul>
          </div>
        </nav>
      </Fragment>
    );
  }
}

const mapStateToPros = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
    currentUserId: state.currentUserId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserLogin: () => dispatch(setUserLogin()),
    setUserLogout: () => dispatch(setUserLogout()),
    resetPlayedDummy: () => dispatch(resetPlayedDummy()),
    setPlayed: (condition) => dispatch(setPlayed(condition))
  };
};

const ConnectNavbar = connect(mapStateToPros, mapDispatchToProps)(Navbar);

export default ConnectNavbar;
