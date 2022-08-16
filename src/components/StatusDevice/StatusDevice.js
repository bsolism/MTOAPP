import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import { Box, Container, Paper, IconButton, Stack } from "@mui/material";
import columns from "./table";
import BasicModal from "../modal/BasicModal";
import LayoutDetailCamera from "../LayoutDetailCamera";
import useHookStatusDevice from "./useHookStatusDevice";

export default function StatusDevice({ dataEvent, dataAg }) {
  const [selectedRow, setSelectedRow] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [dataTable] = useHookStatusDevice(dataEvent, dataAg);
  return (
    <>
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h4" variant="h7" align="center" width="100%">
            Estado de conexion
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <div style={{ height: 500, width: "100%" }}>
              <DataGrid
                rows={dataTable}
                columns={columns}
                rowHeight={30}
                headerHeight={30}
                sx={{
                  fontSize: 12,
                }}
                onSelectionModelChange={(ids) => {
                  const selectedIds = new Set(ids);
                  const selectedRows = dataEvent.filter((row) =>
                    selectedIds.has(row.id)
                  );

                  setSelectedRow(selectedRows);
                }}
                onCellDoubleClick={handleOpen}
                pageSize={100}
              />
            </div>
          </Box>
        </Paper>
      </Container>
      <BasicModal open={open} handleClose={handleClose} data={selectedRow}>
        <LayoutDetailCamera item={selectedRow} handleClose={handleClose} />
      </BasicModal>
    </>
  );
}
