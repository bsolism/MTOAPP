import { API_HOST } from "../utils/constant";
import axios from "axios";
import { endPoint } from "./endPoint";

const PostLog = (value) => {
  const url = `${API_HOST}${endPoint.LogPostServer}`;
  return axios
    .post(url, value)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
};
const GetLogByServerId = (id) => {
  const url = `${API_HOST}${endPoint.LogServer}/${id}`;
  return axios
    .get(url)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
};

const apiLog = {
  PostLog,
  GetLogByServerId,
};
export default apiLog;
