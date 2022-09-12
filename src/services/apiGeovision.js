import { API_HOST } from "../utils/constant";
import axios from "axios";
import { endPoint } from "./endPoint";

const GetImageCam = (data) => {
  const url = `${API_HOST}${endPoint.geovision}/image`;
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
      return error.response;
    });
};

const apiVivotek = {
  GetImageCam,
};
export default apiVivotek;
