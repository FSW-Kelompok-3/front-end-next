import React, { Component, Fragment } from "react";

import Navbar from '../components/navbar';
import SuccessUpdate from "../components/successUpdateForm";

export default function SuccessUpdatePage() {
  return (
    <Fragment>
      <Navbar />
      <SuccessUpdate />
    </Fragment>
  )
}