import React from "react";
import PropTypes from "prop-types";
import { Tab, Tabs, Typography, Box } from "@mui/material";
import DetailServer from "../Forms/detailServer";
import History from "../History";
import DisplayPdf from "../../page/DisplayPdf";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function allyProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ item, handleClose, data, setData }) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log(data);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Detalle" {...allyProps(0)} />
          <Tab label="Historico" {...allyProps(1)} />
          <Tab label="DataSheet" {...allyProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <DetailServer
          item={item}
          handleClose={handleClose}
          data={data}
          setData={setData}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <History item={item} origen="server" />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <DisplayPdf item={item} />
      </TabPanel>
    </Box>
  );
}
