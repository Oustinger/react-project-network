import { profileAPI, usersAPI } from "../api/api";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_PROFILE_STATUS = 'SET_PROFILE_STATUS';

const initialState = {
    posts: [
        { id: 1, message: 'Hi! Like this post!', likesCount: '25' },
        { id: 2, message: 'Hello, friends!!!', likesCount: '12' },
        { id: 3, message: 'My first post! :)', likesCount: '10' },
    ],
    newPostText: '',
    profile: null,
    status: '',
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            const newPost = {
                id: state.posts.length + 1,
                message: state.newPostText,
                likesCount: '0',
            };

            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: '',
            };
        }
        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.newText,
            };
        }
        case SET_USER_PROFILE: {
            return { ...state, profile: action.profile };
        }
        case SET_PROFILE_STATUS: {
            return { ...state, status: action.status };
        }
        default:
            return state;
    }
};

export const addPostActionCreator = () => ({ type: ADD_POST });
export const updateNewPostTextActionCreator = (newText) => (
    { type: UPDATE_NEW_POST_TEXT, newText }
);
export const setUserProfile = (profile) => (
    { type: SET_USER_PROFILE, profile }
);
export const setProfileStatus = (status) => (
    { type: SET_PROFILE_STATUS, status }
);


export const getUserProfile = (userId) => (dispatch) => {
    usersAPI.getProfile(userId)
        .then((data) => {
            dispatch(setUserProfile(data));
        });
};
export const getProfileStatus = (userId) => (dispatch) => {
    profileAPI.getProfileStatus(userId)
        .then((data) => {
            dispatch(setProfileStatus(data));
        });
};
export const updateProfileStatus = (status) => (dispatch) => {
    profileAPI.updateProfileStatus(status)
        .then((data) => {
            if (data.resultCode === 0)
                dispatch(setProfileStatus(status));
        });
};


export default profileReducer;