import { getAuthUserData } from "./authReducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

const initialState = {
    isInitialized: false,
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return { ...state, isInitialized: true };
        }
        default:
            return state;
    }
};

export const initializedSuccess = () => ({
    type: INITIALIZED_SUCCESS,
});


export const initialize = () => (dispatch) => {
    Promise.all([
        dispatch(getAuthUserData()),
    ]).then(() => {
        dispatch(initializedSuccess());
    });
};


export default appReducer;