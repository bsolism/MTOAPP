import React from "react";
import MainLayout from "../../Layout/MainLayout";
import FormCamera from "../../components/Forms/formCamera";

import "./AddCameraPage.scss";

export default function AddCameraPage() {
  return (
    <MainLayout>
      <div className="body-content">
        <FormCamera />
      </div>
    </MainLayout>
  );
}
