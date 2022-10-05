import { API_HOST } from "../utils/constant";
import axios from "axios";
import { endPoint } from "./endPoint";

const GetDataSheet = (id) => {
  const url = `${API_HOST}${endPoint.datasheet}/${id}`;
  return axios
    .get(url)
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
  data.append("deviceId", value.deviceId);
  data.append("file", value.file);
  const url = `${API_HOST}${endPoint.datasheet}`;

  return axios
    .post(url, data, { headers: { Accept: "application/pdf;base64" } })
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

const apiDataSheet = {
  PostFile,
  GetDataSheet,
  GetPdf,
};
export default apiDataSheet;
