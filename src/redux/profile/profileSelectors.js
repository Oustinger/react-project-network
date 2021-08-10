import { reverse as lodashReverse } from 'lodash';
import { createSelector } from 'reselect';

export const getProfile = (state) => state.profilePage.profile;
export const getIsFollowed = (state) => state.profilePage.isFollowed;

export const getWallpaperPrimitive = (state) => state.profilePage.profile && state.profilePage.profile.wallpaper;
export const getWallpaper = createSelector(
    getWallpaperPrimitive,
    getProfile,
    (wallpaper, profile) => profile && wallpaper,
);

export const getIsFollowingInProgress = (state) => state.profilePage.isFollowingInProgress;
export const getIsUploadingDataInProgress = (state) => state.profilePage.isUploadingDataInProgress;
export const getStatus = (state) => state.profilePage.status;

export const getPostsPrimitive = (state) => state.profilePage.posts;
export const getPosts = createSelector(getPostsPrimitive, (posts) => lodashReverse([...posts]));

export const getIsFetchingUserProfile = (state) => state.profilePage.isFetchingUserProfile;
export const getCurrentUserId = (state) => state.profilePage.currentUserId;
export const getProfileDataEditMode = (state) => state.profilePage.profileDataEditMode;