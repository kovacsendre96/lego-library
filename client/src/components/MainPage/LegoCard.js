import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid, Tooltip } from "@mui/material";

const LegoCard = ({ legoData }) => {
  const { banner, set_name, set_id, year_released } = legoData;
  return (
    <Card className="m-2 w-[250px] h-[300px]">
      <CardActionArea>
        <CardMedia
          style={{ objectFit: "contain", maxHeight: 150 }}
          component="img"
          image={banner}
          alt={set_name}
        />
        <CardContent>
          <Tooltip title={set_name} placement="top">
            <Typography
              noWrap
              gutterBottom
              variant="h5"
              component="div"
              align="center"
            >
              {set_name}
              <div>{`# ${set_id}`}</div>
              <div>{year_released}</div>
            </Typography>
          </Tooltip>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default LegoCard;
