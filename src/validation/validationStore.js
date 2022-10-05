import * as Yup from "yup";

const validationServer = Yup.object().shape({
  id: Yup.string(),
  name: Yup.string().required("Name Required").min(1).label("Name"),
  city: Yup.string().label("User"),
  address: Yup.string().label("Name"),
});

export default validationServer;
