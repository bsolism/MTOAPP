import React from "react";

import AppBarNav from "../../components/navigator/AppBar";

import "./BasicLayout.scss";

export default function BasicLayout({ children }) {
  return (
    <>
      <AppBarNav />
      {children}
    </>
  );
}
