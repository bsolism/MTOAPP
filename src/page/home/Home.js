import React, { useState, useEffect } from "react";

import AppBarNav from "../../components/navigator/AppBar";
import BasicLayout from "../../Layout";
import useApi from "../../hook/useApi";
import apiAgencia from "../../services/apiAgency";
import apiServer from "../../services/apiServer";
import apiCamera from "../../services/apiCamera";

export default function Home() {
  const getAgency = useApi(apiAgencia.GetAgency);
  const getServer = useApi(apiServer.GetServer);
  const getCamera = useApi(apiCamera.GetCamera);
  const [cont, setCont] = useState(0);

  useEffect(() => {
    getAgency.request();
    getServer.request();
    getCamera.request();
  }, []);

  return (
    <div>
      <BasicLayout>
        <div>Estamos en Home</div>
        {getAgency.data.length === 0 ? (
          <div>No hay Locales agregados en la base de datos</div>
        ) : getServer.data.length === 0 ? (
          <div>No hay NVR / Server agregados en la base de datos</div>
        ) : getCamera.data.length === 0 ? (
          <div>No hay Camaras agregadas en la bade de datos</div>
        ) : null}
      </BasicLayout>
    </div>
  );
}
