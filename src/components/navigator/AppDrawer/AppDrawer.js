import React from "react";

import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Dashboard, CameraOutdoor, Storage, Store } from "@mui/icons-material";

import "./AppDrawer.scss";

export default function AppDrawer({ toggleDrawer, state }) {
  return (
    <div>
      <React.Fragment>
        <SwipeableDrawer
          anchor="left"
          open={state}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <Box
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              <ListItem button component={Link} to="/dashboard">
                <ListItemIcon>
                  <Dashboard />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
              <ListItem button component={Link} to="/camera">
                <ListItemIcon>
                  <CameraOutdoor />
                </ListItemIcon>
                <ListItemText primary="Camaras" />
              </ListItem>
              <ListItem button component={Link} to="/server">
                <ListItemIcon>
                  <Storage />
                </ListItemIcon>
                <ListItemText primary="Servers" />
              </ListItem>
              <ListItem button component={Link} to="/store">
                <ListItemIcon>
                  <Store />
                </ListItemIcon>
                <ListItemText primary="Agency" />
              </ListItem>
            </List>
          </Box>
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}
