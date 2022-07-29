import { API_HOST } from "../utils/constant";
import axios from "axios";
import { endPoint } from "./endPoint";

const checkStatus = (values) => {
  const url = `${API_HOST}${endPoint.hikChannelStatus}`;
  return axios
    .post(url, values)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
};
const checkStatusDvr = (values) => {
  const url = `${API_HOST}${endPoint.hikChannelStatus}/dvr`;
  return axios
    .post(url, values)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
};
const GetImageCam = (data) => {
  const url = `${API_HOST}${endPoint.hik}/image`;
  return axios
    .post(url, data, { responseType: "arraybuffer" })
    .then(function (response) {
      return btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
    })
    .catch(function (error) {
      console.log(error.response);
      return error.response;
    });
};
const GetTime = (data) => {
  const url = `${API_HOST}${endPoint.HikTime}`;
  return axios
    .post(url, data)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
};
const GetCapabilities = (data) => {
  const url = `${API_HOST}${endPoint.hik}/capabilities`;
  return axios
    .post(url, data)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
};
const updateTime = (data, values) => {
  const dataSend = {
    ipAddress: values.ipAddress,
    name: values.user,
    password: values.password,
    dateTime: data,
  };

  const url = `${API_HOST}${endPoint.HikTime}`;
  return axios
    .put(url, dataSend)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
};
const updateName = (values) => {
  const url = `${API_HOST}${endPoint.HikName}`;
  return axios
    .put(url, values)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
};

const apiHikvision = {
  GetTime,
  GetImageCam,
  updateTime,
  GetCapabilities,
  updateName,
  checkStatus,
  checkStatusDvr,
};
export default apiHikvision;
