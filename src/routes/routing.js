import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { map } from "lodash";
import Home from "../page/home"

import configRouting from "./configRouting";

export default function routing() {
    return (
      <Router>
        <Routes>
        {map(configRouting, (route, index) => (
          <Route key={index} path={route.path} element={route.element}/>           
        ))}
        </Routes>
      </Router>
    );
  }