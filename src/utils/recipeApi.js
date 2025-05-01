import axios from 'axios';

const API_KEY = import.meta.env.VITE_RECIPE_SEARCH_API_KEY;

const recipeApi = axios.create({
  baseURL: `https://openapi.foodsafetykorea.go.kr/api/${API_KEY}`,
  headers: {
    Accept: 'application/json',
  },
});

axios.interceptors.request.use(
  (config) => {
    console.log('requested', config);
    return config;
  },
  (error) => {
    console.log('request, error', error);
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => {
    console.log('responded', response);
    return response;
  },
  (error) => {
    console.log('response, error', error);
    return Promise.reject(error);
  },
);

export default recipeApi;
