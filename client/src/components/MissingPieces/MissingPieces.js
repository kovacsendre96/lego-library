import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MissingPiecesService from "../../services/missingPiecesService";
import PiecesTable from "./PiecesTable";

const MissingPieces = ({ missingPiecesDialog, setMissingPiecesDialog }) => {
  const missingPiecesService = new MissingPiecesService();
  const { id } = useParams();

  const [missingPieces, setMissingPieces] = useState([]);

  useEffect(() => {
    async function getMissingPieces() {
      setMissingPieces(await missingPiecesService.index(id));
    }
    getMissingPieces();
  }, []);

  const handleDialogClose = () => {
    setMissingPiecesDialog(false);
  };

  return (
    <Dialog
      fullScreen
      open={missingPiecesDialog}
      onClose={() => handleDialogClose}
    >
      <DialogTitle>Hiányzó elemek</DialogTitle>
      <DialogContent>
        <Button autoFocus onClick={handleDialogClose} variant="text">
          Vissza
        </Button>
        {missingPieces.length > 0 && (
          <PiecesTable
            missingPieces={missingPieces}
            setMissingPieces={setMissingPieces}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MissingPieces;
