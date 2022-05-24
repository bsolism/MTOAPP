import { API_HOST } from "../utils/constant";
import axios from "axios";
import { endPoint } from "./endPoint";

const GetBrand = () => {
  const url = `${API_HOST}${endPoint.Brand}`;
  return axios
    .get(url)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
};

const apiBrand = { GetBrand };

export default apiBrand;
