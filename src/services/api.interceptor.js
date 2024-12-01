import axios from "axios";
const mainAxios = process.env.REACT_APP_END_URL;


axios.defaults.baseURL = mainAxios;

axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');

      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
  
      return config;
    },
    (error) => {
      // Handle the error
      return Promise.reject(error);
    }
  );

export const IsBaseURL = (setCommonCode = true, URLName = 'dw') => {
    axios.defaults.baseURL = mainAxios
}