import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { sortByType } from "../../Helpers/sortingFunctions";

const optionsArray = [
  { title: "Év", value: "year_released" },
  { title: "Név ABC", value: "name" },
  { title: "Ár", value: "max_price" },
  { title: "Darabszám", value: "number_of_pieces" },
];

const Sort = ({ legoData, setLegoData }) => {
  const sortDirectionFromLocalStore = localStorage.getItem("sortDirection");
  const sortTypeLocalStore = localStorage.getItem("sortType");
  const [sortDirection, setSortDirection] = useState(
    JSON.parse(sortDirectionFromLocalStore) ?? "asc"
  );
  const [sortType, setSortType] = useState(
    JSON.parse(sortTypeLocalStore) ?? optionsArray[0].value
  );

  useEffect(() => {
    localStorage.setItem("sortDirection", JSON.stringify(sortDirection));
    localStorage.setItem("sortType", JSON.stringify(sortType));
  }, [sortDirection, sortType]);

  useEffect(() => {
    setLegoData(sortByType(legoData, sortDirection, sortType));
  }, []);

  const handleSortChange = (e) => {
    const target = e.target.value;
    console.log(target);

    setSortType(target);
    if (target === "year_released") {
      setLegoData(sortByType(legoData, sortDirection, "year_released"));
    } else if (target === "name") {
      setLegoData(sortByType(legoData, sortDirection, "name"));
    } else if (target === "max_price") {
      setLegoData(sortByType(legoData, sortDirection, "max_price"));
    } else if (target === "number_of_pieces") {
      setLegoData(sortByType(legoData, sortDirection, "number_of_pieces"));
    }
  };

  const handleSortDirectionChange = (e) => {
    const target = e.target.value;
    setSortDirection(target);
    if (sortType.value === "year_released") {
      setLegoData(sortByType(legoData, target, "year_released"));
    } else if (sortType.value === "name") {
      setLegoData(sortByType(legoData, target, "name"));
    } else if (sortType.value === "max_price") {
      setLegoData(sortByType(legoData, target, "max_price"));
    } else if (sortType.value === "number_of_pieces") {
      setLegoData(sortByType(legoData, target, "number_of_pieces"));
    }
  };

  return (
    sortByType &&
    sortType && (
      <React.Fragment>
        <FormControl className="margin-sm input-width">
          <InputLabel id="sort">Rendezés</InputLabel>
          <Select
            labelId="sort"
            id="sort"
            onChange={handleSortChange}
            value={sortType}
            label="Rendezés"
          >
            {optionsArray.map((option) => (
              <MenuItem value={option.value} key={option.title}>
                {option.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className="margin-sm input-width">
          <InputLabel id="select-label">Rendezési irány</InputLabel>
          <Select
            labelId="select-label"
            id="select-label"
            value={sortDirection}
            label="Rendezési irány"
            onChange={handleSortDirectionChange}
          >
            <MenuItem value={"asc"}>Növekvő</MenuItem>
            <MenuItem value={"desc"}>Csökkenő</MenuItem>
          </Select>
        </FormControl>
      </React.Fragment>
    )
  );
};

export default Sort;
