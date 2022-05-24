import { API_HOST } from "../utils/constant";
import axios from "axios";
import { endPoint } from "./endPoint";

const GetCameraInfoHik = (data) => {
  const url = `${API_HOST}${endPoint.Hikvision}`;
  return axios
    .post(url, data)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
};
const GetCameraInfoViv = (data) => {
  const url = `${API_HOST}${endPoint.Vivotek}`;
  return axios
    .post(url, data)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
};
const apiDeviceInfo = { GetCameraInfoHik, GetCameraInfoViv };
export default apiDeviceInfo;
