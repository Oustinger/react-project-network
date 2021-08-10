import axios from "axios";
import { merge as lodashMerge } from 'lodash';
import { firstLetterToLowerCase } from './../utils/stringHelpers';

const axiosInstance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '4aa3c029-d10b-4234-b12c-2d43abc79c45',
    }
});

export const getErrors = (errorMessages) => {
    if (errorMessages.length > 0) {
        return errorMessages.reduce(
            (acc, errorText) => {
                if (errorText.includes('(')) {
                    const [message, dirtyFieldText] = errorText.split(' (');

                    const fieldText = dirtyFieldText.split(')')[0];
                    const error = fieldText.includes('->') ?
                        fieldText.split('->')
                            .reverse()
                            .map(fieldPart => firstLetterToLowerCase(fieldPart))
                            .reduce((acc, fieldPart, index) => (
                                { [fieldPart]: index === 0 ? message : { ...acc } }
                            ), {})
                        : { [firstLetterToLowerCase(fieldText)]: message };

                    return lodashMerge({ ...acc }, error);
                }

                return { ...acc, _error: errorText };
            }, {})
    }

    return { _error: 'Some error' };
};

export const usersAPI = {
    getUsers(pageNumber = 1, pageSize = 5) {
        return axiosInstance.get(`users?page=${pageNumber}&count=${pageSize}`)
            .then((response) => response.data);
    },

    getProfile(userId) {
        console.warn('Obsolete method. Please use ProfileAPI');
        return profileAPI.getProfile(userId);
    },
};

export const followAPI = {
    isFollowed(userId) {
        return axiosInstance.get(`follow/${userId}`)
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
        return axiosInstance.get(`profile/${userId}`)
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
    savePhoto(file) {
        const formData = new FormData();
        formData.append('image', file);

        return axiosInstance.put(`profile/photo`, formData, {
            "headers": {
                "Content-Type": "multipart/form-data"
            }
        }).then((response) => response.data);
    },
    updateData(profileData) {
        return axiosInstance.put(`profile`, profileData)
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

export const securityAPI = {
    getCaptchaUrl() {
        try {
            return axiosInstance.get(`security/get-captcha-url`)
                .then((response) => response.data);
        } catch {
            alert('Caught http error while trying getCaptchaUrl()');
        }
    },
};
