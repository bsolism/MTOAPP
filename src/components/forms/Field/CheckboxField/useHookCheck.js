import { apiHikvision } from "../../../../services";

const useHookCheck = (item, check, setNewValueDate) => {
  const sincDate = () => {
    if (check) {
      var date = new Date();
      const year = date.getFullYear();
      const month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      const hour =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      const min =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      const sec =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      const newDate =
        year +
        "-" +
        month +
        "-" +
        day +
        "T" +
        hour +
        ":" +
        min +
        ":" +
        sec +
        "-06:00";

      setNewValueDate(newDate);
      if (item.brand.name === "Hikvision") {
        apiHikvision.updateTime(newDate, item).then((res) => {});
      }
    }
  };

  return [sincDate];
};
export default useHookCheck;
