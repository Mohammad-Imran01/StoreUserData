import axios from "axios";

const API_URL = "http://localhost:3000/api/users"; // change to your server URL if needed

export const getUsers = async () => {
    const res = await axios.get(API_URL);
    return res.data;
};

export const addUser = async (user) => {
    const res = await axios.post(API_URL, user);
    return res.data;
};

export const deleteUser = async (id) => {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
};
