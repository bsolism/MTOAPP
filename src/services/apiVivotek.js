import { API_HOST } from "../utils/constant";
import axios from "axios";
import { endPoint } from "./endPoint";

const checkStatus = (values) => {
  const url = `${API_HOST}${endPoint.vivotek}/checkvideo`;
  return axios
    .post(url, values)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
};

const apiVivotek = {
  checkStatus,
};
export default apiVivotek;
