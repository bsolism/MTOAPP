import { API_HOST } from "../utils/constant";
import axios from "axios";
import { endPoint } from "./endPoint";

const checkStatus = (values) => {
  const url = `${API_HOST}${endPoint.hik}/channels`;
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
  const url = `${API_HOST}${endPoint.hik}/channel/dvr`;
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
      return error.response;
    });
};
const GetInfo = (data) => {
  const url = `${API_HOST}${endPoint.hik}/info`;
  return axios
    .post(url, data)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
};
const GetDayPlayback = (data) => {
  const url = `${API_HOST}${endPoint.hik}/playback`;
  return axios
    .post(url, data)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
};
const GetTime = (data) => {
  const url = `${API_HOST}${endPoint.hik}/time`;
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

  const url = `${API_HOST}${endPoint.hik}/time`;
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
  const url = `${API_HOST}${endPoint.hik}/info`;
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
  GetInfo,
  GetImageCam,
  updateTime,
  GetCapabilities,
  updateName,
  checkStatus,
  checkStatusDvr,
  GetDayPlayback,
};
export default apiHikvision;
