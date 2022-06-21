import * as Yup from "yup";
import initialValues from "../models/server";

const validationServer = Yup.object().shape({
  name: Yup.string().required("Name Required").min(1).label("Name"),
  user: Yup.string().label("User"),
  password: Yup.string().label("Name"),
  location: Yup.string().required("Location Required").min(1).label("Location"),
  type: Yup.string().required("Type Required").min(1).label("Type"),
  //brandId: Yup.number().required("Brand Required").min(1).label("Brand"),
  model: Yup.string().required("Model Required").min(1).label("Model"),
  ipAddress: Yup.string().label("Address"),
  mac: Yup.string().label("Mac"),
  cameraCapacity: Yup.number()
    .required("Cant Cam. required")
    .min(1)
    .label("Camera Capacity"),
  cameraAvailable: Yup.number()
    .required("Cant Cam. Disp. required")
    .min(1)
    .label("Camera Available"),
  storage: Yup.string()
    .required("Cant Storage required")
    .min(1)
    .label("Storage Capacity"),
  storageAvailable: Yup.string()
    .required("Cant Storage required")
    .min(1)
    .label("Storage Available"),
  engravedDays: Yup.number()
    .required("Engraved Days Required")
    .min(1)
    .label("Error Engraved Days"),
  isGoodCondition: Yup.bool(),
  dateInstallation: Yup.date().label("Date Installation"),
  dateBuys: Yup.date().label("Date Buys"),
});

validationServer
  .validate(initialValues)
  .then((result) => {})
  .catch((err) => {});

export default validationServer;
