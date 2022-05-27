import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import apiCamera from "../../services/apiCamera";
import apiAgency from "../../services/apiAgency";
import useApi from "../../hook/useApi";

import PieChart from "../../components/Chart/Pie";
import LineChart from "../../components/Chart/LineChart";

import BasicLayout from "../../Layout";

import "./Dashboard.scss";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [dataAg, setDataAg] = useState([]);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    await apiCamera.GetCamera().then((res) => {
      setData(res.data);
    });
    await apiAgency.GetAgency().then((res) => {
      setDataAg(res.data);
    });
  };

  return (
    <BasicLayout>
      <div>Dashboard</div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}></Grid>
        <Grid item xs={12} sm={4}>
          <div className="chart-pie">
            <PieChart dataSource={data} />
          </div>
        </Grid>
        <Grid item xs={12} sm={4}>
          <div className="chart-pie">
            <LineChart dataSource={dataAg} />
          </div>
        </Grid>
      </Grid>
    </BasicLayout>
  );
}
