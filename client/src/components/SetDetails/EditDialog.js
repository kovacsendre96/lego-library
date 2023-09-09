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
import PaidIcon from "@mui/icons-material/Paid";
import { useFormik } from "formik";
import { addLegoSetSchema } from "../../validations/addLegoSetYup";
import LegoSetService from "../../services/legoSetService";
import { useParams } from "react-router-dom";

const inputObjects = [
  {
    icon: <InsertPhotoIcon />,
    name: "box_img_url",
    label: "Kép a dobozról",
    type: "text",
  },
  {
    icon: <InsertPhotoIcon />,
    name: "real_picture_img_url",
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
  legoDataFromMyList,
  setLegoDataFromMyList
}) => {
  const [loading, setLoading] = useState(true);
  const legoSetService = new LegoSetService();
  const { id } = useParams();
  const formik = useFormik({
    initialValues: {
      box_img_url: "",
      real_picture_img_url: "",
      min_price: "",
      max_price: "",
    },
    validationSchema: addLegoSetSchema,
    onSubmit: (values) => {
      const updatedLegoSet = { ...legoDataFromMyList, ...values }
      legoSetService.update(id, updatedLegoSet);
      setLegoSet(updatedLegoSet);
      setLegoDataFromMyList(updatedLegoSet);
      setOpenEditDialog(false);
    },
  });

  useEffect(() => {
    formik.setFieldValue("box_img_url", legoDataFromMyList?.box_img_url ?? "");
    formik.setFieldValue("real_picture_img_url", legoDataFromMyList?.real_picture_img_url ?? "");
    formik.setFieldValue("min_price", legoDataFromMyList?.min_price ?? "");
    formik.setFieldValue("max_price", legoDataFromMyList?.max_price ?? "");
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
