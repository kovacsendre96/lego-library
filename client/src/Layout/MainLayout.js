import { Alert, Grid, Snackbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useGlobalState } from "../state/snackbar";
import Nav from "../components/Nav";
import SubNavBreadcrumbs from "./SubNavBreadcrumbs";

const MainLayout = () => {
  const [snackbarOpen, setSnackbarOpen] = useGlobalState("snackbarOpen");
  const [snackbarMesage] = useGlobalState("snackbarMessage");
  const [snackbarType] = useGlobalState("snackbarType");

  return (
    <>
      <div className="z-10 fixed left-0 top-0 w-full">
        <Nav />
        <SubNavBreadcrumbs />
      </div>
      <Grid className="mt-[110px]">
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
