import * as Yup from "yup";

const validationCamera = Yup.object().shape({
  name: Yup.string().required("Name Required").min(1).label("Name"),
  user: Yup.string().label("User"),
  password: Yup.string().label("Name"),
  location: Yup.string().required("Location Required").min(1).label("Location"),
  type: Yup.string().required("Type Required").min(1).label("Type"),
  model: Yup.string().required("Model Required").min(1).label("Model"),
  ipAddress: Yup.string().label("Address"),
  mac: Yup.string().label("Mac"),
  isGoodCondition: Yup.bool(),
  dateInstallation: Yup.date().label("Date Installation"),
  dateBuys: Yup.date().label("Date Buys"),
});
export default validationCamera;
