import React, { useEffect, useState } from "react";
import MissingPiecesService from "../services/missingPiecesService";
import { Grid } from "@mui/material";
import PiecesTable from "../components/MissingPieces/PiecesTable";
import { renderSpinner } from "../Helpers/functions";

const MissingPiecesPage = () => {
  const missingPiecesService = new MissingPiecesService();

  const [missingPieces, setMissingPieces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getMissingPieces() {
      setMissingPieces(await missingPiecesService.index());
      setLoading(false);
    }
    getMissingPieces();
  }, []);
  return (
    <Grid container justifyContent={"center"}>
      {loading ? (
        renderSpinner()
      ) : (
        <PiecesTable
          missingPieces={missingPieces}
          setMissingPieces={setMissingPieces}
        />
      )}
    </Grid>
  );
};

export default MissingPiecesPage;
