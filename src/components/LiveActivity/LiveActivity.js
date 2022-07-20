import React, { useState, useEffect, useCallback } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import { Box, Container, Paper, IconButton, Stack } from "@mui/material";
import columns from "./table";
import useHookLiveActivity from "./useHookLiveActivity";
import SyncIcon from "@mui/icons-material/Sync";
import { apiEvento } from "../../services";
import BasicModal from "../modal/BasicModal";
import LayoutDetailCamera from "../LayoutDetailCamera";

export default function LiveActivity({
  dataSource,
  setDataAg,
  dataEvent,
  setDataEvent,
  data,
  setData,
}) {
  const [dataTable, checkConnect] = useHookLiveActivity(
    dataSource,
    setDataAg,
    dataEvent,
    setDataEvent,
    data,
    setData
  );
  const [selectedRow, setSelectedRow] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    checkConnect();
  }, []);

  const handleChangeDb = async () => {
    await dataEvent.map((x) => {
      const item = dataTable.filter((value) => value.id === x.cameraId);
      if (item.length === 0) {
        apiEvento.Delete(x.id).then((resp) => {
          console.log(resp);
        });
      }
      return;
    });
  };

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
          <Stack direction="row" spacing={1}>
            <IconButton aria-label="refresh" onClick={handleChangeDb}>
              <SyncIcon />
            </IconButton>
          </Stack>
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
                  const selectedRows = data.filter((row) =>
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
