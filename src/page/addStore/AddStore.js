import React from "react";
import BasicLayout from "../../Layout/BasicLayout";
import FormAgency from "../../components/Forms/formAgency";

import "./AddStore.scss";

export default function AddStorePage() {
  return (
    <BasicLayout>
      <div className="body-content">
        <FormAgency />
      </div>
    </BasicLayout>
  );
}
