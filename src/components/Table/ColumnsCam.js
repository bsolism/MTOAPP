import GppGoodIcon from "@mui/icons-material/GppGood";

const columnsCam = [
  {
    field: "no",
    headerName: "No",
    width: 20,
    renderCell: (index) => {
      return <span>{index.row.row}</span>;
    },
  },
  { field: "name", headerName: "Nombre", width: 150 },
  { field: "location", headerName: "Ubicación", width: 160 },
  { field: "type", headerName: "Tipo", width: 80 },
  {
    field: "brand",
    headerName: "Marca",
    width: 90,
    renderCell: (params) => {
      return params.value.name;
    },
  },
  { field: "model", headerName: "Modelo", width: 100 },
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
    field: "server",
    headerName: "Servidor",
    width: 100,
    renderCell: (params) => {
      return params.value ? params.value.name : "Not Server";
    },
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

export default columnsCam;
