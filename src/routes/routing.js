import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { map } from "lodash";

import configRouting from "./configRouting";

export default function routing() {
  return (
    <Router>
      <Routes>
        {configRouting.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Router>
  );
}
