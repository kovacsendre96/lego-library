import { AppBar, Grid, IconButton, MenuItem, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { Link, useLocation } from "react-router-dom";
import logo from "../public/assets/logo.png";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";


const Nav = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  function isActiveMenu(route) {
    return location.pathname === route;
  }

  function handleHamburgerClick(route) {
    setSidebarOpen(prevState => !prevState)

  }

  useEffect(() => {
    window.addEventListener("resize", (e) => {

      if (e.target.innerWidth > 640) {
        setSidebarOpen(false)
      }
    })
  }, []);

  function renderMenuItems() {
    return (
      <>
        <Link className="link m-2" to={"/lego-sets"}>
          <MenuItem style={{ color: isActiveMenu("/lego-sets") ? "#FBC620" : "white" }} className="!text-sm md:!text-lg hover:scale-105 hover:font-bold duration-150 !tracking-wider " variant="contained">Készlet lista</MenuItem>
        </Link>
        <Link className="link m-2" to={"/missing-pieces"}>
          <MenuItem style={{ color: isActiveMenu("/add-new-set") ? "#FBC620" : "white" }} className="!text-sm md:!text-lg hover:scale-105 hover:font-bold duration-150 !tracking-wider " variant="contained">Hozzáadás</MenuItem>
        </Link>
        <Link className="link m-2" to={"/missing-pieces"}>
          <MenuItem style={{ color: isActiveMenu("/missing-pieces") ? "#FBC620" : "white" }} className="!text-sm md:!text-lg hover:scale-105 hover:font-bold duration-150 !tracking-wider " variant="contained">Hiányzó elemek</MenuItem>
        </Link>
      </>
    )
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }} className="w-full p-2">
        {sidebarOpen &&
          <div className="w-screen animate-slide-down h-[350px]">
            <div className="h-[116px] flex justify-between pb-4">
              <MenuItem>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  className="sm:!hidden !text-white"
                  onClick={handleHamburgerClick}
                >
                  <CloseIcon />
                </IconButton>
              </MenuItem>
              <div className="relative h-[100px] pr-[49px]">
                <div className="absolute top-0 left-1/2 h-full w-full transform -translate-x-1/2 -translate-y-4%">
                  <img
                    src={logo}
                    alt="Blurred Background"
                    className="h-[105px] object-cover z-0 filter blur-lg"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </div>
                <img
                  className="h-full relative z-10 object-contain"
                  src={logo}
                  alt="logo"
                />
              </div>
            </div>
            <div className="animate-appear">
              {renderMenuItems()}
            </div>
          </div>
        }
        {!sidebarOpen &&
          <AppBar position="static" className="!bg-transparent !shadow-none">
            <Toolbar className="!flex !items-center justify-between sm:justify-start">
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                className="sm:!hidden"
                onClick={handleHamburgerClick}
              >
                <MenuIcon />
              </IconButton>
              <div className="relative h-[100px]">
                <div className="absolute top-0 left-1/2 h-full w-full transform -translate-x-1/2 -translate-y-4%">
                  <img
                    src={logo}
                    alt="Blurred Background"
                    className="h-[105px] object-cover z-0 filter blur-lg"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </div>
                <img
                  className="h-full relative z-10 object-contain"
                  src={logo}
                  alt="logo"
                />
              </div>
              <Grid className="!hidden sm:!flex" container justifyContent={"center"}>
                {renderMenuItems()}
              </Grid>
            </Toolbar>
          </AppBar>
        }
      </Box>
    </>
  );
};

export default Nav;
