import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { ListItem, ListItemIcon } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import BasicLayout from "../../Layout";
import SearchField from "../../components/forms/Field/SearchField";
import Body from "../../components/body";
import apiService from "../../services/apiAgency";
import { useNavigate } from "react-router-dom";

import "./Store.scss";
const n = 0;

const columns = [
  {
    filed: "no",
    headerName: "No",
    filterable: false,
    sortable: false,
    renderCell: (index) => {
      return index.id;
    },
  },
  { field: "nombre", headerName: "Nombre", width: 200 },
  { field: "ciudad", headerName: "Ubicación", width: 260 },
  { field: "direccion", headerName: "Tipo", width: 300 },
];

export default function Store() {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await apiService.GetAgency().then((res) => {
      setData(res.data);
    });
  };
  return (
    <BasicLayout>
      <div className="cabecera">
        <SearchField />
        <ListItem className="list" button component={Link} to="/store/add">
          <ListItemIcon>
            <Add />
          </ListItemIcon>
        </ListItem>
      </div>

      <Body>
        <div style={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={data}
            columns={columns}
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
            onCellDoubleClick={() =>
              navigate("/datasheet", { state: selectedRow })
            }
          />
        </div>
      </Body>
    </BasicLayout>
  );
}
