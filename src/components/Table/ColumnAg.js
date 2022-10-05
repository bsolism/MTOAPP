const columnAg = [
  {
    field: "no",
    headerName: "No",
    width: 20,
    renderCell: (index) => {
      return <span>{index.row.row}</span>;
    },
  },
  { field: "name", headerName: "Nombre", width: 200 },
  { field: "city", headerName: "Ubicación", width: 260 },
  { field: "address", headerName: "Tipo", width: 300 },
];

export default columnAg;
