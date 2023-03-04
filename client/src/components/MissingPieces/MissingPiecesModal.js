import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import SaveIcon from "@mui/icons-material/Save";
import ExtensionIcon from "@mui/icons-material/Extension";
import MissingPiecesService from "../../services/missingPiecesService";
import { useRef } from "react";

const MissingPiecesModal = ({
  selectedRows,
  setSelectedParts,
  addMissingPartsModal,
  setAddMissingPartsModal,
  setId,
}) => {
  const hiddebButton = useRef();

  const missingPiecesService = new MissingPiecesService();
  let initialValues = {};
  let yupValues = {};

  selectedRows.forEach((row) => {
    initialValues[row.part_num] = "";
    yupValues[row.part_num] = yup.string().required("Mező kitöltése kötelező");
  });

  const addMissingPieceSchema = yup.object().shape({
    ...yupValues,
  });

  const formik = useFormik({
    initialValues: {
      ...initialValues,
    },
    validationSchema: addMissingPieceSchema,
    onSubmit: (values) => {
      const apiData = selectedRows.map((row, index) => {
        return {
          piece_id: row.id,
          image: row.img,
          name: row.name,
          set_id: setId,
          quantity: Object.values(values)[index],
          color: row.color,
          collected: false,
        };
      });
      missingPiecesService.store(apiData);
      setAddMissingPartsModal(false);
      setSelectedParts([]);
      formik.resetForm();
    },
  });

  return (
    <Dialog
      maxWidth="md"
      open={addMissingPartsModal}
      onClose={() => setAddMissingPartsModal(false)}
    >
      <DialogTitle>{"Hiányzó elemek hozzáadása"}</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Kép</TableCell>
                  <TableCell>ID</TableCell>
                  <TableCell>Név</TableCell>
                  <TableCell>Hiányzó darabok</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedRows.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      <Box height={80} width={80}>
                        <img
                          className="img-thumbnail"
                          alt={row.name}
                          src={row.img}
                        />
                      </Box>
                    </TableCell>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>
                      <FormControl
                        error={!!formik.errors[row.part_num]}
                        className="m-2"
                      >
                        <TextField
                          id={row.part_num}
                          name={row.part_num}
                          label={"Darabszám"}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values[row.part_num]}
                          error={
                            !!formik.errors[row.part_num] &&
                            formik.touched[row.part_num]
                          }
                          {...formik.getFieldProps(row.part_num)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <ExtensionIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                        {formik.touched[row.part_num] &&
                        formik.errors[row.part_num] ? (
                          <FormHelperText>
                            {formik.errors[row.part_num]}
                          </FormHelperText>
                        ) : null}
                      </FormControl>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            type="submit"
            className="!m-3 !hidden"
            children={"Mentés"}
            variant="contained"
            startIcon={<SaveIcon />}
            ref={hiddebButton}
            onClick={async () => {
              Object.keys(await formik.validateForm()).forEach(
                (invalidField) => {
                  formik.setFieldTouched(invalidField);
                }
              );
            }}
          />
        </form>
      </DialogContent>
      <DialogActions className="flex !justify-start">
        <Button
          onClick={() => {
            hiddebButton.current.click();
          }}
          className="!m-3"
          children={"Mentés"}
          variant="contained"
          startIcon={<SaveIcon />}
        />
      </DialogActions>
    </Dialog>
  );
};

export default MissingPiecesModal;
