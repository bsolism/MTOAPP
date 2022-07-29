import { useState, useEffect } from "react";
import {
  apiCamera,
  apiServer,
  apiBrand,
  apiHikvision,
  apiAgency,
} from "../../../services";
import { toast } from "react-toastify";
import XMLParser from "react-xml-parser";

const useHookDetailCamera = (cam, handleClose, getDta) => {
  const [checked, setChecked] = useState(true);
  const [dateInst, setDateInst] = useState();
  const [dateBuy, setDateBuy] = useState();
  const [image, setImage] = useState();
  const [brands, setBrands] = useState([]);
  const [data, setData] = useState("");
  const [server, setServer] = useState("");
  const [agencies, setAgencies] = useState([]);
  const [agency, setAgency] = useState();
  const [servers, setServers] = useState([]);
  const [checkedMic, setCheckedMic] = useState(true);
  const [mic, setMic] = useState();

  useEffect(() => {
    setData(cam.brandId);
    setServer(cam.serverId);
    setAgency(cam.agenciaId);
    setChecked(cam.isGoodCondition);
    setDateBuy(cam.fechaCompra);
    setDateInst(cam.fechaInstalacion);
    getImage();
    getBrand();
    getAgency();
    getServer();
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

  const getAgency = async () => {
    await apiAgency.GetAgency().then((res) => {
      setAgencies(res.data);
    });
  };
  const getBrand = async () => {
    await apiBrand.GetBrand().then((res) => {
      setBrands(res.data);
    });
  };

  const getImage = async () => {
    await apiHikvision.GetImageCam(cam).then((res) => {
      setImage(res);
    });
  };
  const getServer = async () => {
    await apiServer.GetServer().then((res) => {
      setServers(res.data);
    });
  };

  const handleSubmit = (values) => {
    values.isGoodCondition = checked;
    values.fechaInstalacion = dateInst;
    values.fechaCompra = dateBuy;

    apiCamera.PutCamera(values).then((res) => {
      if (res === undefined) toast.warning("Update error");
      if (res.status === 200) {
        toast("Update Complete");
        getDta();

        handleClose();
      }
    });
  };
  const handleChangeStatus = (event) => {
    setChecked(event.target.checked);
  };
  const handleChangeMic = (event) => {
    setCheckedMic(event.target.checked);
  };
  const handleChangeDateInst = (value) => {
    setDateInst(value);
  };
  const handleChangeDateBuy = (value) => {
    setDateBuy(value);
  };

  return [
    handleSubmit,
    image,
    brands,
    data,
    setData,
    agencies,
    agency,
    setAgency,
    servers,
    server,
    setServer,
    checkedMic,
    mic,
    handleChangeStatus,
    handleChangeMic,
    handleChangeDateInst,
    handleChangeDateBuy,
    dateBuy,
    dateInst,
    checked,
  ];
};

export default useHookDetailCamera;
