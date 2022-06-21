import React, { useState, useEffect } from "react";

export default function Clock({ dat = "2022-06-06T13:54:35-06:00" }) {
  const [date, setDate] = useState(new Date(dat));
  const [hour, setHour] = useState(date.getHours());
  const [min, setMin] = useState(date.getMinutes());
  const [sec, setSec] = useState(date.getSeconds());

  const refresh = () => {
    if (sec > 58) {
      setSec(0);
      setMin((min) => min + 1);
    }
    if (min > 58) {
      setMin(0);
      setHour((hour) => hour + 1);
    }
    setSec((sec) => sec + 1);
  };

  useEffect(() => {
    dateTime(hour, min, sec);
    const timerId = setInterval(refresh, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [sec]);

  const dateTime = (dhour, dmin, dsecon) => {
    var year = date.getFullYear();
    var month =
      date.getMonth() + 1 <= 9
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    var day = date.getDate() <= 9 ? "0" + date.getDate() : date.getDate();
    // var dhour = date.getHours()<=9?"0"+date.getHours():date.getHours();
    // var dmin = date.getMinutes()<=9?"0"+date.getMinutes():date.getMinutes();
    // var dsecon = date.getSeconds()<=9?"0"+date.getSeconds():date.getSeconds();
    if (dhour <= 9) dhour = "0" + dhour;
    if (dmin <= 9) dmin = "0" + dmin;
    if (dsecon <= 9) dsecon = "0" + dsecon;
    console.log(
      year + "-" + month + "-" + day + "T" + dhour + ":" + dmin + ":" + dsecon
    );
    setDate(
      new Date(
        year + "-" + month + "-" + day + "T" + dhour + ":" + dmin + ":" + dsecon
      )
    );
  };

  return <span>{date.toLocaleTimeString()}</span>;
}
