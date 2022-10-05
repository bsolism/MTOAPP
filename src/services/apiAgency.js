import { API_HOST } from "../utils/constant";
import axios from "axios";
import { endPoint } from "./endPoint";

const GetAgency = () => {
  const url = `${API_HOST}${endPoint.Agency}`;
  return axios
    .get(url)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
};
const GetAgencyById = (id) => {
  const url = `${API_HOST}${endPoint.Agency}/${id}`;
  return axios
    .get(url)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
};
const Post = (value) => {
  console.log(value);
  const url = `${API_HOST}${endPoint.Agency}`;
  console.log(url);
  return axios
    .post(url, value)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
};
const apiAgency = { GetAgency, GetAgencyById, Post };
export default apiAgency;
