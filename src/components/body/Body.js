import React from "react";

import "./Body.scss";

export default function Body({ children }) {
  return (
    <div className="body">
      <div className="content">{children}</div>
    </div>
  );
}
