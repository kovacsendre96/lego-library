import * as yup from "yup";

export const addLegoSetSchema = yup.object().shape({
  box_img_url: yup.string().required("Mező kitöltése kötelező"),
  real_picture_img_url: yup.string().required("Mező kitöltése kötelező"),
  min_price: yup.number().required("Mező kitöltése kötelező"),
  max_price: yup.number().required("Mező kitöltése kötelező"),
});
