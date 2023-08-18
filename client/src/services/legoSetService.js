import axios from "axios";
import { setSnackbar } from "../state/snackbar";
export default class LegoSetService {
  async index() {
    return axios
      .get("api/lego-sets")
      .then((response) => response.data)
      .catch((error) => {
        setSnackbar(error.message, "error");
        return [];
      });
  }

  async store(legoSet) {
    return axios
      .post("api/lego-sets", legoSet)
      .then((response) => {
        setSnackbar("Sikeres mentés", "success");
        return response.data;
      })
      .catch((error) => {
        setSnackbar(error.message, "error");
        return [];
      });
  }

  async update(id, data) {
    return axios
      .patch(`api/lego-sets/${id}`, data)
      .then((response) => {
        setSnackbar("Sikeres mentés", "success");
        return response.data;
      })
      .catch((error) => {
        setSnackbar(error.message, "error");
        return [];
      });
  }

  async delete(id) {
    return axios
      .delete(`/api/lego-sets/${id}`)
      .then((response) => {
        setSnackbar("Sikeres törlés", "success");
        return response.data;
      })
      .catch((error) => {
        setSnackbar(error.message, "error");
        return [];
      });
  }

  async show(id) {
    return axios
      .get(`api/lego-sets/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        setSnackbar(error.message, "error");
        return [];
      });
  }
}
