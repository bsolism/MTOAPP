import { useState, useEffect } from "react";
import {
  apiCamera,
  apiServer,
  apiBrand,
  apiHikvision,
  apiAgency,
  apiVivotek,
  apiGeovision,
} from "../../../services";
import { toast } from "react-toastify";
import XMLParser from "react-xml-parser";
import _ from "lodash";
import EncrypPass from "../../../helper/EncrypPass/EncrypPass";

const useHookDetailCamera = (cam, data, setData) => {
  const [passEncryp] = EncrypPass();
  // const [checked, setChecked] = useState(true);
  // const [dateInst, setDateInst] = useState();
  // const [dateBuy, setDateBuy] = useState();
  const [image, setImage] = useState();
  // const [brands, setBrands] = useState([]);
  // const [data, setData] = useState("");
  // const [server, setServer] = useState("");
  // const [agencies, setAgencies] = useState([]);
  // const [agency, setAgency] = useState();
  // const [servers, setServers] = useState([]);
  const [checkedMic, setCheckedMic] = useState(true);
  const [mic, setMic] = useState();

  useEffect(() => {
    getImage();
    checkMic();
  }, []);

  const checkMic = async () => {
    await apiHikvision.GetCapabilities(cam).then((res) => {
      var xmlData = new XMLParser().parseFromString(res.data);
      if (res.status === 200) {
        xmlData.children.map((x) => {
          if (x.name === "Audio") {
            setMic(true);
            x.children.map((xs) => {
              if (xs.name === "enabled") {
                if (xs.value === "false") {
                  setCheckedMic(false);
                }
              }
            });
          }
        });
      }
    });
  };

  const getImage = async () => {
    if (cam.server.brandId === 1) {
      await apiHikvision.GetImageCam(cam).then((res) => {
        setImage(res);
      });
    }
    if (cam.brandId === 2 && cam.server.brandId !== 1) {
      await apiVivotek.GetImageCam(cam).then((res) => {
        setImage(res);
      });
    }
    if (cam.brandId === 6 && cam.server.brandId !== 1) {
      await apiGeovision.GetImageCam(cam).then((res) => {
        setImage(res);
      });
    }
  };

  const submit = (values) => {
    if (!_.isEqual(values, cam)) {
      if (cam.password !== values.password) {
        values.password = passEncryp(values.serialNumber, values.password);
      }
      apiCamera.PutCamera(values).then((res) => {
        if (res === undefined) toast.warning("Update error");
        if (res.status === 200) {
          data.map((val, index) => {
            if (val.id === values.id) {
              let newArr = [...data];
              newArr[index] = values;
              setData(newArr);
            }
          });
          toast("Update Complete");
        }
      });
    }
  };
  const handleChangeMic = (event) => {
    setCheckedMic(event.target.checked);
  };

  return [submit, image, checkedMic, mic, handleChangeMic];
};

export default useHookDetailCamera;
