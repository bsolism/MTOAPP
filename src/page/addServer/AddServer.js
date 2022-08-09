import React from "react";
import FormServer from "../../components/Forms/formServer";
import MainLayout from "../../Layout/MainLayout";

import "./AddServer.scss";

export default function AddServerPage() {
  return (
    <MainLayout>
      <div className="body-content">
        <FormServer />
      </div>
    </MainLayout>
  );
}
