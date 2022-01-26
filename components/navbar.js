/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import Link from 'next/link';
import router from 'next/router';
import { connect } from 'react-redux';
import { setUserLogin, setUserLogout } from '../redux/actions/authActions';
import { resetPlayedDummy, setPlayed } from '../redux/actions/gameListdetailActions';

class Navbar extends Component {
  // eslint-disable-next-line no-unused-vars
  static getInitialProps({ store }) {}

  constructor(props) {
    super(props);
    this.state = {
      click: false,
    };
  }

  handleClick = () => {
    const { click } = this.state;
    this.setState({ click: !click });
  };

  closeMobileMenu = () => {
    this.setState({ click: false });
  };

  funcLogOut = () => {
    localStorage.removeItem('token');
    this.props.setUserLogout();
    this.props.resetPlayedDummy();
    this.props.setPlayed(false);
  };

  handleSubmit = () => {
    this.funcLogOut();
    router.push('/login');
  };

  guestMode() {
    return (
      <>
        <li className="nav-item">
          <Link href="/register" className="nav-links" onClick={this.closeMobileMenu}>
            <a href="/register">Sign Up</a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/login" className="nav-links" onClick={this.closeMobileMenu}>
            <a href="/login">Sign In</a>
          </Link>
        </li>
      </>
    );
  }

  userMode() {
    return (
      <>
        <li className="nav-item">
          <Link href={`/profile/${this.props.currentUserId.id}`} className="nav-links">
            <a href={`/profile/${this.props.currentUserId.id}`}>Profile</a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/edit" className="nav-links" onClick={this.state.closeMobileMenu}>
            <a href="/edit">Edit Player</a>
          </Link>
        </li>
        <li className="nav-item">
          <button type="submit" className="btn nav-button" onClick={this.handleSubmit}>
            Log Out
          </button>
        </li>
      </>
    );
  }

  render() {
    return (
      <nav className="navbar">
        <div className="navbar-container">
          <Link href="/" onClick={this.closeMobileMenu}>
            <a href="/" className="navbar-logo">BINAR GAMES</a>
          </Link>
          <div className="menu-icon" onClick={this.handleClick} aria-hidden="true">
            <i className={this.state.click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={this.state.click ? 'nav-menu active' : 'nav-menu'}>
            <li className="nav-item">
              <Link href="/gamelist" className="nav-links" onClick={this.state.closeMobileMenu}>
                <a href="/gamelist">Game List</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/demo" className="nav-links" onClick={this.state.closeMobileMenu}>
                <a href="/demo">Demo</a>
              </Link>
            </li>
            {!this.props.isLoggedIn ? this.guestMode() : this.userMode()}
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToPros = (state) => ({
  isLoggedIn: state.isLoggedIn,
  currentUserId: state.currentUserId,
});

const mapDispatchToProps = (dispatch) => ({
  setUserLogin: () => dispatch(setUserLogin()),
  setUserLogout: () => dispatch(setUserLogout()),
  resetPlayedDummy: () => dispatch(resetPlayedDummy()),
  setPlayed: (condition) => dispatch(setPlayed(condition)),
});

const ConnectNavbar = connect(mapStateToPros, mapDispatchToProps)(Navbar);

export default ConnectNavbar;
