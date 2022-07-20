import { API_HOST } from "../utils/constant";
import axios from "axios";
import { endPoint } from "./endPoint";

const Get = () => {
  const url = `${API_HOST}${endPoint.evento}`;
  return axios
    .get(url)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

const Post = (value) => {
  const url = `${API_HOST}${endPoint.evento}`;
  return axios
    .post(url, value)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
};
const GetByCameraId = (id) => {
  const url = `${API_HOST}${endPoint.evento}/camera/${id}`;
  return axios
    .get(url)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
};
const Delete = (id) => {
  const url = `${API_HOST}${endPoint.evento}/${id}`;
  return axios
    .delete(url)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};
const DeleteEventByCameraId = (id) => {
  const url = `${API_HOST}${endPoint.evento}/camera/${id}`;
  return axios
    .delete(url)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};
const apiEvento = {
  Get,
  Post,
  GetByCameraId,
  Delete,
  DeleteEventByCameraId,
};
export default apiEvento;
