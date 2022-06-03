import GppGoodIcon from "@mui/icons-material/GppGood";

const columnsCam = [
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
  { field: "name", headerName: "Nombre", width: 150 },
  { field: "location", headerName: "Ubicación", width: 220 },
  { field: "type", headerName: "Tipo", width: 100 },
  {
    field: "brand",
    headerName: "Marca",
    width: 90,
    renderCell: (params) => {
      return params.value.name;
    },
  },
  { field: "model", headerName: "Modelo", width: 150 },
  {
    field: "ipAddress",
    headerName: "Dirección IP",
    width: 140,
    renderCell: (params) => {
      return (
        <a href={"http://" + params.value} target="_blank">
          {params.value}
        </a>
      );
    },
  },
  {
    field: "server",
    headerName: "Servidor",
    width: 100,
    renderCell: (params) => {
      return params.value.name;
    },
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
export default columnsCam;
