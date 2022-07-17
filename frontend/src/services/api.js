import axios from "axios";

const { VUE_APP_ROOT_API_URL } = process.env;

const api = axios.create({ baseURL: VUE_APP_ROOT_API_URL });

export default api;
