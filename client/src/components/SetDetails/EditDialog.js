import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import DateRangeIcon from "@mui/icons-material/DateRange";
import ExtensionIcon from "@mui/icons-material/Extension";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import TagIcon from "@mui/icons-material/Tag";
import PaidIcon from "@mui/icons-material/Paid";
import { useFormik } from "formik";
import { addLegoSetSchema } from "../../validations/addLegoSetYup";
import LegoSetService from "../../services/legoSetService";
import { useParams } from "react-router-dom";

const inputObjects = [
  {
    icon: <LocalOfferIcon />,
    name: "set_name",
    label: "Szett neve",
    type: "text",
  },
  {
    icon: <TagIcon />,
    name: "set_id",
    label: "Szett azonosító",
    type: "text",
  },
  {
    icon: <ExtensionIcon />,
    name: "number_of_pieces",
    label: "Elemek száma",
    type: "number",
  },
  {
    icon: <DateRangeIcon />,
    name: "year_released",
    label: "Megjelenés dátuma",
    type: "number",
  },
  {
    icon: <InsertPhotoIcon />,
    name: "banner",
    label: "Főkép",
    type: "text",
  },
  {
    icon: <InsertPhotoIcon />,
    name: "box",
    label: "Kép a dobozról",
    type: "text",
  },
  {
    icon: <InsertPhotoIcon />,
    name: "real_picture",
    label: "Élőkép",
    type: "text",
  },
  {
    icon: <PaidIcon />,
    name: "min_price",
    label: "Ár -tól (HUF)",
    type: "number",
  },
  {
    icon: <PaidIcon />,
    name: "max_price",
    label: "Ár -ig (HUF)",
    type: "number",
  },
];

const EditDialog = ({
  openEditDialog,
  setOpenEditDialog,
  legoSet,
  setLegoSet,
}) => {
  const [loading, setLoading] = useState(true);
  const legoSetService = new LegoSetService();
  const { id } = useParams();

  const formik = useFormik({
    initialValues: {
      set_name: "",
      set_id: "",
      number_of_pieces: "",
      year_released: "",
      banner: "",
      box: "",
      real_picture: "",
      min_price: "",
      max_price: "",
    },
    validationSchema: addLegoSetSchema,
    onSubmit: (values) => {
      legoSetService.update(id, values);
      setLegoSet(values);
      setOpenEditDialog(false);
    },
  });

  useEffect(() => {
    formik.setFieldValue("set_id", legoSet.set_id ?? "");
    formik.setFieldValue("set_name", legoSet.set_name ?? "");
    formik.setFieldValue("number_of_pieces", legoSet.number_of_pieces ?? "");
    formik.setFieldValue("year_released", legoSet.year_released ?? "");
    formik.setFieldValue("banner", legoSet.banner ?? "");
    formik.setFieldValue("box", legoSet.box ?? "");
    formik.setFieldValue("real_picture", legoSet.real_picture ?? "");
    formik.setFieldValue("min_price", legoSet.min_price ?? "");
    formik.setFieldValue("max_price", legoSet.max_price ?? "");
    setLoading(false);
  }, []);

  return (
    <Dialog
      open={openEditDialog}
      onClose={() => setOpenEditDialog(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Szerkesztés"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {!loading && (
            <form onSubmit={formik.handleSubmit}>
              <Grid container justifyContent={"center"} alignContent={"center"}>
                {inputObjects.map((input) => (
                  <Grid item xs={12} sm={6} key={input.name} className="m-2 p-2">
                    <FormControl
                      error={!!formik.errors[input.name]}
                      className="m-2 p-2"
                    >
                      <TextField
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              {input.icon}
                            </InputAdornment>
                          ),
                        }}
                        type={input.type}
                        id={input.name}
                        name={input.name}
                        label={input.label}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values[input.name]}
                        error={
                          !!formik.errors[input.name] &&
                          formik.touched[input.name]
                        }
                        {...formik.getFieldProps(input.name)}
                      />

                      {formik.touched[input.name] &&
                      formik.errors[input.name] ? (
                        <FormHelperText>
                          {formik.errors[input.name]}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>
                ))}

                <Grid
                  container
                  alignItems={"center"}
                  justifyContent={"space-around"}
                  className="margin-md"
                >
                  <Button
                    type="submit"
                    autoFocus
                    variant="contained"
                    startIcon={<SaveIcon />}
                  >
                    Mentés
                  </Button>
                  <Button
                    autoFocus
                    onClick={() => setOpenEditDialog(false)}
                    variant="text"
                  >
                    Vissza
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
