import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Slider from "../components/SetDetails/Slider";
import DetailsPageBottomBox from "../components/SetDetails/DetailsPageBottomBox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MissingPieces from "../components/MissingPieces/MissingPieces";
import SetParts from "../components/SetDetails/SetParts";
import LegoSetService from "../services/legoSetService";
import { useParams, useNavigate } from "react-router-dom";
import EditDialog from "../components/SetDetails/EditDialog";
import ExtensionIcon from "@mui/icons-material/Extension";
import { renderSpinner } from "../Helpers/functions";
import { useQuery } from "react-query";

const LegoDetailsPage = () => {
  const [legoSet, setLegoSet] = useState();
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [missingPiecesDialog, setMissingPiecesDialog] = useState(false);

  const navigate = useNavigate();
  const legoSetService = new LegoSetService();
  const { id } = useParams();

  const { data, isLoading } = useQuery("lego-set-detail", () =>
    legoSetService.show(id)
  );

  useEffect(() => {
    console.log(data);
    if (!isLoading && data) {
      console.log(data);
      setLegoSet(data);
    }
  }, [data, isLoading]);

  async function handleDelete() {
    await legoSetService.delete(id);
    navigate(-1);
  }

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  if (isLoading) {
    return renderSpinner();
  }

  if (legoSet) {
    return (
      <Grid
        direction={"column"}
        container
        justifyContent={"center"}
        alignItems={"center"}
      >
        (
        <>
          <p className="lego-font">{legoSet.set_name}</p>
          <Grid container justifyContent={"center"}>
            <Grid item xs={11} md={8}>
              <Slider
                banner_picture={legoSet.banner}
                box_picture={legoSet.box}
                real_picture={legoSet.real_picture}
              />
            </Grid>
          </Grid>
          <DetailsPageBottomBox
            id={legoSet.set_id}
            name={legoSet.set_name}
            number_of_pieces={legoSet.number_of_pieces}
            year_released={legoSet.year_released}
            min_price={legoSet.min_price}
            max_price={legoSet.max_price}
          />
          <Grid container className="m-4"></Grid>

          <Grid container justifyContent={"center"} className="margin-md">
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              children={"Szerkesztés"}
              onClick={() => {
                setOpenEditDialog(true);
              }}
              className="margin-sm"
            />
            <Button
              variant="contained"
              children={"Hiányzó elemek"}
              onClick={() => {
                setMissingPiecesDialog(true);
              }}
              className="margin-sm"
              startIcon={<ExtensionIcon />}
            />
            <Button
              variant="contained"
              startIcon={<DeleteIcon />}
              children={"Törlés"}
              color="error"
              onClick={() => setOpenConfirmationDialog(true)}
              className="margin-sm"
            />
          </Grid>
          <SetParts set_id={legoSet.set_id} />
          {missingPiecesDialog && (
            <MissingPieces
              missingPiecesDialog={missingPiecesDialog}
              setMissingPiecesDialog={setMissingPiecesDialog}
            />
          )}
          <Dialog
            open={openConfirmationDialog}
            onClose={() => setOpenConfirmationDialog(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Törlés"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Biztosan ki szeretnéd törölni ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                startIcon={<DeleteIcon />}
                children={"Törlés"}
                color="error"
                onClick={handleDelete}
                className="margin-sm"
              />
            </DialogActions>
          </Dialog>

          <EditDialog
            openEditDialog={openEditDialog}
            setOpenEditDialog={setOpenEditDialog}
            legoSet={legoSet}
            setLegoSet={setLegoSet}
          />
        </>
        )
      </Grid>
    );
  }
};

export default LegoDetailsPage;
