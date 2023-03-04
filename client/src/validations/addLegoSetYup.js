import * as yup from "yup";

export const addLegoSetSchema = yup.object().shape({
  set_name: yup.string().required("Mező kitöltése kötelező"),
  set_id: yup.string().required("Mező kitöltése kötelező"),
  number_of_pieces: yup.number().required("Mező kitöltése kötelező"),
  year_released: yup.number().required("Mező kitöltése kötelező"),
  banner: yup.string().required("Mező kitöltése kötelező"),
  box: yup.string().required("Mező kitöltése kötelező"),
  real_picture: yup.string().required("Mező kitöltése kötelező"),
  min_price: yup.number().required("Mező kitöltése kötelező"),
  max_price: yup.number().required("Mező kitöltése kötelező"),
});
