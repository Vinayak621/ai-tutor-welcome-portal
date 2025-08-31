import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const Googleauth = async (code) => {
  try {
    const response = await api.get(`/api/auth/google?code=${code}`);
    return response.data;
  } catch (error) {
    console.error("Error during Google authentication:", error);
    throw error;
  }
}