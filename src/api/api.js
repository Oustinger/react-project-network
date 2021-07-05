import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '740e9b25-6a1a-477c-b634-aeacf924d5ef',
    }
});

export const usersAPI = {
    getUsers(pageNumber = 1, pageSize = 5) {
        return axiosInstance.get(`users?page=${pageNumber}&count=${pageSize}`)
            .then((response) => response.data);
    },

    follow(userId) {
        return axiosInstance.post(`follow/${userId}`)
            .then((response) => response.data);
    },

    unfollow(userId) {
        return axiosInstance.delete(`follow/${userId}`)
            .then((response) => response.data);
    },
};

export const profileAPI = {
    getProfile(userId) {
        return axiosInstance.get(`profile/${userId || 18114}`)
            .then((response) => response.data);
    },
};

export const authAPI = {
    getAuth() {
        return axiosInstance.get(`auth/me`)
            .then((response) => response.data);
    },
};
