import React, { useEffect, useState } from "react";
import MissingPiecesService from "../services/missingPiecesService";
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import PiecesTable from "../components/MissingPieces/PiecesTable";
import { renderSpinner } from "../Helpers/functions";
import { useQuery } from "react-query";
import LegoSetService from "../services/legoSetService";
import { useNavigate, useParams } from "react-router-dom";

const MissingPiecesPage = () => {
  const missingPiecesService = new MissingPiecesService();
  const legoSetService = new LegoSetService();

  const [missingPieces, setMissingPieces] = useState([]);
  const [legoSets, setLegoSets] = useState([]);
  const [selectedSetId, setSelectedSetId] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery("missing-pieces", () =>
    missingPiecesService.index()
  );

  const { data: legoSetsArray, isLoading: isLegoSetsLoading } = useQuery("lego-sets", () =>
    legoSetService.index()
  );


  function handleFilterChange(e) {
    setSelectedSetId(e.target.value);
    navigate(`/missing-pieces/${e.target.value}`);
  }

  useEffect(() => {
    setSelectedSetId(id ?? "");
  }, [])

  useEffect(() => {
    if (!isLoading) {
      setMissingPieces(data);
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (!isLegoSetsLoading) {
      setLegoSets(legoSetsArray);
    }
  }, [legoSetsArray, isLegoSetsLoading]);

  if (isLoading && isLegoSetsLoading) {
    return renderSpinner();
  }
  return (
    <Grid container justifyContent={"center"}>
      <div className="w-full py-4 pl-2 bg-yellow-gradient fixed top-[116px] z-10">
        <FormControl className="margin-sm input-width">
          <InputLabel id="filter">Szűrés</InputLabel>
          <Select
            labelId="filter"
            id="filter"
            onChange={handleFilterChange}
            value={selectedSetId}
            label="Rendezés"
          >
            <MenuItem value={""} >
              Összes
            </MenuItem>
            {legoSets.map((set) => (
              <MenuItem value={set.set_num} key={set.set_num}>
                {set.name} #{set.set_num}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <PiecesTable
        selectedSetId={selectedSetId}
        missingPieces={missingPieces}
        setMissingPieces={setMissingPieces}
      />
    </Grid>
  );
};

export default MissingPiecesPage;
