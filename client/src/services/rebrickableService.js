import axios from "axios";
export default class RebrickableService {
  constructor() {
    this.BASE_URL = "https://rebrickable.com";
  }
  async getSets(search) {
    return axios
      .get(
        `${this.BASE_URL}/api/v3/lego/sets/?search=${search}&key=${process.env.REACT_APP_REBRICKABLE_TOKEN}`
      )
      .then((response) => response.data)
      .catch((error) => console.log(error));
  }

  async getSetById(setId) {
    return axios
      .get(
        `${this.BASE_URL}/api/v3/lego/sets/${setId}?key=${process.env.REACT_APP_REBRICKABLE_TOKEN}`
      )
      .then((response) => response.data)
      .catch((error) => console.log(error));
  }

  async getSetParts(setId) {
    return axios
      .get(
        `${this.BASE_URL}/api/v3/lego/sets/${setId}/parts?key=${process.env.REACT_APP_REBRICKABLE_TOKEN}`
      )
      .then((response) => response.data)
      .catch((error) => console.log(error));
  }
}
