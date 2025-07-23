import axios from "axios";
import {axiosJWT} from './UserService'
export const getAllProduct = async () => {
    const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/product/get-all`
    );
    return res.data;
};

export const createProduct = async (data) => {
    console.log(data)
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/product/create`,data,
    );
    return res.data;
};
export const getDetailsProduct = async (id) => {
    const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/product/get-details/${id}`
    );
    return res.data;
};

export const updateProduct = async (id, data) => {
    const access_token = localStorage.getItem("access-token"); // ✅ Không cần truyền vào nữa
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/product/update/${id}`,
        data,
        {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }
    );
    return res.data;
};