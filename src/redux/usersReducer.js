import { updateObjectInArray } from '../utils/objectHelpers';
import { usersAPI } from './../api/api';

const FOLLOW = 'network/users/FOLLOW';
const UNFOLLOW = 'network/users/UNFOLLOW';
const SET_USERS = 'network/users/SET_USERS';
const SET_TOTAL_USERS_COUNT = 'network/users/SET_TOTAL_USERS_COUNT';
const SET_PAGE_SIZE = 'network/users/SET_PAGE_SIZE';
const SET_CURRENT_PAGE = 'network/users/SET_CURRENT_PAGE';
const TOGGLE_IS_FETCHING = 'network/users/TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOWING_PROGRESS = 'network/users/TOGGLE_FOLLOWING_PROGRESS';

const initialState = {
    users: [],
    totalUsersCount: 0,
    pageSize: 5,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                users: updateObjectInArray(state.users, 'id', action.userId, { followed: true }),
            };
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: updateObjectInArray(state.users, 'id', action.userId, { followed: false }),
            };
        }
        case SET_USERS: {
            return { ...state, users: [...action.newUsers] };
        }
        case SET_TOTAL_USERS_COUNT: {
            return { ...state, totalUsersCount: action.totalUsersCount };
        }
        case SET_PAGE_SIZE: {
            return { ...state, pageSize: action.pageSize };
        }
        case SET_CURRENT_PAGE: {
            return { ...state, currentPage: action.currentPage };
        }
        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching };
        }
        case TOGGLE_FOLLOWING_PROGRESS: {
            return (
                action.isFollowing ?
                    { ...state, followingInProgress: [...state.followingInProgress, action.userId] } :
                    { ...state, followingInProgress: state.followingInProgress.filter((id) => id !== action.userId) }
            );
        }
        default:
            return state;
    }
};

export const followSuccess = (userId) => ({ type: FOLLOW, userId });

export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId });

export const setUsers = (newUsers) => ({ type: SET_USERS, newUsers });

export const setTotalUsersCount = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, totalUsersCount });

export const setPageSize = (pageSize) => ({ type: SET_PAGE_SIZE, pageSize });

export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage });

export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });

export const toggleFollowingProgress = (isFollowing, userId) => ({
    type: TOGGLE_FOLLOWING_PROGRESS,
    isFollowing,
    userId,
});


export const requestUsers = (pageNumber, pageSize) => async (dispatch) => {
    dispatch(toggleIsFetching(true));

    const data = await usersAPI.getUsers(pageNumber, pageSize);

    dispatch(toggleIsFetching(false));
    dispatch(setCurrentPage(pageNumber));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
};

const followUnfollowFlow = async (userId, dispatch, apiMethod, onSuccess) => {
    dispatch(toggleFollowingProgress(true, userId));

    const data = await apiMethod(userId);

    if (data.resultCode === 0)
        dispatch(onSuccess(userId));

    dispatch(toggleFollowingProgress(false, userId));
};

export const unfollow = (userId) => (dispatch) => {
    followUnfollowFlow(userId, dispatch, usersAPI.unfollow, unfollowSuccess);
};

export const follow = (userId) => (dispatch) => {
    followUnfollowFlow(userId, dispatch, usersAPI.follow, followSuccess);
};


export default usersReducer;