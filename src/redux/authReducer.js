import { authAPI, usersAPI } from './../api/api';

const SET_AUTH_DATA = 'SET_AUTH_DATA';

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


export const getAuthUserData = () => (dispatch) => {
    authAPI.me()
        .then((data) => {
            if (data.resultCode === 0) {
                const userId = data.data.id;
                const email = data.data.email;
                const login = data.data.login;

                usersAPI.getProfile(userId)
                    .then((data) => {
                        dispatch(setAuthData(userId, email, login, data.photos.small, true));
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
                dispatch(setAuthData(null, null, null, null, false));
            }
        });
};


export default authReducer;