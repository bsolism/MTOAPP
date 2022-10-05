import GppGoodIcon from "@mui/icons-material/GppGood";
const columnsSrv = [
  {
    field: "no",
    headerName: "No",
    width: 20,
    renderCell: (index) => {
      return <span>{index.row.row}</span>;
    },
  },
  { field: "name", headerName: "Nombre", width: 140 },
  { field: "location", headerName: "Ubicación", width: 120 },
  {
    field: "type",
    headerName: "Tipo",
    align: "center",
    headerAlign: "center",
    width: 70,
  },
  {
    field: "brand",
    headerName: "Marca",
    width: 90,
    renderCell: (params) => {
      return params.value.name;
    },
  },
  { field: "model", headerName: "Modelo", width: 110 },
  {
    field: "ipAddress",
    headerName: "Dirección IP",
    width: 110,
    renderCell: (params) => {
      return (
        <a href={"http://" + params.value} target="_blank">
          {params.value}
        </a>
      );
    },
  },

  {
    field: "channelIP",
    headerName: "Camaras",
    width: 100,
    hide: true,
  },
  {
    field: "portAnalogo",
    headerName: "Camaras",
    width: 100,
    hide: true,
  },
  {
    field: "cameras",
    headerName: "Camaras",
    width: 100,
    hide: true,
    renderCell: (params) => {
      return params.value.length;
    },
  },
  {
    field: "camerasFull",
    headerName: "Camaras",
    width: 70,
    sortable: false,
    valueGetter: (params) =>
      params.row.cameras !== null
        ? `${params.row.cameras.length}/${
            params.row.channelIP + params.row.portAnalogo
          }`
        : 0,
  },
  {
    field: "slotSata",
    headerName: "Sata",
    hide: true,
  },
  {
    field: "capacityBySlot",
    headerName: "Camaras",
    hide: true,
  },
  {
    field: "interface",
    headerName: "Interface",
    width: 90,
    sortable: false,
    valueGetter: (params) =>
      `${params.row.slotSata}HDD x${params.row.capacityBySlot}TB`,
  },
  {
    field: "sataAvailable",
    headerName: "Sata",
    hide: true,
  },
  {
    field: "capacityTotal",
    headerName: "Camaras",
    hide: true,
  },
  {
    field: "interfaceOcupado",
    headerName: "Ocupado",
    width: 90,
    sortable: false,
    valueGetter: (params) =>
      `${params.row.sataAvailable}HDD x${params.row.capacityTotal}TB`,
  },
  {
    field: "engravedDays",
    headerName: "Dias Disp",
    align: "center",
    width: 70,
  },
  {
    field: "online",
    headerName: "Estado",
    width: 50,
    renderCell: (params) => {
      return params.value ? (
        <div>
          <GppGoodIcon color="success" />
        </div>
      ) : (
        <div>
          <GppGoodIcon color="action" />
        </div>
      );
    },
  },
  {
    field: "serialNumber",
    headerName: "Serie",
    width: 150,
  },
  {
    field: "assetId",
    headerName: "N° Activo",
    width: 150,
  },
];

export default columnsSrv;
