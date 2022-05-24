import React from "react";
import { Grid } from "@mui/material";

import Pie from "../../components/Chart/Pie";

import BasicLayout from "../../Layout";

import "./Dashboard.scss";

export default function Dashboard() {
  return (
    <BasicLayout>
      <div>Dashboard</div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}></Grid>
        <Grid item xs={12} sm={4}>
          <div className="chart-pie">
            <Pie />
          </div>
        </Grid>
      </Grid>
    </BasicLayout>
  );
}
