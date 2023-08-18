import axios from "axios";
import { setSnackbar } from "../state/snackbar";

export default class MissingiecesService {
  async index(id) {
    let apiUrl = "api/missing-pieces";
    if (id) {
      apiUrl = `api/missing-pieces/${id}`;
    }
    return axios
      .get(apiUrl)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
        setSnackbar(error.message, "error");
        return [];
      });
  }

  async store(legoSet) {
    return axios
      .post("api/missing-pieces", legoSet)
      .then((response) => {
        setSnackbar("Sikeres mentés", "success");
        return response.data;
      })
      .catch((error) => {
        setSnackbar(error?.response?.data?.message ?? error.message, "error");
        return [];
      });
  }

  async update(id, data) {
    return axios
      .patch(`api/missing-pieces/${id}`, data)
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
      .delete(`api/missing-pieces/${id}`)
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
      .get(`api/missing-pieces/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        setSnackbar(error.message, "error");
        return [];
      });
  }
}
