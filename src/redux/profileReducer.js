import _ from 'lodash';
import { reset as resetForm, stopSubmit } from 'redux-form';
import { profileAPI } from "../api/api";
import { getErrors, followAPI } from './../api/api';

const ADD_POST = 'network/profile/ADD-POST';
const SET_USER_PROFILE = 'network/profile/SET_USER_PROFILE';
const SET_PROFILE_STATUS = 'network/profile/SET_PROFILE_STATUS';
const FETCHING_USER_PROFILE = 'network/profile/FETCHING_USER_PROFILE';
const SET_CURRENT_USER_ID = 'network/profile/SET_CURRENT_USER_ID';
const SAVE_PHOTO_SUCCESS = 'network/profile/SAVE_PHOTO_SUCCESS';
const TOGGLE_PROFILE_DATA_EDIT_MODE = 'network/profile/TOGGLE_PROFILE_DATA_EDIT_MODE';
const SET_IS_FOLLOWED = 'network/profile/SET_IS_FOLLOWED';
const FOLLOW = 'network/profile/FOLLOW';
const UNFOLLOW = 'network/profile/UNFOLLOW';
const TOGGLE_FOLLOWING_PROGRESS = 'network/users/TOGGLE_FOLLOWING_PROGRESS';

const initialState = {
    posts: [
        { id: 1, message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', likesCount: '25' },
        { id: 2, message: 'Hello, friends!!!', likesCount: '12' },
        { id: 3, message: 'My first post! :)', likesCount: '10' },
    ],
    profile: null,
    status: '',
    isFetchingUserProfile: false,
    currentUserId: null,
    profileDataEditMode: false,
    isFollowed: false,
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
        case SET_CURRENT_USER_ID: {
            return { ...state, currentUserId: action.userId };
        }
        case SAVE_PHOTO_SUCCESS: {
            return { ...state, profile: { ...state.profile, photos: action.photos } };
        }
        case TOGGLE_PROFILE_DATA_EDIT_MODE: {
            return { ...state, profileDataEditMode: !state.profileDataEditMode };
        }
        case SET_IS_FOLLOWED: {
            return { ...state, isFollowed: action.isFollowed };
        }
        case FOLLOW: {
            return { ...state, isFollowed: true };
        }
        case UNFOLLOW: {
            return { ...state, isFollowed: false };
        }
        case TOGGLE_FOLLOWING_PROGRESS: {
            return { ...state, followingInProgress: action.isFollowing };
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
export const setCurrentUserId = (userId) => (
    { type: SET_CURRENT_USER_ID, userId }
);
export const savePhotoSuccess = (photos) => (
    { type: SAVE_PHOTO_SUCCESS, photos }
);
export const toggleProfileDataEditMode = () => (
    { type: TOGGLE_PROFILE_DATA_EDIT_MODE }
);
export const setIsFollowed = (isFollowed) => (
    { type: SET_IS_FOLLOWED, isFollowed }
);
export const followSuccess = () => ({ type: FOLLOW });
export const unfollowSuccess = () => ({ type: UNFOLLOW });
export const toggleFollowingProgress = (isFollowing) => ({
    type: TOGGLE_FOLLOWING_PROGRESS, isFollowing
});


export const getUserProfile = (userId) => async (dispatch, getState) => {
    const isAuth = getState().auth.isAuth;
    dispatch(fetchingUserProfile(true));

    const data = await profileAPI.getProfile(userId);

    if (isAuth)
        await dispatch(getIsFollowed(userId));

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
export const savePhoto = (file) => async (dispatch) => {
    const data = await profileAPI.savePhoto(file);
    if (data.resultCode === 0)
        dispatch(savePhotoSuccess(data.data.photos));
};
const checkUpdateProfileFormData = (formData) => {
    const fixedContacts = Object.entries(formData.contacts).filter(([contact, address]) => address)
        .filter(([contact, address]) => !address.includes('://'))
        .map(([contact, address]) => [contact, `https://${address}`])
        .reduce((acc, [contact, address]) => ({ ...acc, [contact]: address }), {});

    return _.merge({ ...formData, contacts: { ...formData.contacts } }, { contacts: fixedContacts });
};
export const updateProfileData = (formData) => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const checkedFromData = checkUpdateProfileFormData(formData);

    const data = await profileAPI.updateData({ userId, ...checkedFromData });
    if (data.resultCode === 0) {
        dispatch(toggleProfileDataEditMode());
        dispatch(getUserProfile(userId));
    } else {
        dispatch(stopSubmit('profile', getErrors(data.messages)));
    }
};

export const getIsFollowed = (userId) => async (dispatch) => {
    const data = await followAPI.isFollowed(userId);
    dispatch(setIsFollowed(data));
};
const redirectToLoginPage = (urlHistory) => {
    urlHistory.push('/login');
};
const followUnfollowFlow = async (userId, urlHistory, dispatch, getState, apiMethod, onSuccess) => {
    const isAuth = getState().auth.isAuth;

    if (isAuth) {
        dispatch(toggleFollowingProgress(true));

        const data = await apiMethod(userId);

        if (data.resultCode === 0)
            dispatch(onSuccess());

        dispatch(toggleFollowingProgress(false));

        return;
    }

    redirectToLoginPage(urlHistory);
};
export const unfollowProfile = (userId, urlHistory) => (dispatch, getState) => {
    followUnfollowFlow(userId, urlHistory, dispatch, getState, followAPI.unfollow, unfollowSuccess);
};
export const followProfile = (userId, urlHistory) => (dispatch, getState) => {
    followUnfollowFlow(userId, urlHistory, dispatch, getState, followAPI.follow, followSuccess);
};


export default profileReducer;