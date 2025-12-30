import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

axiosClient.interceptors.request.use((Config) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    Config.headers.Authorization = `Bearer ${token}`;
    return Config;
});

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const { response } = error;
        if (response.status === 401) {
            localStorage.removeItem("ACCESS_TOKEN");
        } else if (response.status === 404) {
            //show not found
        }
        throw error;
    }
);

export default axiosClient;