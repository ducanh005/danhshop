import axios from "axios";

export const axiosJWT = axios.create({});

export const loginUser = async (data) => {
   
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/sign-in`,
        data
    );
    return res.data;
};
export const signupUser = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/sign-up`,
        data
    );
    return res.data;
};

export const getDetailsUser = async (id, access_token) => {
    const token = localStorage.getItem("access-token"); // ✅ Không dùng JSON.parse
    const res = await axiosJWT.get(
        `${process.env.REACT_APP_API_URL}/user/get-details/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return res.data;
};

export const getAllUser = async () => {
    const token = localStorage.getItem("access-token"); // ✅ Không dùng JSON.parse

    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/getAll`, {
        headers: {
        Authorization: `Bearer ${token}`,
        }
    });

    return res.data;
};
export const deleteUser = async (id, access_token, data) => {
    const token = localStorage.getItem("access-token"); // ✅ Không dùng JSON.parse
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/user/delete-user/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data,
        }
    );
    return res.data;
};


export const refreshToken = async () => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/refresh-token`,
        {
            withCredentials: true,
        }
    );
    return res.data;
};

export const logoutUser = async () => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/log-out`
    );
    return res.data;
};

export const updateUser = async (id,data, access_token) => {
    const token = localStorage.getItem("access-token")
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/user/update-user/${id}`,data,
         { headers: {
                Authorization: `Bearer ${token}`,
            }
            
        }
    );
    return res.data;
};

export const deleteManyUsers = async (ids) => {
    const access_token = localStorage.getItem("access-token"); // ✅ Không cần truyền vào nữa
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/user/delete-many`,ids,
        {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }
    );
    return res.data;
};