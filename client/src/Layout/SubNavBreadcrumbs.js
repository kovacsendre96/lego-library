import React from "react";
import { Stack, Breadcrumbs } from "@mui/material";
import { Link, useLocation, useParams } from "react-router-dom";
import { routeDisplayName } from "../routes/routeDisplayName";

const SubNavBreadcrumbs = () => {
  const location = useLocation();
  const { id } = useParams();
  const currentPathName = location.pathname.split("/")[1];
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" to={`/${currentPathName}/`}>
      {routeDisplayName[currentPathName]}
    </Link>,
  ];
  if (id) {
    breadcrumbs.push(
      <Link underline="hover" key="2" href={`/${currentPathName}`}>
        {id}
      </Link>
    );
  }

  return (
    <Stack spacing={2} className="py-3 px-4 bg-[#9cb7d1]">
      <Breadcrumbs
        className="!text-white"
        separator="/"
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
};

export default SubNavBreadcrumbs;
