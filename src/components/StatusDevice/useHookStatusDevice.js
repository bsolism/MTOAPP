import { useState, useEffect } from "react";

const useHookStatusDevice = (dataEvent, dataAg) => {
  const [dataTable, setDataTable] = useState([]);

  useEffect(() => {
    sendDataTable();
  }, [dataEvent]);

  const sendDataTable = () => {
    setDataTable([]);

    if (dataEvent.length > 0) {
      const data = dataEvent.filter((x) => x.camera.retired === false);
      data.map((e) => {
        const ag = dataAg.filter((x) => x.id === e.camera.agencyId);
        const dat = MappData(
          e.camera,
          e.camera.server,
          ag[0],
          e.comment,
          e.date
        );
        setDataTable((dataTable) => [...dataTable, dat]);
      });
    }
  };
  const MappData = (camera, server, agency, comment, dateTime) => {
    const dat = {
      id: camera.id,
      name: camera.name,
      ipAddress: camera.ipAddress,
      server: server.name,
      channel: server.brand.name === "Vivotek" ? camera.portChannel : "n/a",
      agency: agency.name,
      comment: comment,
      dateTime: dateTime,
    };
    return dat;
  };

  return [dataTable];
};

export default useHookStatusDevice;
