import axios, { AxiosResponse } from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

const token = localStorage.getItem('accessToken');
axiosInstance.defaults.headers.common['Accept'] = 'application/json';

if (token) {
  axiosInstance.defaults.headers.common['Authorization'] = token;
}

axiosInstance.interceptors.response.use(
  (res: AxiosResponse): AxiosResponse => {
    if (res.status === 401) {
      localStorage.removeItem('accessToken');
    }
    return res
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default axiosInstance;
