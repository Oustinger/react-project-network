import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': 'c97ad9c5-53df-4311-9eb0-ba502f90ac28',
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

    getProfile(userId) {
        console.warn('Obsolete method. Please use ProfileAPI');
        return profileAPI.getProfile(userId);
    },
};

export const profileAPI = {
    getProfile(userId) {
        return axiosInstance.get(`profile/${userId || 18114}`)
            .then((response) => response.data);
    },
    getProfileStatus(userId) {
        return axiosInstance.get(`profile/status/${userId}`)
            .then((response) => response.data);
    },
    updateProfileStatus(status) {
        return axiosInstance.put(`profile/status`, { status })
            .then((response) => response.data);
    },
};

export const authAPI = {
    me() {
        return axiosInstance.get(`auth/me`)
            .then((response) => response.data);
    },
    login(formData) {
        return axiosInstance.post(`auth/login`, formData)
            .then((response) => response.data);
    },
    logout() {
        return axiosInstance.delete(`auth/login`)
            .then((response) => response.data);
    },
};
