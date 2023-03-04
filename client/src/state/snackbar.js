import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState } = createGlobalState({
  snackbarOpen: false,
  snackbarMessage: "",
  snackbarType: "",
});

const setSnackbar = (snackbarMessage, snackbarType) => {
  setGlobalState("snackbarMessage", snackbarMessage);
  setGlobalState("snackbarType", snackbarType);
  setGlobalState("snackbarOpen", true);
};
export { setSnackbar, useGlobalState };
