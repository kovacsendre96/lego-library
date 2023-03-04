import React, { useState } from "react";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import NewSetForm from "./NewSetForm.js";

const AddNewSet = ({
  legoData,
  setLegoData,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleButtonClick = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        children={"Új hozzáadás"}
        onClick={handleButtonClick}
        className="margin-sm"
      />
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle></DialogTitle>
        <DialogContent>
          <NewSetForm
            legoData={legoData}
            setLegoData={setLegoData}
            handleDialogClose={handleDialogClose}
          />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default AddNewSet;
