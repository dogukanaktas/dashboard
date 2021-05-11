import axios from "axios";
import config from "../env/config";


// interface IGetToken {
//   (url: string, payload: object) => string;
// }



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
};

export default loginService;
