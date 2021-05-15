import axios from "axios";
import config from "../env/config";
import loginService from "./loginService";

const userService = {
  delete: async (url: string, id: number) => {
    let data;
    const request = await axios.delete(config.TOKEN_URL + url + id);
    const { status, statusText } = request;

    if (status === 200 && statusText === "OK") {
      data = request.data;
    } else {
      console.log(request);
    }

    return data;
  },

  getAll: async (url: string, id?: number) => {
    let data;
    await axios
      .get(config.TOKEN_URL + url + (typeof id === "number" ? id : ""))
      .then((res) => {
        const { status, statusText } = res;

        if (status === 200 || statusText === "OK") {
          data = res.data;
        } else {
          console.log(res);
        }
      })
      .catch((err) => console.log(err));

    return data;
  },
};

export default userService;
