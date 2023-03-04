import { Autocomplete, TextField } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";

const SetSelector = ({ listOfAllLegoSet, setSelectorValue, setSelectorError, HandleSetSelectorChange }) => {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const optionsHelper = [];
        listOfAllLegoSet.forEach(data => optionsHelper.push({ id: data.id, name: data.name }))
        setOptions(optionsHelper);
    }, []);
    return (
        <Fragment>
            {options.length > 0 &&
                <Autocomplete
                    id="sorting"
                    options={options}
                    getOptionLabel={(option) => `${option.id} ${option.name}`}
                    renderInput={(params) => <TextField {...params} error={setSelectorError} label="Szettek" />}
                    className="margin-sm input-width"
                    onChange={HandleSetSelectorChange}
                    value={setSelectorValue}
                />
            }
        </Fragment>
    );
};

export default SetSelector;




