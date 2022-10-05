import { API_HOST } from "../utils/constant";
import axios from "axios";
import { endPoint } from "./endPoint";

const GetInfo = (data) => {
  const url = `${API_HOST}${endPoint.panasonic}/info`;
  return axios
    .post(url, data)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
};

const apiPanasonic = {
  GetInfo,
};
export default apiPanasonic;
