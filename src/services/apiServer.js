import { API_HOST } from "../utils/constant";
import axios from "axios";
import { endPoint } from "./endPoint";

const PostServer = (value) => {
  const url = `${API_HOST}${endPoint.Server}`;
  console.log(value);
  return axios
    .post(url, value)
    .then(function (response) {
      console.log(response.data);
      return response;
    })
    .catch(function (error) {
      console.log(error.response);
      return error.response;
    });
};
const GetServer = () => {
  const url = `${API_HOST}${endPoint.Server}`;
  return axios
    .get(url)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error.response);
      return error.response;
    });
};
const apiServer = { PostServer, GetServer };
export default apiServer;
