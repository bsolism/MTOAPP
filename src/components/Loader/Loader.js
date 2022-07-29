import React from "react";
import Lottie from "react-lottie";
import animationData from "../../assets/animation/lf30.json";
import loader from "../../assets/animation/loader.json";
export default function Loader({ origin, height = 200, width = 300 }) {
  const defaultOption = {
    loop: true,
    autoplay: true,
    animationData: origin === "detail" ? loader : animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      <Lottie options={defaultOption} height={height} width={width} />
    </div>
  );
}
