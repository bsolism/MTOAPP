import React from "react";

import AppBarNav from "../components/navigator/AppBar";

import "./BasicLayout.scss";

export default function BasicLayout({ children }) {
  return (
    <div>
      <AppBarNav />
      <div>{children}</div>
    </div>
  );
}
