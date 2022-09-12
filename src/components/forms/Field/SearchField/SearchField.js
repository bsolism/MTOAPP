import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

import "./SearchField.scss";

const Search = styled("div")(({ theme }) => ({
  display: "flex",
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.15),
  },

  width: "100%",

  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "80%",

    [theme.breakpoints.up("sm")]: {
      width: "50ch",
      // "&:focus": {
      //   width: "60ch",
      // },
    },
  },
}));

export default function SearchField({ id, data, setData }) {
  const handleChange = (e) => {
    const newData = data.filter((x) =>
      id === "camera"
        ? x.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          x.model.toLowerCase().includes(e.target.value.toLowerCase()) ||
          x.brand.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          x.ipAddress.toLowerCase().includes(e.target.value.toLowerCase()) ||
          x.serialNumber.toLowerCase().includes(e.target.value.toLowerCase()) ||
          x.assetId?.toLowerCase().includes(e.target.value.toLowerCase())
        : id === "server"
        ? x.nombre.toLowerCase().includes(e.target.value.toLowerCase()) ||
          x.modelo.toLowerCase().includes(e.target.value.toLowerCase()) ||
          x.brand.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          x.ipAddress.toLowerCase().includes(e.target.value.toLowerCase()) ||
          x.serialNumber.toLowerCase().includes(e.target.value.toLowerCase()) ||
          x.assetId?.toLowerCase().includes(e.target.value.toLowerCase())
        : x.nombre.toLowerCase().includes(e.target.value.toLowerCase()) ||
          x.ciudad.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setData(newData);
  };
  return (
    <div className="search-Input">
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          onChange={(e) => handleChange(e)}
        />
      </Search>
    </div>
  );
}
