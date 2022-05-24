import React from "react";
import BasicLayout from "../../Layout";
import AddStore from "../../components/forms/addStore";

import "./AddStore.scss";

export default function AddStorePage() {
  return (
    <BasicLayout>
      <div className="body-content">
        <AddStore />
      </div>
    </BasicLayout>
  );
}
