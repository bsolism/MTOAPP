import React, { useState, useEffect } from "react";

import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Divider, Grid } from "@mui/material";
import { toast } from "react-toastify";
import XMLParser from "react-xml-parser";
import SwitchField from "../Field/SwitchField";
import DatePickerField from "../Field/DatePickerField";
import FieldSelect from "../Field/FieldSelect";
import SubmitButton from "../SubmitButton";
import {
  apiCamera,
  apiServer,
  apiBrand,
  apiHikvision,
} from "../../../services";
import Form from "../form";
import Text from "../Field/Text";

import ActivityIndicator from "../../ActivityIndicator";
import "./DetailCamera.scss";

export default function DetailCamera({ item, handleClose, getDta }) {
  const [checked, setChecked] = useState(true);
  const [checkedMic, setCheckedMic] = useState(true);
  const [dateValue, setDateValue] = useState();
  const [dateValueB, setDateValueB] = useState();
  const [dataSelectServer, setdataSelectServer] = useState([]);
  const [dataSelectBrand, setdataSelectBrand] = useState([]);
  const [data, setData] = useState("");
  const [server, setServer] = useState("");
  const [image, setImage] = useState();
  const [mic, setMic] = useState();

  useEffect(() => {
    item.map((val) => {
      setData(val.brandId);
      setServer(val.serverId);
      setChecked(val.isGoodCondition);
      setDateValueB(val.fechaCompra);
      setDateValue(val.fechaInstalacion);
    });
    getData();
  }, []);

  const handleSubmit = (values) => {
    values.isGoodCondition = checked;
    values.fechaInstalacion = dateValue;
    values.fechaCompra = dateValueB;

    apiCamera.PutCamera(values).then((res) => {
      console.log(res);
      if (res === undefined) toast.warning("Update error");
      if (res.status === 200) {
        toast("Update Complete");
        getDta();

        handleClose();
      }
    });
  };

  const getData = async () => {
    const credential = {
      ipAddress: item[0].ipAddress,
      name: item[0].user,
      password: item[0].password,
      brand: item[0].brand.name,
      nicInterno: item[0].switch,
    };
    await apiHikvision.GetCapabilities(credential).then((res) => {
      var xmlData = new XMLParser().parseFromString(res.data);
      if (res.status === 200) {
        xmlData.children.map((x) => {
          if (x.name === "Audio") {
            setMic(true);
            x.children.map((xs) => {
              if (xs.name === "enabled") {
                if (xs.value === "false") {
                  setCheckedMic(false);
                }
              }
            });
          }
        });
      }
    });
    await apiServer.GetServer().then((res) => {
      setdataSelectServer(res.data);
    });
    await apiCamera.GetImageCamHik(credential).then((res) => {
      setImage(res);
    });

    await apiBrand.GetBrand().then((res) => {
      setdataSelectBrand(res.data);
    });
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const handleChangeMic = (event) => {
    setCheckedMic(event.target.checked);
  };
  const handleChangeDateI = (value) => {
    setDateValue(value);
  };
  const handleChangeDateB = (value) => {
    setDateValueB(value);
  };

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <div className="form-class">
        <Grid container spacing={1}>
          {item.map((val) => (
            <Form initialValues={val} key={val.id} onSubmit={handleSubmit}>
              <div className="detailTop">
                <div className="boxDetail">
                  <Grid container>
                    <Text name="name" label="Name" sm={4} />
                    <Grid item sm={4}>
                      <FieldSelect
                        origin="brand"
                        source={dataSelectBrand}
                        data={data}
                        setData={setData}
                      />
                    </Grid>
                    <Text name="model" label="Model" sm={4} />
                    <Text name="type" label="Type" sm={4} />
                    <Text name="ipAddress" label="IP" sm={4} />
                    <Text name="mac" label="Mac" sm={4} />
                    <Text name="serialNumber" label="Serial" sm={12} />

                    {mic ? (
                      <Grid item sm={4}>
                        <SwitchField
                          handleChange={handleChangeMic}
                          label="Mic"
                          checked={checkedMic}
                        />
                      </Grid>
                    ) : null}

                    <Divider
                      style={{
                        width: "100%",
                        marginTop: "5px",
                        marginBottom: "5px",
                      }}
                    />
                    <Grid item sm={4}>
                      <FieldSelect
                        origin="camera"
                        source={dataSelectServer}
                        data={server}
                        setData={setServer}
                      />
                    </Grid>
                    <Text name="ubicacionFisica" label="Location" sm={4} />
                    <Text name="deviceDescription" label="Description" sm={4} />
                  </Grid>
                </div>
                <div className="boxImage">
                  {image ? (
                    <img
                      src={`data:image/jpeg;chartset=utf-8;base64,${image}`}
                      className="pict"
                    />
                  ) : (
                    <ActivityIndicator origin="detail" />
                  )}
                </div>
              </div>
              <Divider
                style={{ width: "100%", marginTop: "5px", marginBottom: "5px" }}
              />
              <Grid container>
                <Text name="ubicacionConexion" label="Connection" sm={2} />
                <Text name="patchPanel" label="PatchPanel" sm={2} />
                <Text name="switch" label="Switch" sm={2} />
                <Text name="portPatchPanel" label="Port PP" sm={1} />
                <Text name="portSwitch" label="Port Switch/NVR" sm={1} />
                <Text name="firmwareVersion" label="Firmware" sm={3} />
                <Grid item xs={12} sm={4}>
                  <DatePickerField
                    label="Date Buys"
                    dateValue={dateValueB}
                    handleChange={handleChangeDateB}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <DatePickerField
                    label="Installation Date"
                    dateValue={dateValue}
                    handleChange={handleChangeDateI}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <SwitchField
                    handleChange={handleChange}
                    label="En Linea"
                    checked={checked}
                  />
                </Grid>
                <Divider
                  style={{
                    width: "100%",
                    marginBottom: "5px",
                    marginTop: "5px",
                  }}
                />
                <Text name="nota" label="Nota" sm={12} />
                <Divider
                  style={{
                    width: "100%",
                    marginBottom: "5px",
                    marginTop: "5px",
                  }}
                />
              </Grid>
              <SubmitButton title="Save" />
            </Form>
          ))}
        </Grid>
      </div>
    </LocalizationProvider>
  );
}
