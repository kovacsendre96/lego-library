import background from "../public/assets/background.jpg";
import { Button, Grid, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";

const imageStyle = {
  objectFit: "cover",
  filter: "blur(8px)",
};

const wrapperStyle = {
  backgroundColor: "rgba(0,0,0, 0.4)",
  color: "white",
  fontWeight: "bold",
  border: "3px solid #f1f1f1",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: "2",
  width: "80%",
  height: "40%",
  padding: "20px",
  textAlign: "center",
};

const textStyle = {
  textAlign: "justify",
  width: "50%",
  fontFamily: "helvetica",
};

const MainPage = () => {
  return (
    <Grid container>
      {/* <Nav /> */}

      <img
        className="w-100 vh-100 object-fit-cover"
        src={background}
        alt="bacgkround"
        style={imageStyle}
      />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction={"column"}
        style={wrapperStyle}
      >
        {/* <img src={logo} class="img-fluid" alt="logo" /> */}
        <h4 style={textStyle}>
          Üdvözöllek a Lego Library-ben, a Lego készletek szervezésének és
          kezelésének eszközében. Itt könnyedén hozzáadhatod készleteidet név
          szerint, listát készíthetsz gyűjteményeidről, részletes információkat
          kérhetsz minden egyes készletről, és még az elveszett darabokat is
          felveheted. Akár tapasztalt legóépítő vagy, akár csak most kezded, a
          Lego Library tökéletes eszköz arra, hogy nyomon követhesd a
          gyűjteményedet és rendezett maradj.
        </h4>
        <Grid
          className="mt-3"
          container
          alignContent={"center"}
          justifyContent="center"
        ></Grid>
      </Grid>
    </Grid>
  );
};

export default MainPage;
