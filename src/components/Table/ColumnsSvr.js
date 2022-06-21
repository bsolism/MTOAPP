import GppGoodIcon from "@mui/icons-material/GppGood";
const columnsSrv = [
  {
    field: "no",
    headerName: "No",
    width: 20,
    renderCell: (index) => {
      return <span>{index.id}</span>;
    },
  },
  { field: "nombre", headerName: "Nombre", width: 140 },
  { field: "ubicacion", headerName: "Ubicación", width: 120 },
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
  { field: "modelo", headerName: "Modelo", width: 110 },
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
    field: "canalesIP",
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
      `${params.row.cameras.length}/${
        params.row.canalesIP + params.row.portAnalogo
      }`,
  },
  {
    field: "sata",
    headerName: "Sata",
    hide: true,
  },
  {
    field: "capacidadSata",
    headerName: "Camaras",
    hide: true,
  },
  {
    field: "interface",
    headerName: "Interface",
    width: 90,
    sortable: false,
    valueGetter: (params) =>
      `${params.row.sata}HDD x${params.row.capacidadSata}TB`,
  },
  {
    field: "sataInstalado",
    headerName: "Sata",
    hide: true,
  },
  {
    field: "capacidadSataInstalado",
    headerName: "Camaras",
    hide: true,
  },
  {
    field: "interfaceOcupado",
    headerName: "Ocupado",
    width: 90,
    sortable: false,
    valueGetter: (params) =>
      `${params.row.sataInstalado}HDD x${params.row.capacidadSataInstalado}TB`,
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
