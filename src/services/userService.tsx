import axios from "axios";
import config from "../env/config";
import { EditableFields } from "../pages/User";
import { Users } from "../types/types";
import loginService from "./loginService";

const userService = {
  getAll: async (id?: number) => {
    let data: Users[] = [];
    await axios
      .get(config.TOKEN_URL + `users/` + (typeof id === "number" ? id : ""))
      .then((res) => {
        const { status, statusText } = res;

        if (status === 200 || statusText === "OK") {
          data = res.data;
        } else {
          console.error(res);
        }
      })
      .catch((err) => console.log(err));

    return data;
  },

  register: async (formData: object) => {
    let result: string = "";
    await loginService
      .getToken("register/", formData)
      .then((token) => {
        result = token;
      })
      .catch((err) => console.log(err));

    return result;
  },

  delete: async (id: number | null) => {
    let data;
    const request = await axios.delete(
      config.TOKEN_URL + `users/` + (typeof id === "number" ? `/` + id : ""),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("accessToken"),
        },
      }
    );
    const { status, statusText } = request;

    if (status === 200 && statusText === "OK") {
      data = request.data;
    } else {
      console.error(request);
    }

    return data;
  },

  patch: async (id: number | null, userData: EditableFields) => {
    return await axios.patch(
      config.TOKEN_URL + `users/` + (typeof id === "number" ? `/` + id : ""),
      userData
    );
  },
};

export default userService;
