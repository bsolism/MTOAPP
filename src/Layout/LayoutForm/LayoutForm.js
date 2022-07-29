import React from "react";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Grid, Box } from "@mui/material";
import Form from "../../components/Forms/form/Form";

export default function LayoutForm({ item, onSubmit, children }) {
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <Box
        sx={{
          width: 800,
          height: 200,
        }}
      >
        <Grid container spacing={1}>
          <Form initialValues={item} onSubmit={onSubmit}>
            {children}
          </Form>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
}
