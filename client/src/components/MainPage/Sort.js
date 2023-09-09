import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { sortByType } from "../../Helpers/sortingFunctions";

const optionsArray = [
  { title: "Év", value: "year" },
  { title: "Név ABC", value: "name" },
  { title: "Ár", value: "max_price" },
  { title: "Darabszám", value: "num_parts" },
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
    if (target === "year") {
      setLegoData(sortByType(legoData, sortDirection, "year"));
    } else if (target === "name") {
      setLegoData(sortByType(legoData, sortDirection, "name"));
    } else if (target === "max_price") {
      setLegoData(sortByType(legoData, sortDirection, "max_price"));
    } else if (target === "num_parts") {
      setLegoData(sortByType(legoData, sortDirection, "num_parts"));
    }
  };

  const handleSortDirectionChange = (e) => {
    const target = e.target.value;
    setSortDirection(target);
    if (sortType.value === "year") {
      setLegoData(sortByType(legoData, target, "year"));
    } else if (sortType.value === "name") {
      setLegoData(sortByType(legoData, target, "name"));
    } else if (sortType.value === "max_price") {
      setLegoData(sortByType(legoData, target, "max_price"));
    } else if (sortType.value === "num_parts") {
      setLegoData(sortByType(legoData, target, "num_parts"));
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
