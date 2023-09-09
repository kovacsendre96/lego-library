import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Tooltip,
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
import EditDialog from "../components/SetDetails/EditDialog";import { renderSpinner } from "../Helpers/functions";
import RebrickableService from "../services/rebrickableService";
import StyledButton from "../components/StyledButton";
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import AddIcon from '@mui/icons-material/Add';
import LaunchIcon from '@mui/icons-material/Launch';



const LegoDetailsPage = () => {
  const [legoSet, setLegoSet] = useState();
  const [legoDataFromMyList, setLegoDataFromMyList] = useState();
  const [theme, setTheme] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [missingPiecesDialog, setMissingPiecesDialog] = useState(false);

  const navigate = useNavigate();
  const legoSetService = new LegoSetService();
  const rebrickableService = new RebrickableService();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const legoSetById = await rebrickableService.getSetById(id);
      const legoFromMyList = await legoSetService.show(id);
      setLegoDataFromMyList(legoFromMyList);
      setLegoSet(legoSetById)
      const themeById = await rebrickableService.getSetThemeById(legoSetById.theme_id);
      setTheme(themeById);
      setIsLoading(false);

    })();
  }, []);

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

  async function handleSaveToList() {
    await legoSetService.store(legoSet);
    navigate("/lego-sets");
  }

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
        <>
          <div className="bg-yellow-gradient h-[120px] w-full flex justify-center items-center">
            <p className="lego-font text-white">{legoSet.name}</p>
            {legoDataFromMyList && <Tooltip title="Ez a szett mentve van a saját listába">
              <BookmarkAddedIcon className="!text-[50px]" />
            </Tooltip>
            }
          </div>
          <Grid className="mt-5" container justifyContent={"center"}>
            <Grid item xs={11} md={8}>
              <Slider
                banner_picture={legoSet.set_img_url}
                box_picture={legoDataFromMyList?.box_img_url}
                real_picture={legoDataFromMyList?.real_picture_img_url}
              />
            </Grid>
          </Grid>
          <DetailsPageBottomBox
            id={legoSet.set_num}
            name={legoSet.name}
            number_of_pieces={legoSet.num_parts}
            year_released={legoSet.year}
            theme={theme}
            min_price={legoSet.min_price}
            max_price={legoSet.max_price}
            legoDataFromMyList={legoDataFromMyList}
          />

          {/*           <Grid container justifyContent={"center"} className="">
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              children={"További adatok"}
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
          </Grid> */}

          <div className="flex justify-center items-center w-full flex-col md:flex-row">
            <StyledButton className={"m-2"} icon={<LaunchIcon />} children={<a target="_blank" rel="noopener noreferrer" href={legoSet.set_url}>Ugrás a Rebrickable-re</a>} />
            {legoDataFromMyList
              ?
              <>
                <StyledButton icon={<EditIcon />} className={"m-2"} onClick={() => {
                  setOpenEditDialog(true);
                }} children={'További adatok megadása'} />
                <StyledButton icon={<DeleteIcon />} className={"m-2"} onClick={() => setOpenConfirmationDialog(true)} children={'Törlés saját listából'} />
              </>
              :
              <StyledButton className={"m-2"} icon={<AddIcon />} onClick={handleSaveToList} children={'Mentés saját listába'} />
            }
          </div>
          {/*        <SetParts set_id={legoSet.set_num} /> */}
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
            legoDataFromMyList={legoDataFromMyList}
            setLegoDataFromMyList={setLegoDataFromMyList}
          />
        </>
      </Grid >
    );
  }
};

export default LegoDetailsPage;
