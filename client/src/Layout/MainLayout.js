import { Alert, Container, Grid, Snackbar } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useGlobalState } from "../state/snackbar";
import Nav from "../components/Nav";
import SubNavBreadcrumbs from "./SubNavBreadcrumbs";
import { useEffect } from "react";


const MainLayout = () => {
  const [snackbarOpen, setSnackbarOpen] = useGlobalState("snackbarOpen");
  const [snackbarMesage] = useGlobalState("snackbarMessage");
  const [snackbarType] = useGlobalState("snackbarType");


  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {

      navigate("/landing");
    }
  }, []);

  return (
    <>
      {location.pathname !== "/landing" ?
        <>
          <div className="z-10 fixed left-0 w-full top-0  mx-auto bg-gradient-to-r from-black to-[#2D3436]">
            <Nav />
            {/* <SubNavBreadcrumbs /> */}
          </div>
          <div className="h-[110px] bg-gradient-to-r from-black to-[#2D3436]"></div>
        </>
        : null}
      <Grid className="">
        <Outlet />
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity={snackbarType}
            sx={{ width: "100%" }}
          >
            {snackbarMesage}
          </Alert>
        </Snackbar>
      </Grid>
    </>
  );
};

export default MainLayout;
