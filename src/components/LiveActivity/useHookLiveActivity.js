import { useState } from "react";
import { apiHikvision, apiVivotek, apiEvento, apiLog } from "../../services";
import XMLParser from "react-xml-parser";

const useHookLiveActivity = (
  dataAg,
  setDataAg,
  dataEvent,
  setDataEvent,
  data,
  setData
) => {
  const [dataTable, setDataTable] = useState([]);

  const getByCamera = async (dat) => {
    await apiEvento.GetByCameraId(dat.id).then((res) => {
      if (res.status === 204) {
        sendEvent(dat);
      }
      if (res.status === 200) {
        dat.dateTime = res.data.date;
      }
    });
  };

  const sendEvent = async (dat) => {
    await apiEvento
      .Post({ cameraId: dat.id, comment: dat.comment })
      .then((res) => {
        dat.dateTime = res.data.date;
      });
    await apiLog
      .PostLog({ evento: "OffLine", usuarioId: 1, cameraId: dat.id })
      .then((res) => {});
  };

  const deleteEvent = async (id) => {
    await apiEvento.DeleteEventByCameraId(id).then((res) => {
      console.log(res);
    });
    await apiLog
      .PostLog({ evento: "Online", usuarioId: 1, cameraId: id })
      .then((res) => {});
  };
  const credential = (value) => {
    const cred = {
      name: value.user,
      ipAddress: value.ipAddress,
      password: value.password,
    };
    return cred;
  };

  const MappData = (camera, server, agency) => {
    const dat = {
      id: camera.id,
      name: camera.name,
      ipAddress: camera.ipAddress,
      server: server.nombre,
      channel: server.brandId === 1 ? camera.portChannel : "n/a",
      agency: agency.nombre,
      comment: "OffLine",
      dateTime: "",
    };
    return dat;
  };

  const checkConnect = () => {
    dataAg.map((resp, ind) => {
      resp.srvAg.map((srvAg) => {
        const server = srvAg.server;

        if (server.brandId === 1 && server.portAnalogo > 0) {
          apiHikvision.checkStatusDvr(credential(server)).then((res) => {
            const xmlData = new XMLParser().parseFromString(res.data);
            Mapper(xmlData, server, resp, "dvr", ind);
          });
        }
        if (
          server.brandId === 1 &&
          server.portAnalogo > 0 &&
          server.canalesIP > 0
        ) {
          const cred = credential(server);
          apiHikvision.checkStatus(cred).then((res) => {
            const xmlData = new XMLParser().parseFromString(res.data);
            Mapper(xmlData, server, resp, "nvr", ind);
          });
        }
        if (server.brandId === 1 && server.portAnalogo === 0) {
          const cred = credential(server);
          apiHikvision.checkStatus(cred).then((res) => {
            const xmlData = new XMLParser().parseFromString(res.data);
            Mapper(xmlData, server, resp, "nvr", ind);
          });
        }
        if (server.brandId === 2) {
          server.cameras.map((camera) => {
            const cred = credential(camera);
            apiVivotek.checkStatus(cred).then((res) => {
              if (res.status !== 200) {
                updateStates(camera, resp, false, ind);
                const newData = dataTable.filter((x) => x.id === camera.id);
                if (newData.length === 0) {
                  const dat = MappData(camera, server, resp);
                  const dataSource = dataEvent.filter(
                    (x) => x.cameraId === camera.id
                  );
                  if (dataSource.length === 0) {
                    apiEvento
                      .Post({ cameraId: dat.id, comment: dat.comment })
                      .then((resp) => {
                        dat.dateTime = resp.data.date;
                        setDataEvent((dataEvent) => [...dataEvent, resp.data]);
                      });
                  } else {
                    dat.dateTime = dataSource[0].date;
                  }
                  setDataTable((dataTable) => [...dataTable, dat]);
                }
              }
            });
            return camera;
          });
        }
        return srvAg;
      });
      return resp;
    });
  };

  const updateStates = (camera, agency, value, indexAgency) => {
    data.map((item, index) => {
      if (item.id === camera.id) {
        let newArr = [...data];
        item.isGoodCondition = value;
        newArr[index] = item;
        setData(newArr);
      }
      return item;
    });
    agency.cameras.map((item, index) => {
      if (item.id === camera.id) {
        let newArr = [...dataAg];
        item.isGoodCondition = value;
        newArr[indexAgency].cameras[index] = item;
        setDataAg(newArr);
      }
      return item;
    });
  };

  const Mapper = async (xmlData, server, agency, type, indexAgency) => {
    var channelId = 0;
    var itemCam = "";
    var propName = type === "dvr" ? "resDesc" : "online";
    var propValue = type === "dvr" ? "NO VIDEO" : "false";
    await xmlData.children.map((channelStatus) => {
      channelStatus.children.map((inputCh) => {
        if (inputCh.name === "id") channelId = parseInt(inputCh.value);
        itemCam = server.cameras.filter((x) => x.portChannel === channelId);
        if (inputCh.name === propName && inputCh.value === propValue) {
          if (itemCam.length > 0) {
            updateStates(itemCam[0], agency, false, indexAgency);
            const newItem = dataTable.filter((x) => x.id === itemCam[0].id);
            if (newItem.length === 0) {
              const dat = MappData(itemCam[0], server, agency);
              getByCamera(dat);

              setDataTable((dataTable) => [...dataTable, dat]);
            }
          }
        }

        if (inputCh.name === propName && inputCh.value !== propValue) {
          if (dataEvent.length > 0 && itemCam.length > 0) {
            dataEvent.map((evento) => {
              if (evento.cameraId === itemCam[0].id) {
                deleteEvent(itemCam[0].id);
                updateStates(itemCam[0], agency, true, indexAgency);
                setDataEvent(dataEvent.filter((x) => x.id !== evento.id));
              }
              return evento;
            });
          }
        }
        return inputCh;
      });
      return channelStatus;
    });
  };
  return [dataTable, checkConnect];
};
export default useHookLiveActivity;
