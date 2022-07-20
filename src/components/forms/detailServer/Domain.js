import {
  apiBrand,
  apiHikvision,
  apiServer,
  apiDeviceInfo,
} from "../../../services";
import { toast } from "react-toastify";
import XMLParser from "react-xml-parser";

const handleSubmit = (
  values,
  checked,
  dateValue,
  dateValueB,
  checkbox,
  dateTime,
  handleClose,
  getDta
) => {
  values.isGoodCondition = checked;
  values.fechaInstalacion = dateValue;
  values.fechaCompra = dateValueB;

  updateNameDevice(values);

  if (checkbox) {
    if (values.brand.name === "Hikvision") {
      apiHikvision.updateTime(dateTime, values).then((res) => {});
    }
  }
  apiServer.PutSever(values).then((res) => {
    if (res === undefined) toast.warning("Update error");

    if (res.status === 200) {
      toast("Update Complete");
      getDta();
      handleClose();
    }
  });
};
const updateNameDevice = async (values) => {
  const data = {
    ipAddress: values.ipAddress,
    name: values.user,
    password: values.password,
    nameDevice: values.nombre,
  };
  console.log(data);
  await apiHikvision.updateName(data).then((res) => {
    console.log(res);
  });
};
const sincronizer = (checkbox, setDateTime, dateOld) => {
  if (checkbox) {
    var date = new Date();
    const year = date.getFullYear();
    const month =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    const hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    const min =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    const sec =
      date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    const newDate =
      year +
      "-" +
      month +
      "-" +
      day +
      "T" +
      hour +
      ":" +
      min +
      ":" +
      sec +
      "-06:00";

    setDateTime(newDate);
  } else {
    setDateTime(dateOld);
  }
};
const getDataTime = async (
  item,
  setdataSelectBrand,
  setDateTime,
  setDateOld
) => {
  const credential = {
    ipAddress: item.ipAddress,
    name: item.user,
    password: item.password,
  };

  await apiBrand.GetBrand().then((res) => {
    setdataSelectBrand(res.data);
  });
  if (item.brand.name === "Hikvision") {
    await apiHikvision.GetTime(credential).then((res) => {
      if (res.status === 500) toast.warning("no se pudo sincronizar");
      if (res.status === 200) {
        var xmlData = new XMLParser().parseFromString(res.data);
        xmlData.children.map((x) => {
          if (x.name === "localTime") {
            setDateTime(x.value);
            setDateOld(x.value);
          }
        });
      }
    });
  }
};

const domain = { handleSubmit, sincronizer, getDataTime };
export default domain;
