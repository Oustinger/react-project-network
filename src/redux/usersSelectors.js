import { createSelector } from "reselect";

const getUsersPrimitive = (state) => state.usersPage.users;

export const getUsers = createSelector(getUsersPrimitive, (users) => (
    users.filter(u => true)
));

export const getTotalUsersCount = (state) => state.usersPage.totalUsersCount;
export const getPageSize = (state) => state.usersPage.pageSize;
export const getCurrentPage = (state) => state.usersPage.currentPage;
export const getIsFetching = (state) => state.usersPage.isFetching;
export const getFollowingInProgress = (state) => state.usersPage.followingInProgress;