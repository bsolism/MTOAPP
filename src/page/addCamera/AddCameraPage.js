import React from "react";
import BasicLayout from "../../Layout/BasicLayout";
import FormCamera from "../../components/Forms/formCamera";

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
