import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { ListItem, ListItemIcon } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
// import BasicLayout from "../../Layout/BasicLayout";
import SearchField from "../../components/Forms/field/SearchField";
import Body from "../../components/Body";
import apiCamera from "../../services/apiCamera";
import useApi from "../../hook/useApi";
import { apiServer } from "../../services";
import BasicModal from "../../components/modal";
import ColumnsCam from "../../components/Table/ColumnsCam";
import LayoutDetailCamera from "../../components/LayoutDetailCamera";
import MainLayout from "../../Layout/MainLayout";

import "./Camera.scss";

export default function Camera() {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState();
  const [open, setOpen] = useState(false);
  const getServer = useApi(apiServer.GetServer);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getServer.request();
    getData();
  }, []);

  const getData = async () => {
    await apiCamera.GetCamera().then((res) => {
      setData(res.data);
    });
  };

  return (
    <>
      <MainLayout>
        {/* <BasicLayout> */}
        <div className="cabecera">
          <SearchField />
          {getServer.data.length > 0 ? (
            <ListItem className="list" button component={Link} to="/camera/add">
              <ListItemIcon>
                <Add />
              </ListItemIcon>
            </ListItem>
          ) : (
            <ListItem
              className="list"
              button
              onClick={() => toast.warning("Debe ingresar un nuevo Servidor")}
            >
              <ListItemIcon>
                <Add />
              </ListItemIcon>
            </ListItem>
          )}
        </div>

        <Body>
          <div style={{ height: 500, width: "100%" }}>
            <DataGrid
              rows={data}
              columns={ColumnsCam}
              rowHeight={30}
              headerHeight={30}
              sx={{
                fontSize: 12,
              }}
              pageSize={100}
              onSelectionModelChange={(ids) => {
                const selectedIds = new Set(ids);
                const selectedRows = data.filter((row) =>
                  selectedIds.has(row.id)
                );

                setSelectedRow(selectedRows);
              }}
              onCellDoubleClick={handleOpen}
            />
          </div>
        </Body>
      </MainLayout>
      {/* </BasicLayout> */}
      <BasicModal open={open} handleClose={handleClose} data={selectedRow}>
        <LayoutDetailCamera
          item={selectedRow}
          handleClose={handleClose}
          getData={getData}
        />
      </BasicModal>
    </>
  );
}
