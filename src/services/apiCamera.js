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
const PutCamera = (value) => {
  const url = `${API_HOST}${endPoint.Camera}/${value.id}`;
  return axios
    .put(url, value)
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
const GetCameraOnly = () => {
  const url = `${API_HOST}${endPoint.CameraOnly}`;
  return axios
    .get(url)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
};
const GetCameraByChannel = (channel, idServer) => {
  const url = `${API_HOST}${endPoint.Camera}/channel/${channel}/server/${idServer}`;
  return axios
    .get(url)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
};
const GetImageCamHik = (data) => {
  const url = `${API_HOST}${endPoint.CamImageHik}`;
  return axios
    .post(url, data, { responseType: "arraybuffer" })
    .then(function (response) {
      return btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
    })
    .catch(function (error) {
      console.log(error.response);
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
const GetDataSheet = (id) => {
  const url = `${API_HOST}${endPoint.hik}/camera/pdf/${id}`;
  return axios
    .get(url)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
};
const GetPdf = (name) => {
  const url = `${API_HOST}${endPoint.DataPdf}/${name}`;
  return url;
};
const PostFile = (value) => {
  const data = new FormData();
  data.append("dataSheetName", value.dataSheetName);
  data.append("cameraId", value.serverId);
  data.append("file", value.file);
  const url = `${API_HOST}${endPoint.Camera}/pdf`;

  return axios
    .post(url, data, { headers: { Accept: "application/pdf;base64" } })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
};

const apiCamera = {
  PostCamera,
  PostFile,
  GetCamera,
  GetCameraInfo,
  GetCameraOnly,
  PutCamera,
  GetImageCamHik,
  GetCameraByChannel,
  GetDataSheet,
  GetPdf,
};
export default apiCamera;
