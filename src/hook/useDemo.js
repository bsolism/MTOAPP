import { useState } from "react";

const useDemo = () => {
  const [dataDemo, setDataDemo] = useState({
    id: 1,
    nombre: "demo",
    class: "hook",
  });

  return [dataDemo];
};
export default useDemo;
