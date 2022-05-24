import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { ListItem, ListItemIcon } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Link } from "react-router-dom";
import BasicLayout from "../../Layout";
import SearchField from "../../components/forms/Field/SearchField";
import Body from "../../components/body";
import apiService from "../../services/apiAgency";

import "./Store.scss";

const columns = [
  { field: "nombre", headerName: "Nombre", width: 200 },
  { field: "ciudad", headerName: "Ubicación", width: 260 },
  { field: "direccion", headerName: "Tipo", width: 300 },
];

export default function Store() {
  const [data, setData] = useState([]);

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
            sx={{
              fontSize: 12,
            }}
            pageSize={100}
          />
        </div>
      </Body>
    </BasicLayout>
  );
}
