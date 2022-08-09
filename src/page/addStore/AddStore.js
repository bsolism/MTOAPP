import React from "react";
import MainLayout from "../../Layout/MainLayout";
import FormAgency from "../../components/Forms/formAgency";

import "./AddStore.scss";

export default function AddStorePage() {
  return (
    <MainLayout>
      <div className="body-content">
        <FormAgency />
      </div>
    </MainLayout>
  );
}
