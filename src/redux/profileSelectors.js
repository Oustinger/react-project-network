export const getIsFollowed = (state) => state.profilePage.isFollowed;
export const getWallpaper = (state) => (state.profilePage.profile && state.profilePage.profile.wallpaper);
export const getIsFollowingInProgress = (state) => state.profilePage.isFollowingInProgress;
export const getIsUploadingDataInProgress = (state) => state.profilePage.isUploadingDataInProgress;