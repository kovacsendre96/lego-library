import { Grid, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddNewSet from "../components/NewSet/AddNewSet";
import LegoList from "../components/MainPage/LegoList";
import Sort from "../components/MainPage/Sort";
import Filter from "../components/MainPage/Filter";
import LegoSetService from "../services/legoSetService";
import logo from "../public/assets/logo.png";
import { renderSpinner } from "../Helpers/functions";

const MainPage = () => {
  const legoSetService = new LegoSetService();

  const [legoData, setLegoData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getLegoSets() {
      const legoSets = await legoSetService.index();
      localStorage.setItem("lego-sets", JSON.stringify(legoSets));
      setLoading(false);
      setLegoData(legoSets);
    }
    getLegoSets();
  }, []);

  return (
    <Grid container justifyContent={"center"}>
      <img src={logo} className="w-[250px]" alt="logo" />
      <Grid
        container
        justifyContent={"space-around"}
        alignItems={"center"}
        component={Paper}
        className="m-4"
      >
        <Grid
          item
          xs={12}
          container
          justifyContent={"center"}
          alignItems={"center"}
        >
          {legoData.length > 0 && (
            <Sort legoData={legoData} setLegoData={setLegoData} />
          )}
        </Grid>
        <Grid
          item
          xs={12}
          container
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Filter legoData={legoData} setLegoData={setLegoData} />
        </Grid>
        <Grid
          item
          xs={12}
          container
          justifyContent={"space-around"}
          alignItems={"center"}
        >
          <AddNewSet legoData={legoData} setLegoData={setLegoData} />
        </Grid>
      </Grid>
      {loading ? (
        renderSpinner()
      ) : (
        <Grid container justifyContent={"center"}>
          {legoData.length > 0 ? (
            <LegoList legoData={legoData} />
          ) : (
            "Nincs adat"
          )}
        </Grid>
      )}
    </Grid>
  );
};

export default MainPage;
