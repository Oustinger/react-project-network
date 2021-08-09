import { getAuthUserData } from "../auth/authReducer";

const INITIALIZED_SUCCESS = 'network/app/INITIALIZED_SUCCESS';

const initialState = {
    isInitialized: false,
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return { ...state, ...action.payload };
        }
        default:
            return state;
    }
};

export const initializedSuccess = () => ({
    type: INITIALIZED_SUCCESS,
    payload: { isInitialized: true },
});


export const initialize = () => (dispatch) => {
    Promise.all([
        dispatch(getAuthUserData()),
    ]).then(() => {
        dispatch(initializedSuccess());
    });
};


export default appReducer;