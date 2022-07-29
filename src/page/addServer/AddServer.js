import React from "react";
import BasicLayout from "../../Layout/BasicLayout";
import FormServer from "../../components/Forms/formServer";

import "./AddServer.scss";

export default function AddServerPage() {
  return (
    <BasicLayout>
      <div className="body-content">
        <FormServer />
      </div>
    </BasicLayout>
  );
}
