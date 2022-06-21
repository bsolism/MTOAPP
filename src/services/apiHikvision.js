import { API_HOST } from "../utils/constant";
import axios from "axios";
import { endPoint } from "./endPoint";

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
  const url = `${API_HOST}${endPoint.Capabilities}`;
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

const apiHikvision = { GetTime, updateTime, GetCapabilities };
export default apiHikvision;
