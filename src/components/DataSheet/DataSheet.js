import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import ColumnsSrv from "../Table/ColumnsSvr";
import ColumnsCam from "../Table/ColumnsCam";
import BasicModal from "../../components/modal";
import DetailCamera from "../../components/forms/detailCamera";
import DetailServer from "../../components/forms/detailServer";
import LayoutDetailCamera from "../LayoutDetailCamera/LayoutDetailCamera";

import "./DataSheet.scss";

export default function DataSheet({ data }) {
  const [dataCam, setDataCam] = useState(data[0].cameras);
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
    setServer([]);
    data[0].srvAg.map((val) => {
      setServer((server) => [...server, val.server]);
    });
  }, []);

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
          <LayoutDetailCamera item={selectedRow} handleClose={handleClose} />
        ) : (
          // <DetailCamera item={selectedRow} handleClose={handleClose} />
          <DetailServer item={selectedRow} handleClose={handleClose} />
        )}
      </BasicModal>
    </>
  );
}
