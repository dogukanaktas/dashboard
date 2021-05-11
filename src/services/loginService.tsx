import axios from "axios";
import config from "../env/config";


// type IGetToken = (url: string, payload: object) => string;



const loginService = {
  getToken: async (url: string, payload: object) => {
    const request = await axios.post(config.TOKEN_URL + url, payload);
    const {
      status,
      statusText,
      data: { accessToken },
    } = request;

    console.log(request);

    if (status === 200 && statusText === "OK") {
      return accessToken;
    } else {
      console.log(request);
    }
  },
  logOut: () => {
    localStorage.removeItem("accessToken");
  }
};

export default loginService;
