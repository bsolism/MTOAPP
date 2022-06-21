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
      console.log(res.data);
      setData(res.data);
    });
    await apiAgency.GetAgency().then((res) => {
      console.log(res.data);
      setDataAg(res.data);
    });
  };

  return (
    <BasicLayout>
      <div>Dashboard</div>
      <Grid container spacing={2} className="body-chart">
        <Grid item xs={4}>
          <PieChart dataSource={data} />
        </Grid>
        <Grid item xs={5}>
          <LineChart dataSource={dataAg} />
        </Grid>
      </Grid>
    </BasicLayout>
  );
}
