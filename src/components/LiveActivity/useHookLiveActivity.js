import { useState, useEffect } from "react";
import {
  apiHikvision,
  apiVivotek,
  apiEvento,
  apiLog,
  apiCamera,
} from "../../services";
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

  // useEffect(() => {
  //   initDataTable();
  // }, []);

  const initDataTable = () => {
    dataEvent.slice(0, 1).map((val) => {
      const ag = dataAg.filter((x) => x.id === val.camera.agenciaId);
      if (ag.length > 0) {
        const srv = ag[0].srvAg.filter(
          (x) => x.serverId === val.camera.serverId
        );
        const dat = MappData(val.camera, srv[0].server, ag[0], val.comment);
        setDataTable((dataTable) => [...dataTable, dat]);
      }
    });
  };

  const checkConnect = () => {
    dataAg.map((ag, ind) => {
      ag.srvAg.map((srvAg) => {
        const server = srvAg.server;
        checkDvr(server, ag, ind);
        checkDvrHibrido(server, ag, ind);
        checkNVR(server, ag, ind);
        checkVivotek(server, ag, ind);
        return srvAg;
      });
      return ag;
    });
  };
  const checkDvr = (server, ag, ind) => {
    if (server.brandId === 1 && server.portAnalogo > 0) {
      apiHikvision.checkStatusDvr(credential(server)).then((res) => {
        if (res.status === 200) {
          dataSuccessful(res.data, server, ag, "dvr", ind);
        }
        if (res.status === 404) {
          dataUnsuccessful(ag, ind, "DVR Error", server, "");
        }
      });
    }
  };
  const checkDvrHibrido = (server, ag, ind) => {
    if (
      server.brandId === 1 &&
      server.portAnalogo > 0 &&
      server.canalesIP > 0
    ) {
      const cred = credential(server);
      apiHikvision.checkStatus(cred).then((res) => {
        if (res.status === 200) {
          dataSuccessful(res.data, server, ag, "dvr", ind);
        }
        if (res.status === 404) {
          dataUnsuccessful(ag, ind, "DVR Error", server, "");
        }
      });
    }
  };
  const checkNVR = (server, ag, ind) => {
    if (server.brandId === 1 && server.portAnalogo === 0) {
      const cred = credential(server);
      apiHikvision.checkStatus(cred).then((res) => {
        if (res.status === 200) {
          dataSuccessful(res.data, server, ag, "nvr", ind);
        }
        if (res.status === 404) {
          dataUnsuccessful(ag, ind, "NVR Error", server, "");
        }
      });
    }
  };
  const checkVivotek = (server, ag, ind) => {
    if (server.brandId === 2) {
      server.cameras.map((camera) => {
        const cred = credential(camera);
        apiVivotek.checkStatus(cred).then((res) => {
          if (res.status !== 200) {
            dataUnsuccessful(ag, ind, "OffLine", server, camera);
          }
          if (res.status === 200) {
            dataSuccessful("", server, ag, "", ind, camera);
          }
        });
        return camera;
      });
    }
  };
  const credential = (value) => {
    const cred = {
      name: value.user,
      ipAddress: value.ipAddress,
      password: value.password,
    };
    return cred;
  };
  const dataSuccessful = (data, server, ag, type, ind, camera) => {
    if (server.brandId === 1) {
      const xmlData = new XMLParser().parseFromString(data);
      Mapper(xmlData, server, ag, type, ind);
    }
    if (server.brandId === 2) {
      const item = dataEvent.filter((x) => x.cameraId === camera.id);
      if (item.length > 0) {
        updateDb(camera, true);
        deleteEvent(camera.id);
      }
      updateStates(camera, ag, true, ind);
    }
  };

  const dataUnsuccessful = (ag, ind, msg, server, cam) => {
    if (server.brandId === 1) {
      server.cameras.map((cam) => {
        updateDb(cam, false);
        update(cam, server, ag, false, ind, msg);
        return cam;
      });
    }
    if (server.brandId === 2) {
      updateDb(cam, false);
      update(cam, server, ag, false, ind, msg);
    }
  };
  const deleteEvent = async (id) => {
    await apiEvento.DeleteEventByCameraId(id).then((res) => {});
    await apiLog
      .PostLog({ evento: "Online", usuarioId: 1, cameraId: id })
      .then((res) => {});
  };

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
  const MappData = (camera, server, agency, comment = "OffLine") => {
    const dat = {
      id: camera.id,
      name: camera.name,
      ipAddress: camera.ipAddress,
      server: server.nombre,
      channel: server.brandId === 1 ? camera.portChannel : "n/a",
      agency: agency.nombre,
      comment: comment,
      dateTime: "",
    };
    return dat;
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
            updateDb(itemCam[0], false);
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
                updateDb(itemCam[0], true);
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
  const sendEvent = async (dat) => {
    await apiEvento
      .Post({ cameraId: dat.id, comment: dat.comment })
      .then((res) => {
        dat.dateTime = res.data.date;
        setDataEvent((dataEvent) => [...dataEvent, res.data]);
      });
    await apiLog
      .PostLog({ evento: "OffLine", usuarioId: 1, cameraId: dat.id })
      .then((res) => {});
  };
  const setTable = (cam, server, ag, erro) => {
    const dat = MappData(cam, server, ag, erro);
    setEventData(cam, dat);
    setDataTable((dataTable) => [...dataTable, dat]);
  };
  const setEventData = (cam, dat) => {
    const dataSource = dataEvent.filter((x) => x.cameraId === cam.id);
    if (dataSource.length === 0) {
      sendEvent(dat);
    } else {
      dat.dateTime = dataSource[0].date;
    }
  };
  const update = (cam, server, ag, value, ind, msg) => {
    updateStates(cam, ag, value, ind);
    const newData = dataTable.filter((x) => x.id === cam.id);
    if (newData.length === 0) {
      setTable(cam, server, ag, msg);
    }
  };

  const updateStates = (camera, agency, value, indexAgency) => {
    data.map((item, index) => {
      if (item.id === camera.id) {
        let newArr = [...data];
        item.online = value;
        newArr[index] = item;
        setData(newArr);
      }
      return item;
    });
    agency.cameras.map((item, index) => {
      if (item.id === camera.id) {
        let newArr = [...dataAg];
        item.online = value;
        newArr[indexAgency].cameras[index] = item;
        setDataAg(newArr);
      }
      return item;
    });
  };

  const updateDb = async (item, value) => {
    item.online = value;
    await apiCamera.PutCamera(item).then((res) => {});
  };

  return [dataTable, checkConnect];
};
export default useHookLiveActivity;
