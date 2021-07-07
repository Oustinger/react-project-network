import { authAPI, usersAPI } from './../api/api';

const SET_AUTH_DATA = 'SET_AUTH_DATA';
const CLEAN_USER_AUTH_DATA = 'CLEAN_USER_AUTH_DATA';

const initialState = {
    userId: null,
    email: null,
    login: null,
    photo: null,
    isAuth: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_DATA: {
            return { ...state, ...action.data, isAuth: true };
        }
        case CLEAN_USER_AUTH_DATA: {
            return {
                ...state, userId: null, email: null,
                login: null, photo: null, isAuth: false,
            };
        }
        default:
            return state;
    }
};

export const setAuthData = (userId, email, login, photo) => ({
    type: SET_AUTH_DATA,
    data: { userId, email, login, photo },
});
export const cleanUserAuthData = () => ({
    type: CLEAN_USER_AUTH_DATA,
});


export const getAuthUserData = () => (dispatch) => {
    authAPI.me()
        .then((data) => {
            if (data.resultCode === 0) {
                const userId = data.data.id;
                const email = data.data.email;
                const login = data.data.login;

                usersAPI.getProfile(userId)
                    .then((data) => {
                        dispatch(setAuthData(userId, email, login, data.photos.small));
                    });
            }
        });
};
export const login = (formData) => (dispatch) => {
    authAPI.login(formData)
        .then((data) => {
            if (data.resultCode === 0) {
                dispatch(getAuthUserData());
            } else if (data.resultCode === 10) {
                console.error('Login failed. Need captcha.');
            }
        });
};
export const logout = () => (dispatch) => {
    authAPI.logout()
        .then((data) => {
            if (data.resultCode === 0) {
                dispatch(cleanUserAuthData());
            }
        });
};


export default authReducer;