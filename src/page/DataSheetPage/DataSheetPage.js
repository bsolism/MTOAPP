import React from "react";
import { useLocation } from "react-router-dom";
import Body from "../../components/Body";
import AgencyDetail from "../../components/AgencyDetail";
import MainLayout from "../../Layout/MainLayout";

export default function DataSheetPage() {
  const location = useLocation();

  return (
    <MainLayout>
      <Body>
        <AgencyDetail item={location.state} />
      </Body>
    </MainLayout>
  );
}
