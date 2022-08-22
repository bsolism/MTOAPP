import { useState } from "react";
import { Buffer } from "buffer";

const EncrypPass = () => {
  const passEncryp = (serial, pass) => {
    let passEnc = serial + "|" + pass;
    let bufferObj = Buffer.from(passEnc, "utf8");
    let base64Str = bufferObj.toString("base64");
    window.Buffer = window.Buffer || require("buffer").Buffer;
    return base64Str;
  };

  return [passEncryp];
};

export default EncrypPass;
