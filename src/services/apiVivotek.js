import { API_HOST } from "../utils/constant";
import axios from "axios";
import { endPoint } from "./endPoint";

const checkStatus = (values) => {
  const url = `${API_HOST}${endPoint.vivotek}/checkvideo`;
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
  const url = `${API_HOST}${endPoint.vivotek}/image`;
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
  const url = `${API_HOST}${endPoint.vivotek}/info`;
  return axios
    .post(url, data)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
};
const SetName = (data) => {
  const url = `${API_HOST}${endPoint.vivotek}/setName`;
  return axios
    .post(url, data)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
};
const SetNameOSD = (data) => {
  const url = `${API_HOST}${endPoint.vivotek}/setnameosd`;
  return axios
    .post(url, data)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
};

const apiVivotek = {
  checkStatus,
  GetImageCam,
  GetInfo,
  SetName,
  SetNameOSD,
};
export default apiVivotek;
