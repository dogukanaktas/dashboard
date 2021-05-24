import axiosInstance from '../helpers/axios';
import { EditableFields } from '../pages/User';
import { Users } from '../types/types';
import loginService from './loginService';

const userService = {
  getAll: async (id: number | null | '' = '') => {
    let data: Users[] = [];

    await axiosInstance
      .get(`/users/${id}`)
      .then((res) => {
        data = res.data;
      })
      .catch((err) => console.log(err));

    return data;
  },

  register: async (formData: object) => {
    let result: string = '';
    await loginService
      .getToken('/register/', formData)
      .then((token) => {
        result = token;
      })
      .catch((err) => console.log(err));

    return result;
  },

  delete: async (id: number | null | '' = '') => {
    let data;
    await axiosInstance.delete(`/users/${id}`).then((res) => {
      data = res.data;
    });

    return data;
  },

  patch: async (id: number | null | '' = '', userData: EditableFields) => {
    return await axiosInstance.patch(`/users/${id}`, userData);
  },
};

export default userService;
