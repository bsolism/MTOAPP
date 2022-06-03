import React, { useState } from "react";
import DataSheet from "../../components/DataSheet";
import { useLocation } from "react-router-dom";
import BasicLayout from "../../Layout";
import Body from "../../components/body";

export default function DataSheetPage() {
  const location = useLocation();

  return (
    <BasicLayout>
      <Body>
        <DataSheet data={location.state} />
      </Body>
    </BasicLayout>
  );
}
