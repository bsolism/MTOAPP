import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { ListItem, ListItemIcon } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import BasicLayout from "../../Layout";
import SearchField from "../../components/forms/Field/SearchField";
import Body from "../../components/body";
import apiServer from "../../services/apiServer";
import useApi from "../../hook/useApi";
import { apiAgency } from "../../services";
import columnsSrv from "../../components/Table/ColumnsSvr";
import BasicModal from "../../components/modal";
import DetailServer from "../../components/forms/detailServer";
import LayoutDetailServer from "../../components/LayoutDetailServer";

import "./Server.scss";

export default function Sever() {
  const [data, setData] = useState([]);
  const getAgency = useApi(apiAgency.GetAgency);
  const [selectedRow, setSelectedRow] = useState();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getAgency.request();
    getData();
  }, []);

  const getData = async () => {
    await apiServer.GetServer().then((res) => {
      setData(res.data);
    });
  };

  return (
    <>
      <BasicLayout>
        <div className="cabecera">
          <SearchField />
          {getAgency.data.length > 0 ? (
            <ListItem className="list" button component={Link} to="/server/add">
              <ListItemIcon>
                <Add />
              </ListItemIcon>
            </ListItem>
          ) : (
            <ListItem
              className="list"
              button
              onClick={() => toast.warning("Debe ingresar un nueva Agencia")}
            >
              <ListItemIcon>
                <Add />
              </ListItemIcon>
            </ListItem>
          )}
        </div>

        <Body>
          <div style={{ height: 500, width: "100%" }}>
            {data.length > 0 ? (
              <DataGrid
                rows={data}
                columns={columnsSrv}
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
            ) : null}
          </div>
        </Body>
      </BasicLayout>
      <BasicModal open={open} handleClose={handleClose} data={selectedRow}>
        <LayoutDetailServer item={selectedRow} handleClose={handleClose} />
      </BasicModal>
    </>
  );
}
