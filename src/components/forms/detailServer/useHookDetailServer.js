import { useEffect } from "react";
import { toast } from "react-toastify";
import { apiHikvision, apiServer, apiLog } from "../../../services";
import _ from "lodash";
import EncrypPass from "../../../helper/EncrypPass/EncrypPass";
import XMLParser from "react-xml-parser";

const useHookDetailServer = (
  data,
  setData,
  item,
  setDateDevice,
  ref,
  setDataCam,
  dataCam
) => {
  const [passEncryp] = EncrypPass();

  useEffect(() => {
    dateDevice();
    getPlayback();
  }, []);

  const getPlayback = async () => {
    const data = {
      ipAddress: item.ipAddress,
      name: item.user,
      password: item.password,
    };
    await apiHikvision.GetDayPlayback(data).then((resp) => {
      if (resp.status === 200) {
        console.log("Palyback : " + resp.data.content);
        if (item.engravedDays !== parseInt(resp.data.content)) {
          ref.current.setFieldValue("engravedDays", resp.data.content);
          //item.engravedDays = parseInt(resp.data.content);
        }
      }
    });
  };

  const dateDevice = async () => {
    if (item !== undefined) {
      if (item.brand.name === "Hikvision") {
        const credential = {
          ipAddress: item.ipAddress,
          name: item.user,
          password: item.password,
        };
        await apiHikvision.GetTime(credential).then((res) => {
          if (res.status === 200) {
            var xmlData = new XMLParser().parseFromString(res.data);
            xmlData.children.map((x) => {
              if (x.name === "localTime") {
                setDateDevice(x.value);
              }
              return x;
            });
          } else {
            toast.warning(res.data);
          }
        });
      }
    }
  };

  const submit = async (values) => {
    if (!_.isEqual(values, item)) {
      updateNameDevice(values, item);
      if (item.name !== values.name)
        createLog(item.id, "Name", item.name, values.name);
      if (item.ipAddress !== values.ipAddress)
        createLog(item.id, "Ip Address", item.ipAddress, values.ipAddress);
      if (item.assetId !== values.assetId)
        createLog(item.id, "Asset", item.assetId, values.assetId);
      if (item.user !== values.user)
        createLog(item.id, "User", item.user, values.user);
      if (item.password !== values.password)
        createLog(item.id, "Password", item.password, values.password);
      if (item.type !== values.type)
        createLog(item.id, "Type", item.type, values.type);
      if (item.location !== values.location)
        createLog(item.id, "Location", item.location, values.location);
      if (item.engravedDays !== values.engravedDays)
        createLog(
          item.id,
          "EngravedDays",
          item.engravedDays,
          values.engravedDays
        );
      if (item.sataAvailable !== values.sataAvailable)
        createLog(
          item.id,
          "SataAvailable",
          item.sataAvailable,
          values.sataAvailable
        );
      if (item.capacityTotal !== values.capacityTotal)
        createLog(
          item.id,
          "CapacityTotal",
          item.capacityTotal,
          values.capacityTotal
        );
      if (item.note !== values.note)
        createLog(item.id, "Note", item.note, values.note);

      if (item.password !== values.password) {
        values.password = passEncryp(values.serialNumber, values.password);
      }
      await apiServer.PutSever(values).then((res) => {
        if (res === undefined) toast.warning("Update error");
        if (res.status === 200) {
          data.map((val, index) => {
            if (val.id === values.id) {
              let newArr = [...data];
              newArr[index] = values;
              setData(newArr);
            }
            return val;
          });
          if (item.user !== values.user || item.password !== values.password) {
            updateUserPassInCam(res.data);
          }

          toast("Update Success");
        }
      });
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
    apiLog.PostLog(value).then((res) => {});
  };

  const updateNameDevice = async (values, item) => {
    if (item.name !== values.name) {
      const data = {
        ipAddress: values.ipAddress,
        name: values.user,
        password: values.password,
        nameDevice: values.name,
      };
      await apiHikvision.updateName(data).then((res) => {});
    }
  };

  const updateUserPassInCam = (server) => {
    dataCam.map((cam, index) => {
      if (cam.serverId === server.id) {
        let newArr = [...dataCam];
        newArr[index].server = server;
        setDataCam(newArr);
      }
    });
  };
  return [submit];
};

export default useHookDetailServer;
