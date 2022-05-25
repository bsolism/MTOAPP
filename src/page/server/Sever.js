import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { ListItem, ListItemIcon } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import GppGoodIcon from "@mui/icons-material/GppGood";
import GppBadIcon from "@mui/icons-material/GppBad";
import BasicLayout from "../../Layout";
import SearchField from "../../components/forms/Field/SearchField";
import Body from "../../components/body";
import apiServer from "../../services/apiServer";
import useApi from "../../hook/useApi";
import { apiAgency } from "../../services";

import "./Server.scss";

const columns = [
  { field: "name", headerName: "Nombre", width: 100 },
  { field: "location", headerName: "Ubicación", width: 160 },
  { field: "type", headerName: "Tipo", width: 110 },
  {
    field: "brand",
    headerName: "Marca",
    width: 90,
    renderCell: (params) => {
      return params.value.name;
    },
  },
  { field: "model", headerName: "Modelo", width: 150 },
  {
    field: "ipAddress",
    headerName: "Dirección IP",
    width: 120,
    renderCell: (params) => {
      return (
        <a href={"http://" + params.value} target="_blank">
          {params.value}
        </a>
      );
    },
  },

  {
    field: "cameraCapacity",
    headerName: "Camaras",
    width: 100,
    hide: true,
  },
  {
    field: "cameras",
    headerName: "Camaras",
    width: 100,
    hide: true,
    renderCell: (params) => {
      return params.value.length;
    },
  },
  {
    field: "camerasFull",
    headerName: "Camaras",
    width: 100,
    sortable: false,
    valueGetter: (params) =>
      `${params.row.cameras.length}/${params.row.cameraCapacity}`,
  },
  {
    field: "isGoodCondition",
    headerName: "Estado",
    width: 50,
    renderCell: (params) => {
      return params.value ? (
        <div>
          <GppGoodIcon color="success" />
        </div>
      ) : (
        <div>
          <GppGoodIcon color="action" />
        </div>
      );
    },
  },
];

export default function Sever() {
  const [data, setData] = useState([]);
  const getAgency = useApi(apiAgency.GetAgency);

  useEffect(() => {
    getAgency.request();
    getData();
  }, []);

  const getData = async () => {
    await apiServer.GetServer().then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  };

  return (
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
