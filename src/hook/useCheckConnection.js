import { useState, useEffect } from "react";
import { apiHikvision, apiVivotek, apiCamera, apiEvento } from "../services";
import XMLParser from "react-xml-parser";

const useCheckConnection = (data) => {
  const [dataTable, setDataTable] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [agency, setAgency] = useState([]);
  const [server, setServer] = useState([]);
  const [next, setnext] = useState(2);
  const [channelStus, setChannelStus] = useState([]);
  //const [dataXml, setDataXml] = useState();

  const checkStatus = async (credential) => {
    var xmlData = null;
    await apiHikvision.checkStatus(credential).then((res) => {
      xmlData = new XMLParser().parseFromString(res.data);
      //mapper(xmlData, srv, value);
    });
    return isOnline(xmlData);
  };

  const credential = (value) => {
    return {
      name: value.user,
      ipAddress: value.ipAddress,
      password: value.password,
    };
  };

  const getAgency = () => {
    setAgency([]);
    data.slice(4, 5).map((val) => {
      setAgency((agency) => [...agency, val]);
    });
  };
  const getCameraByChannel = (id, serverId) => {
    return apiCamera.GetCameraByChannel(id, serverId).then((res) => {
      return res;
    });
  };
  const getTimeEvent = async (dat) => {
    await apiEvento.GetByCameraId(dat.id).then((res) => {
      if (res.status === 200) {
        dat.dateTime = res.data.date;
      }
    });

    return dat;
  };
  const setListCamera = async (channelId, server) => {
    await getCameraByChannel(channelId, server.id).then((x) => {
      if (x.status === 200) {
        handleChangeDataFilter(x.data, server);
      }
    });
  };

  const getServer = async () => {
    setServer([]);
    await data.slice(4, 5).map((ag) => {
      ag.srvAg.map((srv) => {
        console.log(srv);
        setServer((server) => [...server, srv.server]);
      });
    });
    console.log(server);
  };
  const handleChangeDataFilter = (dataRes, server) => {
    var agencyNameFilter = data.filter((x) => x.id === dataRes.agenciaId);
    var agencyName = agencyNameFilter[0].nombre;

    const dat = {
      id: dataRes.id,
      name: dataRes.name,
      ipAddress: dataRes.ipAddress,
      server: server.nombre,
      channel: dataRes.portChannel,
      agency: agencyName,
      comment: "OffLine",
      dateTime: "",
    };
    getTimeEvent(dat);
    console.log(dat);
    const item = filterData.filter((x) => x.id === dat.id);
    if (item.length === 0) {
      setFilterData((filterData) => [...filterData, dat]);
    }
  };

  const handleConect = async () => {
    await getServer();
    console.log(server);
    if (server.length > 0) {
      server.map((value) => {
        checkStatus(credential(value)).then(() => {});
        if (channelStus.length > 0) {
          channelStus.map((res) => {
            setListCamera(res.channelId, value);
            console.log(filterData);
          });
        }
      });
    }
    // getAgency();
    // console.log(agency);
    // if (agency.length > 0) {
    //   getServer(agency);
    // }

    // agency.slice(4, 5).map((value) => {
    //   value.srvAg.map((srv) => {
    //     if (srv.server.brandId === 1) {
    //       const cred = {
    //         name: srv.server.user,
    //         ipAddress: srv.server.ipAddress,
    //         password: srv.server.password,
    //       };

    //       apiHikvision.checkStatus(cred).then((res) => {
    //         var xmlData = new XMLParser().parseFromString(res.data);

    //         mapper(xmlData, srv, value);
    //       });
    //     }
    //     if (srv.server.brandId === 2) {
    //       srv.server.cameras.map((resp) => {
    //         const cred = {
    //           name: resp.user,
    //           ipAddress: resp.ipAddress,
    //           password: resp.password,
    //         };
    //         apiVivotek.checkStatus(cred).then((res) => {
    //           if (res.status !== 200) {
    //             const dat = {
    //               id: resp.id,
    //               name: resp.name,
    //               ipAddress: resp.ipAddress,
    //               server: srv.server.nombre,
    //               channel: "n/a",
    //               agency: value.nombre,
    //               comment: "OffLine",
    //             };
    //             const newData = dataTable.filter((x) => x.id === dat.id);
    //             if (newData.length === 0) {
    //               setDataTable((dataTable) => [...dataTable, dat]);
    //             }
    //           }
    //         });
    //       });
    //     }
    //   });
    // });
  };

  const isOnline = async (xmlData) => {
    if (xmlData !== null) {
      setChannelStus([]);
      var channel = "";
      var online = true;

      await xmlData.children.map((inputChannel) => {
        inputChannel.children.slice(0, 3).map((channelStatus) => {
          if (channelStatus.name === "id") channel = channelStatus.value;
          if (
            channelStatus.name === "online" &&
            channelStatus.value === "false"
          ) {
            online = false;
            setChannelStus((channelStus) => [
              ...channelStus,
              { channelId: channel, onlineStatus: online },
            ]);
          }
        });
      });
      return channelStus;
    }
  };

  const setEvent = (dat) => {
    apiEvento.Post({ cameraId: dat.id, comment: dat.comment }).then((res) => {
      dat.dateTime = res.data.date;
    });
  };

  const mapper = (xmlData, srv, value) => {
    var channel = "";

    xmlData.children.map((input) => {
      input.children.map((val) => {
        if (val.name === "id") channel = val.value;
        if (val.name === "online" && val.value === "false") {
          apiCamera.GetCameraByChannel(channel, srv.serverId).then((res) => {
            if (res.status === 200) {
              const dat = {
                id: res.data.id,
                name: res.data.name,
                ipAddress: res.data.ipAddress,
                server: srv.server.nombre,
                channel: channel,
                agency: value.nombre,
                comment: "OffLine",
                dateTime: "",
              };
              const newData = filterData.filter((x) => x.id === dat.id);
              //const newData = dataTable.filter((x) => x.id === dat.id);

              if (newData.length === 0) {
                setFilterData((filterData) => [...filterData, dat]);
                //setDataTable((dataTable) => [...dataTable, dat]);
              }
              apiEvento.GetByCameraId(dat.id).then((res) => {
                if (res.status === 200) {
                  dat.dateTime = res.data.date;
                } else {
                  apiEvento
                    .Post({ cameraId: dat.id, comment: dat.comment })
                    .then((res) => {
                      dat.dateTime = res.data.date;
                    });
                }
              });

              //   apiEvento.Post({ cameraId: dat.id }).then((res) => {
              //     dat.dateTime = res.data.date;
              //   });
            }
          });
        }
      });
    });
    console.log(filterData);
    console.log(dataTable);
  };

  return [dataTable, handleConect, setDataTable];
};
export default useCheckConnection;
