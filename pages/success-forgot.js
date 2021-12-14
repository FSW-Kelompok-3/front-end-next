import React, { Component, Fragment } from "react";

import Navbar from '../components/navbar';
import SuccessForgot from "../components/successForgotForm";

export default function SuccessForgotPage() {
  return (
    <Fragment>
      <Navbar />
      <SuccessForgot />
    </Fragment>
  )
}