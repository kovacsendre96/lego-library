import { AppBar, Grid, MenuItem, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }} className="z-10 fixed left-0 top-0 w-full">
        <AppBar position="static">
          <Toolbar>
            <Grid container justifyContent={"center"}>
              <Link className="link m-2" to={"/lego-sets"}>
                <MenuItem variant="contained">Készlet lista</MenuItem>
              </Link>
              <Link className="link m-2" to={"/missing-pieces"}>
                <MenuItem variant="contained">Hiányzó elemek</MenuItem>
              </Link>
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Nav;
