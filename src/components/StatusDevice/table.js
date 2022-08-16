const columns = [
  {
    field: "name",
    headerName: "Nombre",

    headerAlign: "center",
    width: 120,
  },

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
    headerName: "Server",

    headerAlign: "center",
    width: 100,
  },
  {
    field: "channel",
    headerName: "Canal",
    align: "center",
    headerAlign: "center",
    width: 50,
  },
  {
    field: "agency",
    headerName: "Agencia",

    headerAlign: "center",
    width: 100,
  },
  {
    field: "comment",
    headerName: "Comentario",
    align: "center",
    headerAlign: "center",
    width: 100,
  },
  {
    field: "dateTime",
    headerName: "Fecha",

    headerAlign: "center",
    width: 180,
  },
];

export default columns;
