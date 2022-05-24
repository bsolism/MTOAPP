import Home from "../page/home";
import Camera from "../page/camera";
import Server from "../page/server";
import Dashboard from "../page/dashboard";
import AddCameraPage from "../page/addCamera";
import AddServerPage from "../page/addServer";
import AddStorePage from "../page/addStore";
import Store from "../page/store";

export default [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/camera",
    element: <Camera />,
  },
  {
    path: "/server",
    element: <Server />,
  },
  {
    path: "/Dashboard",
    element: <Dashboard />,
  },
  {
    path: "/store",
    element: <Store />,
  },
  {
    path: "/camera/add",
    element: <AddCameraPage />,
  },
  {
    path: "/server/add",
    element: <AddServerPage />,
  },
  {
    path: "/store/add",
    element: <AddStorePage />,
  },
];
