import axios from "axios";

const api = import.meta.env.VITE_API_URL;

export const sendMessage = async (message: string, model: string) => {
  try {
    const response = await axios.post(`${api}/chat`, { message, model });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
