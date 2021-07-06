import { authAPI, profileAPI } from './../api/api';

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
            return { ...state, ...action.data, isAuth: true };
        }
        default:
            return state;
    }
};

export const setAuthData = (userId, email, login, photo) => ({
    type: SET_AUTH_DATA,
    data: { userId, email, login, photo },
});


export const authenticate = () => (dispatch) => {
    authAPI.getAuth()
        .then((data) => {
            if (data.resultCode === 0) {
                const userId = data.data.id;
                const email = data.data.email;
                const login = data.data.login;

                profileAPI.getProfile(userId)
                    .then((data) => {
                        dispatch(setAuthData(userId, email, login, data.photos.small));
                    });
            }
        });
};


export default authReducer;