import { useState, useEffect } from "react";
import {
  apiCamera,
  apiHikvision,
  apiVivotek,
  apiGeovision,
  apiLog,
} from "../../../services";
import { toast } from "react-toastify";
import XMLParser from "react-xml-parser";
import _ from "lodash";
import EncrypPass from "../../../helper/EncrypPass/EncrypPass";

const useHookDetailCamera = (cam, data, setData) => {
  const [passEncryp] = EncrypPass();
  const [image, setImage] = useState();
  const [checkedMic, setCheckedMic] = useState(true);
  const [mic, setMic] = useState();

  useEffect(() => {
    getImage();
    checkMic();
  }, []);

  const checkMic = async () => {
    if (cam.brand.name === "Hikvision") {
      await apiHikvision.GetCapabilities(cam).then((res) => {
        if (res.status === 200) {
          var xmlData = new XMLParser().parseFromString(res.data);
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
        } else {
          toast.warning(res.data);
        }
      });
    }
  };

  const getImage = async () => {
    if (cam.server.brand.name === "Hikvision") {
      await apiHikvision.GetImageCam(cam).then((res) => {
        console.log(res);
        setImage(res);
      });
    }
    if (cam.brand.name === "Vivotek" && cam.server.brand.name !== "Hikvision") {
      await apiVivotek.GetImageCam(cam).then((res) => {
        setImage(res);
      });
    }
    if (
      cam.brand.name === "Geovision" &&
      cam.server.brand.name !== "Hikvision"
    ) {
      await apiGeovision.GetImageCam(cam).then((res) => {
        setImage(res);
      });
    }
  };

  const submit = (values) => {
    if (!_.isEqual(values, cam)) {
      updateNameDevice(values, cam);
      if (cam.name !== values.name)
        createLog(cam.id, "Name", cam.name, values.name);
      if (cam.ipAddress !== values.ipAddress)
        createLog(cam.id, "Ip Address", cam.ipAddress, values.ipAddress);
      if (cam.assetId !== values.assetId)
        createLog(cam.id, "Asset", cam.assetId, values.assetId);
      if (cam.user !== values.user)
        createLog(cam.id, "User", cam.user, values.user);
      if (cam.password !== values.password)
        createLog(cam.id, "Password", cam.password, values.password);
      if (cam.serverId !== values.serverId)
        createLog(cam.id, "Server", cam.server.name, values.server.name);
      if (cam.agenciaId !== values.agenciaId)
        createLog(cam.id, "Agency", cam.agencyId, values.agenciaId);
      if (cam.deviceDescription !== values.deviceDescription)
        createLog(
          cam.id,
          "Description",
          cam.deviceDescription,
          values.deviceDescription
        );
      if (cam.location !== values.location)
        createLog(cam.id, "Location", cam.location, values.location);
      if (cam.switch !== values.switch)
        createLog(cam.id, "Switch", cam.switch, values.switch);
      if (cam.portPatchPanel !== values.portPatchPanel)
        createLog(
          cam.id,
          "Port Patch Panel",
          cam.portPatchPanel,
          values.portPatchPanel
        );
      if (cam.connection !== values.connection)
        createLog(cam.id, "Conexion", cam.connection, values.connection);
      if (cam.portSwitch !== values.portSwitch)
        createLog(cam.id, "Port Switch", cam.portSwitch, values.portSwitch);
      if (cam.portChannel !== values.portChannel)
        createLog(cam.id, "Port Channel", cam.portChannel, values.portChannel);
      if (cam.patchPanel !== values.patchPanel)
        createLog(cam.id, "Patch Panel", cam.patchPanel, values.patchPanel);

      if (cam.password !== values.password) {
        values.password = passEncryp(values.serialNumber, values.password);
      }
      apiCamera.PutCamera(values).then((res) => {
        console.log(res);
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
  const updateNameDevice = async (values, item) => {
    if (item.name !== values.name) {
      const data = {
        ipAddress: values.ipAddress,
        name: values.user,
        password: values.password,
        nameDevice: values.name,
      };
      if (item.brand.name === "Hikvision") {
        if (values.type === "IPCamera")
          await apiHikvision.updateName(data).then((res) => {
            if (res.status !== 200) {
              toast("Exception Name: " + res.data);
            }
            console.log(res);
          });
        await apiHikvision.updateNameOSD(values).then((res) => {
          if (res.status !== 200) {
            toast("Exception OSD: " + res.data);
          }
          console.log(res);
        });
      }
      if (item.brand.name === "Vivotek") {
        await apiVivotek.SetName(values).then((res) => {});
        await apiVivotek.SetNameOSD(values).then((res) => {});
      }
    }
  };

  const createLog = (camId, name, oldData, newData) => {
    var msg = "Value Chaged: " + name + " = " + oldData + " => " + newData;
    if (name === "Password") msg = "Password Changed";

    var value = {
      deviceId: camId,
      message: msg,
      userId: 1,
      type: false,
      logType: "Operation",
    };
    apiLog.PostLog(value).then((res) => {
      console.log(res);
    });
  };

  return [submit, image, checkedMic, mic, handleChangeMic];
};

export default useHookDetailCamera;
