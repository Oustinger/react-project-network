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

export default authReducer;