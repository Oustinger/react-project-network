import { profileAPI, usersAPI } from "../api/api";
import { reset as resetForm } from 'redux-form';

const ADD_POST = 'network/profile/ADD-POST';
const SET_USER_PROFILE = 'network/profile/SET_USER_PROFILE';
const SET_PROFILE_STATUS = 'network/profile/SET_PROFILE_STATUS';
const FETCHING_USER_PROFILE = 'network/profile/FETCHING_USER_PROFILE';

const initialState = {
    posts: [
        { id: 1, message: 'Hi! Like this post!', likesCount: '25' },
        { id: 2, message: 'Hello, friends!!!', likesCount: '12' },
        { id: 3, message: 'My first post! :)', likesCount: '10' },
    ],
    profile: null,
    status: '',
    isFetchingUserProfile: false,
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            const newPost = {
                id: state.posts.length + 1,
                message: action.text,
                likesCount: '0',
            };

            return {
                ...state,
                posts: [...state.posts, newPost],
            };
        }
        case SET_USER_PROFILE: {
            return { ...state, profile: action.profile };
        }
        case SET_PROFILE_STATUS: {
            return { ...state, status: action.status };
        }
        case FETCHING_USER_PROFILE: {
            return { ...state, isFetchingUserProfile: action.isFetching };
        }
        default:
            return state;
    }
};

export const addPost = (text) => ({ type: ADD_POST, text });
export const setUserProfile = (profile) => (
    { type: SET_USER_PROFILE, profile }
);
export const setProfileStatus = (status) => (
    { type: SET_PROFILE_STATUS, status }
);
export const fetchingUserProfile = (isFetching) => (
    { type: FETCHING_USER_PROFILE, isFetching }
);


export const getUserProfile = (userId) => async (dispatch) => {
    dispatch(fetchingUserProfile(true));
    
    const data = await usersAPI.getProfile(userId);
    dispatch(setUserProfile(data));
    dispatch(fetchingUserProfile(false));
};
export const getProfileStatus = (userId) => async (dispatch) => {
    const data = await profileAPI.getProfileStatus(userId);
    dispatch(setProfileStatus(data));
};
export const updateProfileStatus = (status) => async (dispatch) => {
    const data = await profileAPI.updateProfileStatus(status);
    if (data.resultCode === 0)
        dispatch(setProfileStatus(status));
};
export const resetPostForm = () => (dispatch) => {
    dispatch(resetForm('post'));
};


export default profileReducer;