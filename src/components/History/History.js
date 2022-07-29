import React, { useState, useEffect } from "react";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Form from "../Forms/form";
import { Box, Container, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Divider, Grid, CssBaseline } from "@mui/material";
import Text from "../Forms/field/Text";
import SubmitButton from "../Forms/field/SubmitButton";
import { DataGrid } from "@mui/x-data-grid";
import { apiLog, apiLogServer } from "../../services";

import "./History.scss";
const theme = createTheme();
const columns = [
  { field: "evento", headerName: "Evento", width: 440 },
  {
    field: "usuario",
    headerName: "Usuario",
    width: 120,
    renderCell: (params) => {
      return params.value.userName;
    },
  },
  {
    field: "date",
    headerName: "Fecha",
    width: 170,
  },
];

export default function History({ item, origen }) {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(1);

  useEffect(() => {
    getData(item[0].id);
  }, [item[0].id]);

  const getData = async (id) => {
    if (origen === "camera") {
      await apiLog.GetLogByCameraId(id).then((res) => {
        setData(res.data);
      });
    } else {
      await apiLogServer.GetLogByServerId(id).then((res) => {
        setData(res.data);
      });
    }
  };
  const handleSubmit = (values, { resetForm }) => {
    if (origen === "camera") {
      const newdata = {
        evento: values.event,
        usuarioId: 1,
        cameraId: item[0].id,
      };

      apiLog.PostLog(newdata).then((res) => {
        console.log(res);
        getData(item[0].id);
      });
    } else {
      const newdata = {
        evento: values.event,
        usuarioId: 1,
        serverId: item[0].id,
      };
      apiLogServer.PostLog(newdata).then((res) => {
        console.log(res);
        getData(item[0].id);
      });
    }
  };

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <div className="content">
        <Container component="main">
          <Box>
            <Grid container spacing={3}>
              <Form initialValues={{ event: "" }} onSubmit={handleSubmit}>
                <Text required={true} name="event" label="Add Event" sm={9} />
                <div className="content-button">
                  <SubmitButton title="Add" />
                </div>
              </Form>
              <div style={{ height: 300, width: "100%" }}>
                <DataGrid
                  rows={data}
                  columns={columns}
                  rowHeight={30}
                  headerHeight={30}
                  sx={{
                    fontSize: 12,
                  }}
                  pageSize={100}
                />
              </div>
            </Grid>
          </Box>
        </Container>
      </div>
    </LocalizationProvider>
  );
}
