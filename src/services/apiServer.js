import { API_HOST } from "../utils/constant";
import axios from "axios";
import { endPoint } from "./endPoint";

const PostServer = (value) => {
  const url = `${API_HOST}${endPoint.Server}`;

  return axios
    .post(url, value)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
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
const PutSever = (value) => {
  const url = `${API_HOST}${endPoint.Server}/${value.id}`;
  return axios
    .put(url, value)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
};

const PostFile = (value) => {
  const data = new FormData();
  data.append("dataSheetName", value.dataSheetName);
  data.append("serverId", value.serverId);
  data.append("file", value.file);

  // for (let [key, value] of data) {
  //   console.log(`${key}: ${value}`);
  // }

  const url = `${API_HOST}${endPoint.FilePost}`;

  return axios
    .post(url, data, { headers: { Accept: "application/pdf;base64" } })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error.response);
      return error.response;
    });
};

const GetDataSheet = (id) => {
  const url = `${API_HOST}${endPoint.hikdatasheet}/${id}`;
  console.log(url);
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
const GetPdf = (name) => {
  const url = `${API_HOST}${endPoint.DataPdf}/${name}`;
  return url;
};

const apiServer = {
  PostServer,
  GetServer,
  PutSever,
  PostFile,
  GetDataSheet,
  GetPdf,
};
export default apiServer;
