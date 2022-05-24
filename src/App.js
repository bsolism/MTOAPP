import { useState, useEffect } from "react";
import { AuthContext } from "./utils/context";
import { ToastContainer } from "react-toastify";

import Routing from "./routes/routing";
import BasicModal from "./components/modal";

function App() {
  const [user, setUser] = useState("user");

  useEffect(() => {
    setUser("user");
  }, []);

  return (
    <>
      <Routing />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
