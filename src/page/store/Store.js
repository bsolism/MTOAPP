import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { ListItem, ListItemIcon } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Link } from "react-router-dom";
import SearchField from "../../components/Forms/field/SearchField";
import Body from "../../components/Body";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../Layout/MainLayout";
import useHookStore from "./useHookStore";
import columnAg from "../../components/Table/ColumnAg";

import "./Store.scss";

export default function Store() {
  const [selectedRow, setSelectedRow] = useState();
  const navigate = useNavigate();
  const [dataRow, setDataRow] = useState([]);
  const [data] = useHookStore(setDataRow);

  return (
    <MainLayout>
      <div className="cabecera">
        <SearchField id="agency" data={data} setData={setDataRow} />
        <ListItem className="list" button component={Link} to="/store/add">
          <ListItemIcon>
            <Add />
          </ListItemIcon>
        </ListItem>
      </div>

      <Body>
        <div style={{ height: 500, width: "100%" }}>
          {data.length > 0 ? (
            <DataGrid
              rows={dataRow}
              columns={columnAg}
              key={data.id}
              rowHeight={30}
              headerHeight={30}
              sx={{
                fontSize: 12,
              }}
              pageSize={100}
              onSelectionModelChange={(ids) => {
                const selectedIds = new Set(ids);
                const selectedRows = data.filter((row) =>
                  selectedIds.has(row.id)
                );

                setSelectedRow(selectedRows);
              }}
              onCellDoubleClick={() =>
                navigate("/datasheet", { state: selectedRow })
              }
            />
          ) : null}
        </div>
      </Body>
    </MainLayout>
  );
}
