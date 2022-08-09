import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { apiAgency, apiCamera, apiEvento } from "../../services";

import PieChart from "../../components/Chart/PieChart";
import BarChart from "../../components/Chart/BarChart";
import LiveActivity from "../../components/LiveActivity";
import MainLayout from "../../Layout/MainLayout";

import "./Dashboard.scss";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [dataAg, setDataAg] = useState([]);
  const [dataEvent, setDataEvent] = useState([]);
  const [third, setThird] = useState(false);

  useEffect(() => {
    getData();
    var count = 0;
    var interval = setInterval(() => {
      count++;

      if (count === 1) setThird(true);
      if (count === 1) {
        clearInterval(interval);
      }
    }, 5000);
  }, []);

  const getData = async () => {
    await apiCamera.GetCamera().then((res) => {
      setData(res.data);
    });
    await apiAgency.GetAgency().then((res) => {
      setDataAg(res.data);
    });
    await apiEvento.Get().then((res) => {
      setDataEvent(res.data);
    });
  };

  return (
    <>
      <MainLayout>
        <Grid container spacing={2} className="body-chart">
          <Grid item xs={4}>
            <PieChart dataSource={data} />
          </Grid>
          <Grid item xs={5}>
            <BarChart dataSource={dataAg} />
          </Grid>
          <Grid item xs={12}>
            {third ? (
              <LiveActivity
                dataSource={dataAg}
                setDataAg={setDataAg}
                data={data}
                setData={setData}
                dataEvent={dataEvent}
                setDataEvent={setDataEvent}
              />
            ) : null}
          </Grid>
        </Grid>
      </MainLayout>
    </>
  );
}
