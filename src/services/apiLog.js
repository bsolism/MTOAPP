import { API_HOST } from "../utils/constant";
import axios from "axios";
import { endPoint } from "./endPoint";

const PostLog = (value) => {
  console.log(value);
  const url = `${API_HOST}${endPoint.LogPost}`;
  return axios
    .post(url, value)
    .then(function (response) {
      console.log(response);
      return response;
    })
    .catch(function (error) {
      console.log(error.response);
      return error.response;
    });
};
const GetLogByCameraId = (id) => {
  const url = `${API_HOST}${endPoint.Log}/${id}`;
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
  GetLogByCameraId,
};
export default apiLog;
