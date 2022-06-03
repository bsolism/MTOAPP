import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import ColumnsSrv from "../Table/ColumnsSvr";
import ColumnsCam from "../Table/ColumnsCam";

import "./DataSheet.scss";

export default function DataSheet({ data }) {
  const [dataCam, setDataCam] = useState([]);
  const heightTable = data[0].servers.length * 30 + 33;

  useEffect(() => {
    setDataCam([]);
    data[0].servers.map((val) => {
      val.cameras.map((res) => {
        res.server = val.name;
        setDataCam((dataCam) => [...dataCam, res]);
        //setDataCam(dataCam=>[...dataCam, val.name]);
      });
    });
  }, []);

  return (
    <div className="content-data">
      <div className="content-title">
        <Typography component="h1" variant="h6" align="center">
          Sistema de cámaras {data[0].nombre} <br /> {data[0].ciudad}
        </Typography>
      </div>
      <div className="content-server" style={{ height: heightTable }}>
        <Typography component="h6" style={{ fontSize: 14 }}>
          Lista DVR / NVR / Servidores
        </Typography>
        <DataGrid
          rows={data[0].servers}
          columns={ColumnsSrv}
          rowHeight={30}
          headerHeight={30}
          hideFooter
          sx={{
            fontSize: 12,
          }}
          pageSize={100}
        />
      </div>
      <div className="content-cam" style={{ height: 380 }}>
        <Typography component="h6" style={{ fontSize: 14 }}>
          Lista Camaras
        </Typography>
        <DataGrid
          rows={dataCam.length > 0 ? dataCam : null}
          columns={ColumnsCam}
          hideFooter
          rowHeight={30}
          headerHeight={30}
          rowAlign
          sx={{
            fontSize: 12,
          }}
          pageSize={100}
        />
      </div>
    </div>
  );
}
