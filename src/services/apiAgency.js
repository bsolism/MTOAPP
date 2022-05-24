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
const Post = (value) => {
  const url = `${API_HOST}${endPoint.Agency}`;
  console.log(url);
  console.log(value);
  return axios
    .post(url, value)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
};
const apiAgency = { GetAgency, Post };
export default apiAgency;
