import React, { useEffect, useState } from "react";
import MissingPiecesService from "../services/missingPiecesService";
import { Grid } from "@mui/material";
import PiecesTable from "../components/MissingPieces/PiecesTable";
import { renderSpinner } from "../Helpers/functions";
import { useQuery } from "react-query";

const MissingPiecesPage = () => {
  const missingPiecesService = new MissingPiecesService();
  const { data, isLoading } = useQuery("missing-pieces", () =>
    missingPiecesService.index()
  );

  const [missingPieces, setMissingPieces] = useState([]);

  useEffect(() => {
    if (!isLoading) {
      setMissingPieces(data);
    }
  }, [data, isLoading]);

  if (isLoading) {
    return renderSpinner();
  }

  return (
    <Grid container justifyContent={"center"}>
      <PiecesTable
        missingPieces={missingPieces}
        setMissingPieces={setMissingPieces}
      />
    </Grid>
  );
};

export default MissingPiecesPage;
