import { API_HOST } from "../utils/constant";
import axios from "axios";
import { endPoint } from "./endPoint";

const PostCamera = (value) => {
  const url = `${API_HOST}${endPoint.Camera}`;
  return axios
    .post(url, value)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
};

const GetCamera = () => {
  const url = `${API_HOST}${endPoint.Camera}`;
  return axios
    .get(url)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
};
const GetCameraInfo = (data) => {
  const url = `${API_HOST}/api/camera/deviceinfo`;
  return axios
    .post(url, data)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
};

const apiCamera = { PostCamera, GetCamera, GetCameraInfo };
export default apiCamera;
