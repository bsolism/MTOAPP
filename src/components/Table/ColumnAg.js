const columnAg = [
  {
    field: "no",
    headerName: "No",
    width: 20,
    renderCell: (index) => {
      return <span>{index.row.row}</span>;
    },
  },
  { field: "nombre", headerName: "Nombre", width: 200 },
  { field: "ciudad", headerName: "Ubicación", width: 260 },
  { field: "direccion", headerName: "Tipo", width: 300 },
];

export default columnAg;
