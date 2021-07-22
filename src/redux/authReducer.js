import { stopSubmit } from 'redux-form';
import { authAPI, profileAPI, getErrors, securityAPI } from './../api/api';

const SET_AUTH_DATA = 'network/auth/SET_AUTH_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'network/auth/GET_CAPTCHA_URL_SUCCESS';

const initialState = {
    userId: null,
    email: null,
    login: null,
    photo: null,
    isAuth: false,
    captchaUrl: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_DATA: {
            return { ...state, ...action.payload };
        }
        case GET_CAPTCHA_URL_SUCCESS: {
            return { ...state, ...action.payload };
        }
        default:
            return state;
    }
};

export const setAuthData = (userId, email, login, photo, isAuth) => ({
    type: SET_AUTH_DATA,
    payload: { userId, email, login, photo, isAuth },
});
export const getCaptchaUrlSuccess = (captchaUrl) => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: { captchaUrl },
});


export const getAuthUserData = () => async (dispatch) => {
    const data = await authAPI.me();

    if (data.resultCode === 0) {
        const userId = data.data.id;
        const email = data.data.email;
        const login = data.data.login;

        const profileData = await profileAPI.getProfile(userId);
        dispatch(setAuthData(userId, email, login, profileData.photos.small, true));
        return profileData;
    }

    return data;
};
export const login = (formData) => async (dispatch) => {
    const data = await authAPI.login(formData);
    if (data.resultCode === 0) {
        dispatch(getAuthUserData());
    } else {
        if (data.resultCode === 10) {
            dispatch(getCaptchaUrl());
        }
        dispatch(stopSubmit('login', getErrors(data.messages)));
    }
};
export const getCaptchaUrl = () => async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl();
    dispatch(getCaptchaUrlSuccess(data.url));
};
export const logout = () => async (dispatch) => {
    const data = await authAPI.logout();
    if (data.resultCode === 0) {
        dispatch(setAuthData(null, null, null, null, false));
    }
};


export default authReducer;