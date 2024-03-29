import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  MenuItem,
  Tab,
  Tabs,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Slider from "../components/SetDetails/Slider";
import DetailsPageBottomBox from "../components/SetDetails/DetailsPageBottomBox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SetParts from "../components/SetDetails/SetParts";
import LegoSetService from "../services/legoSetService";
import { useParams, useNavigate } from "react-router-dom";
import EditDialog from "../components/SetDetails/EditDialog"; import { renderSpinner } from "../Helpers/functions";
import RebrickableService from "../services/rebrickableService";
import StyledButton from "../components/StyledButton";
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import AddIcon from '@mui/icons-material/Add';
import LaunchIcon from '@mui/icons-material/Launch';
import ExtensionIcon from '@mui/icons-material/Extension';
import Minifigures from "../components/Minifugures";


const LegoDetailsPage = () => {
  const [legoSet, setLegoSet] = useState();
  const [legoDataFromMyList, setLegoDataFromMyList] = useState();
  const [theme, setTheme] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedTab, setSelectedTab] = useState("parts"); //parts ||minifigures

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
          <div className="flex justify-center items-center flex-wrap w-full flex-col md:flex-row">
            <StyledButton className={"m-2"} icon={<LaunchIcon />} children={<a target="_blank" rel="noopener noreferrer" href={legoSet.set_url}>Ugrás a Rebrickable-re</a>} />
            {legoDataFromMyList
              ?
              <>
                <StyledButton icon={<EditIcon />} className={"m-2"} onClick={() => {
                  setOpenEditDialog(true);
                }} children={'További adatok megadása'} />
                <StyledButton icon={<DeleteIcon />} className={"m-2"} onClick={() => setOpenConfirmationDialog(true)} children={'Törlés saját listából'} />
                <StyledButton icon={<ExtensionIcon />} className={"m-2"} onClick={() => {
                  navigate(`/missing-pieces/${legoSet.set_num}`);
                }} children={'Hiányzó elemek'} />
              </>
              :
              <StyledButton className={"m-2"} icon={<AddIcon />} onClick={handleSaveToList} children={'Mentés saját listába'} />
            }
          </div>
          <div className="mt-10 container">
            <div className="flex items-center">
              <MenuItem onClick={() => setSelectedTab("parts")} className={` hover:bg-yellow-gradient ${selectedTab === "parts" ? "hover : bg - yellow - gradient !border-t-2 !border-t-custom-yellow !border-l-2 !border-r-2" : ''}`} style={{ border: "inherit" }}>
                <span className="cursor-pointer">Elemek
                </span>
              </MenuItem>
              <MenuItem onClick={() => setSelectedTab("minifigures")} className={` hover:bg-yellow-gradient ${selectedTab === "minifigures" ? "hover : bg - yellow - gradient !border-t-2 !border-t-custom-yellow !border-l-2 !border-r-2" : ''}`} style={{ border: "inherit" }}>
                <span className="cursor-pointer">
                  Figurák
                </span>
              </MenuItem>
            </div>
          </div>
          <div className="container mb-10 border-2">
            {selectedTab === "parts" ?
              <SetParts set_id={legoSet.set_num} /> :
              <Minifigures />}
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
          </div>
        </>
      </Grid >
    );
  }
};

export default LegoDetailsPage;
