import GppGoodIcon from "@mui/icons-material/GppGood";
const columnsSrv = [
  {
    filed: "no",
    headerName: "No",
    filterable: false,
    sortable: false,
    width: 20,
    renderCell: (index) => {
      return index.id;
    },
  },
  { field: "name", headerName: "Nombre", width: 140 },
  { field: "location", headerName: "Ubicación", width: 140 },
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
  { field: "model", headerName: "Modelo", width: 130 },
  {
    field: "ipAddress",
    headerName: "Dirección IP",
    width: 120,
    renderCell: (params) => {
      return (
        <a href={"http://" + params.value} target="_blank">
          {params.value}
        </a>
      );
    },
  },

  {
    field: "cameraCapacity",
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
      `${params.row.cameras.length}/${params.row.cameraCapacity}`,
  },
  {
    field: "storage",
    headerName: "storage",
    width: 100,
    hide: true,
  },
  {
    field: "storageAvailable",
    headerName: "storageAvailable",
    width: 100,
    hide: true,
  },
  {
    field: "storageFull",
    headerName: "Discos",
    width: 140,
    sortable: false,
    headerAlign: "center",
    align: "center",
    valueGetter: (params) =>
      `${params.row.storageAvailable}/${params.row.storage}`,
  },
  {
    field: "engravedDays",
    headerName: "Dias Disp",
    align: "center",
    width: 70,
  },
  {
    field: "isGoodCondition",
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
];

export default columnsSrv;
