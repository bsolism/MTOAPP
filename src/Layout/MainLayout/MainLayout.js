import React from "react";
import AppBarNav from "../../components/navigator/AppBar";

export default function MainLayout({ children }) {
  return (
    <>
      <AppBarNav />
      {children}
    </>
  );
}
