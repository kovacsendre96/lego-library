import React, { useEffect, useState } from "react";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Filter = ({ legoData, setLegoData }) => {
  const [filterInputName, setFilterInputName] = useState("");
  const [filterInputId, setFilterInputId] = useState("");
  const [legoSetsFromLocalStorage, setLegoSetsFromLocalStorage] = useState([]);

  useEffect(() => {
    (async function () {
      setLegoSetsFromLocalStorage(
        JSON.parse(await localStorage.getItem("lego-sets"))
        );
  })();
}, [legoData]);

const handleFilterInputChangeName = (e) => {
  const target = e.target.value;
  setFilterInputName(target);
  const filteredLegoData = legoSetsFromLocalStorage.filter((data) =>
    data.name.toLowerCase().includes(target.toLowerCase())
  );

  setLegoData(filteredLegoData);
};
const handleFilterInputChangeId = (e) => {
  const target = e.target.value;
  setFilterInputId(target);
  const filteredLegoData = legoSetsFromLocalStorage.filter((data) =>
    data.set_num.toLowerCase().includes(target.toLowerCase())
  );

  setLegoData(filteredLegoData);
};
return (
  <React.Fragment>
    <TextField
      id="lego-filter"
      value={filterInputName}
      onChange={handleFilterInputChangeName}
      label="Név"
      variant="outlined"
      className="margin-sm input-width"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">{<SearchIcon />}</InputAdornment>
        ),
      }}
    />

    <TextField
      id="lego-filter"
      value={filterInputId}
      onChange={handleFilterInputChangeId}
      label="Azonosító"
      variant="outlined"
      className="margin-sm input-width"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">{<SearchIcon />}</InputAdornment>
        ),
      }}
    />
  </React.Fragment>
);
};

export default Filter;
