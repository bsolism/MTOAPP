import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import ColumnsSrv from "../Table/ColumnsSvr";
import ColumnsCam from "../Table/ColumnsCam";
import BasicModal from "../../components/modal";
import { apiAgency } from "../../services";
import LayoutDetailCamera from "../LayoutDetailCamera/LayoutDetailCamera";
import LayoutDetailServer from "../LayoutDetailServer";

import "./DataSheet.scss";

export default function DataSheet({ data }) {
  const [dataCam, setDataCam] = useState([]);
  const [server, setServer] = useState([]);
  const heightTable = data[0].srvAg.length * 30 + 33;
  const [selectedRow, setSelectedRow] = useState();
  const [cameraItem, setCameraItem] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const cs = ColumnsSrv;
  const cc = ColumnsCam;

  useEffect(() => {
    getData();
    // setServer([]);
    // data[0].srvAg.map((val) => {
    //   setServer((server) => [...server, val.server]);
    // });
  }, []);

  const getData = async () => {
    await apiAgency.GetAgencyById(data[0].id).then((res) => {
      if (res.status === 200) {
        console.log(res.data.srvAg[0].server);
        console.log(res.data.cameras);
        setServer([res.data.srvAg[0].server]);
        setDataCam(res.data.cameras);
      }
    });
  };

  return (
    <>
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
          {data.length > 0 ? (
            <DataGrid
              rows={server}
              columns={cs}
              rowHeight={30}
              headerHeight={30}
              hideFooter
              sx={{
                fontSize: 12,
              }}
              pageSize={100}
              onSelectionModelChange={(ids) => {
                const selectedIds = new Set(ids);
                const selectedRows = server.filter((row) =>
                  selectedIds.has(row.id)
                );

                setSelectedRow(selectedRows);
                setCameraItem(false);
              }}
              onCellDoubleClick={handleOpen}
            />
          ) : null}
        </div>
        <div className="content-cam" style={{ height: 380 }}>
          <Typography component="h6" style={{ fontSize: 14 }}>
            Lista Camaras
          </Typography>
          {data.length > 0 ? (
            <DataGrid
              rows={dataCam}
              columns={cc}
              hideFooter
              rowHeight={30}
              headerHeight={30}
              rowAlign
              sx={{
                fontSize: 12,
              }}
              pageSize={100}
              onSelectionModelChange={(ids) => {
                const selectedIds = new Set(ids);
                const selectedRows = dataCam.filter((row) =>
                  selectedIds.has(row.id)
                );
                setCameraItem(true);

                setSelectedRow(selectedRows);
              }}
              onCellDoubleClick={handleOpen}
            />
          ) : null}
        </div>
      </div>
      <BasicModal open={open} handleClose={handleClose} data={selectedRow}>
        {cameraItem ? (
          <LayoutDetailCamera
            item={selectedRow}
            handleClose={handleClose}
            getData={getData}
          />
        ) : (
          <LayoutDetailServer
            item={selectedRow}
            handleClose={handleClose}
            getData={getData}
          />
          // <DetailCamera item={selectedRow} handleClose={handleClose} />
          // <DetailServer item={selectedRow} handleClose={handleClose} />
        )}
      </BasicModal>
    </>
  );
}
