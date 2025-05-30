import axios from "axios";

const url = import.meta.env.VITE_API_URL;

const instance = axios.create({
	baseURL: url, // or wherever your backend is hosted
});

export default instance;
