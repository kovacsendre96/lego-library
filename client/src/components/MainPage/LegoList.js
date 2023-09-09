import { Grid, Typography } from "@mui/material";
import React from "react";
import LegoCard from "./LegoCard";
import { Link } from "react-router-dom";

const LegoList = ({ legoData }) => {
  return (
    <React.Fragment>
      <Grid item xs={12} className="m-3">
        <Typography align="center" children={`${legoData.length} találat`} />
      </Grid>
      <Grid container justifyContent="center">
        {legoData.map((data) => {
          return (
            <Link key={data.set_num} className="m-3" to={`${data.set_num}`}>
              <LegoCard legoData={data} />
            </Link>
          );
        })}
      </Grid>
    </React.Fragment>
  );
};

export default LegoList;
