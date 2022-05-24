import React from "react";
import BasicLayout from "../../Layout";
import AddServer from "../../components/forms/addServer";

import "./AddServer.scss";

export default function AddServerPage() {
  return (
    <BasicLayout>
      <div className="body-content">
        <AddServer />
      </div>
    </BasicLayout>
  );
}
