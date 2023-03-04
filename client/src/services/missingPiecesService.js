import axios from "axios";
import { setSnackbar } from "../state/snackbar";

export default class MissingPiecesService {
  async index(id) {
    let apiUrl = "http://localhost:8000/api/missing-pieces";
    if (id) {
      apiUrl = `http://localhost:8000/api/missing-pieces/${id}`;
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
      .post("http://localhost:8000/api/missing-pieces", legoSet)
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
      .patch(`http://localhost:8000/api/missing-pieces/${id}`, data)
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
      .delete(`http://localhost:8000/api/missing-pieces/${id}`)
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
      .get(`http://localhost:8000/api/missing-pieces/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        setSnackbar(error.message, "error");
        return [];
      });
  }
}
