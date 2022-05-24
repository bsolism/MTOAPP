import * as Yup from "yup";

const validationServer = Yup.object().shape({
  nombre: Yup.string().required("Name Required").min(1).label("Name"),
  ciudad: Yup.string().label("User"),
  direccion: Yup.string().label("Name"),
});

export default validationServer;
