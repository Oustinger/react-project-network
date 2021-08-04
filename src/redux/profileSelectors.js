export const getIsFollowed = (state) => state.profilePage.isFollowed;
export const getWallpaper = (state) => (state.profilePage.profile && state.profilePage.profile.wallpaper);