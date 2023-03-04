import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TableCell,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import { sendData } from "../../Helpers/axios";

const EditMissingPieces = ({
  missingPiecesRow,
  setIsEditingState,
  setId,
  firebaseRowId,
  setMissingPiecesList,
}) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const { img, id, name, piece, color } = missingPiecesRow;

  const handleCancelClick = () => {
    setIsEditingState(null);
  };

  const handleDeleteClick = (deleteType) => {
    /*     sendData('PUT', `https://lego-project-da06d-default-rtdb.firebaseio.com.json`, null, afterDeletedMissingPiece); */
    if (deleteType === "collected") {
    } else if (deleteType === "delete") {
      sendData(
        "DELETE",
        `https://lego-project-da06d-default-rtdb.firebaseio.com/${setId}/missing_pieces/${firebaseRowId}.json`,
        null,
        afterDeletedMissingPiece
      );
    }
  };

  const afterDeletedMissingPiece = (response) => {
    const afterGetDatabase = (response) => {
      if (response.status === 200) {
        window.location.reload(false);
      }
    };
    sendData(
      "GET",
      "https://lego-project-da06d-default-rtdb.firebaseio.com/.json",
      null,
      afterGetDatabase
    );
  };

  return (
    <Fragment>
      <TableCell align="left" key="1" component="th" scope="row">
        <TextField value={img} />
      </TableCell>
      <TableCell key="2" align="left">
        <TextField value={id} />
      </TableCell>

      <TableCell key="3" align="left">
        <TextField value={name} />
      </TableCell>
      <TableCell key="4" align="left">
        <TextField value={piece} />
      </TableCell>
      <TableCell key="5" align="left">
        <TextField value={color} />
      </TableCell>
      <TableCell key="6" align="left">
        <Grid container justifyContent={"space-around"}>
          <Tooltip title="Mentés" placement="top">
            <SaveIcon className="main-blue-color pointer-cursor" />
          </Tooltip>
          <Tooltip title="Törlés" placement="top">
            <DeleteIcon
              className="main-blue-color pointer-cursor"
              onClick={() => setOpenDeleteDialog(true)}
            />
          </Tooltip>
          <Tooltip title="Mégsem" placement="top">
            <CancelIcon
              className="main-blue-color pointer-cursor"
              onClick={handleCancelClick}
            />
          </Tooltip>
        </Grid>
      </TableCell>
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Elem törlése</DialogTitle>
        <DialogContent>
          <Grid container>
            <Button
              variant="contained"
              children={"Elem beszerezve"}
              onClick={() => handleDeleteClick("collected")}
              className="margin-sm"
              //startIcon={<ExtensionIcon />}
            />
            <Button
              variant="contained"
              children={"Elem végleges törlése"}
              onClick={() => handleDeleteClick("delete")}
              className="margin-sm"
              //startIcon={<ExtensionIcon />}
            />
          </Grid>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default EditMissingPieces;
