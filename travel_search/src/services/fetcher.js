import axios from 'axios';
import {API_URL} from "../config/config"

const fetcher = async (url, method = 'GET', body = null) => {
    const options = {
        method,
        url: `${API_URL}${url}`,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (body) {
        options.data = body;
    }

    try {
        const response = await axios(options);
        return response.data;
    } catch (error) {
        console.error("Axios error:", error);
        throw error;
    }
};

export default fetcher;