import React from "react";
import BasicLayout from "../../Layout";
import AddCamera from "../../components/forms/addCamera";
import FormCamera from "../../components/forms/formCamera";

import "./AddCameraPage.scss";

export default function AddCameraPage() {
  return (
    <BasicLayout>
      <div className="body-content">
        <FormCamera />
      </div>
    </BasicLayout>
  );
}
