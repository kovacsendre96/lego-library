import React, { useState } from "react";
import {
  Autocomplete,
  Button,
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
import RebrickableService from "../../services/rebrickableService";
import { useFormik } from "formik";
import { addLegoSetSchema } from "../../validations/addLegoSetYup";
import SearchIcon from "@mui/icons-material/Search";
import LegoSetService from "../../services/legoSetService";

const inputObjects = [
  {
    icon: <LocalOfferIcon />,
    name: "set_name",
    label: "Szett neve",
    type: "text",
    disabled: true,
  },
  {
    icon: <TagIcon />,
    name: "set_id",
    label: "Szett azonosító",
    type: "text",
    disabled: true,
  },
  {
    icon: <ExtensionIcon />,
    name: "number_of_pieces",
    label: "Elemek száma",
    type: "number",
    disabled: true,
  },
  {
    icon: <DateRangeIcon />,
    name: "year_released",
    label: "Megjelenés dátuma",
    type: "number",
    disabled: true,
  },
  {
    icon: <InsertPhotoIcon />,
    name: "banner",
    label: "Főkép",
    type: "text",
    disabled: true,
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

const NewSetForm = ({ handleDialogClose, setLegoData, legoData }) => {
  const [options, setOptions] = useState([]);
  const [searchValue, setSearchValue] = useState();
  const [inputsDisabled, setInputsDisabled] = useState(false);

  const rebrickableService = new RebrickableService();
  const legoSetService = new LegoSetService();

  async function handleSearch(e) {
    const targetValue = e.target.value;
    setSearchValue(targetValue);
    const searchResults = await rebrickableService.getSets(targetValue);

    const resultArray = searchResults.results.map((result) => {
      return {
        name: `${result.name} (${result.set_num})`,
        value: result.set_num,
      };
    });

    setOptions(resultArray);
  }

  async function handleSetSelect(event, option) {
    const result = await rebrickableService.getSetById(option.value);
    formik.setFieldValue("set_id", result.set_num ?? "");
    formik.setFieldValue("set_name", result.name ?? "");
    formik.setFieldValue("number_of_pieces", result.num_parts ?? "");
    formik.setFieldValue("year_released", result.year ?? "");
    formik.setFieldValue("banner", result.set_img_url ?? "");
    setInputsDisabled(true);
  }

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
    onSubmit: async (values) => {
      setLegoData((prevState) => [...prevState, values]);
      legoSetService.store(values);
      localStorage.setItem("lego-sets", JSON.stringify([...legoData, values]));
      handleDialogClose();
    },
  });

  function inputDisabled(disable) {
    if (disable && inputsDisabled) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container justifyContent={"center"} alignContent={"center"}>
        <FormControl className="w-full p-2 m-2">
          <Autocomplete
            className="m-2 p-1"
            onChange={handleSetSelect}
            id="search"
            disableClearable
            options={options}
            getOptionLabel={(options) => options.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Keresés"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                  label: "Keresés",
                  name: "search",
                  id: "search",
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={handleSearch}
                value={searchValue}
              />
            )}
          />
        </FormControl>

        <Grid container></Grid>
        {inputObjects.map((input) => (
          <Grid item xs={12} sm={6} key={input.name} className="m-2 p-2">
            <FormControl error={!!formik.errors[input.name]}>
              <TextField
                disabled={inputDisabled(input.disabled)}
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
                  !!formik.errors[input.name] && formik.touched[input.name]
                }
                {...formik.getFieldProps(input.name)}
              />

              {formik.touched[input.name] && formik.errors[input.name] ? (
                <FormHelperText>{formik.errors[input.name]}</FormHelperText>
              ) : null}
            </FormControl>
          </Grid>
        ))}

        <Grid
          container
          alignItems={"center"}
          justifyContent={"space-around"}
          className="m-2"
        >
          {formik.values.banner ? (
            <img
              className="h-[250px] w-full object-contain mb-3"
              src={formik.values.banner}
              alt="banner"
            />
          ) : null}
          <Button
            type="submit"
            autoFocus
            variant="contained"
            startIcon={<SaveIcon />}
            className="m-1"
          >
            {"Készlet felvétele"}
          </Button>
          <Button
            autoFocus
            onClick={handleDialogClose}
            variant="text"
            className="m-1"
          >
            Vissza
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default NewSetForm;
