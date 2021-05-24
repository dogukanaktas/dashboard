import axiosInstance from "../helpers/axios";

const loginService = {
  getToken: async (url: string, payload: object) => {
    const request = await axiosInstance.post(url, payload);
    
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
