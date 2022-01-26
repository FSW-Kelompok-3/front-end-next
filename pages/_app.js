/* eslint-disable react/jsx-props-no-spreading */
import App from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';
import store from '../redux/store';

// Global CSS
import '../styles/bootstrap.min.css';
import '../styles/styleNavbar.css';
import '../styles/styleAuthentication.css';

import Layout from '../components/Layout';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    );
  }
}

const makestore = () => store;
const wrapper = createWrapper(makestore);

export default wrapper.withRedux(MyApp);
