import axios from "axios";
import config from "../env/config";

const loginService = {
  getToken: async (url: string, payload: object) => {
    const request = await axios.post(config.TOKEN_URL + url, payload);
    const {
      status,
      data: { accessToken },
    } = request;

    if (status === 200 || status === 201) {
      return accessToken;
    } else {
      console.log(request);
    }
  },
};

export default loginService;
