import { updateObjectInArray } from '../../utils/objectHelpers';
import { followAPI, usersAPI } from './../../api/api';
import { addUsersWallpapers } from './../../utils/userWallpaperHelper';

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
    pageSize: 6,
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
            return { ...state, ...action.payload };
        }
        case SET_TOTAL_USERS_COUNT: {
            return { ...state, ...action.payload };
        }
        case SET_PAGE_SIZE: {
            return { ...state, ...action.payload };
        }
        case SET_CURRENT_PAGE: {
            return { ...state, ...action.payload };
        }
        case TOGGLE_IS_FETCHING: {
            return { ...state, ...action.payload };
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

export const setUsers = (users) => ({ type: SET_USERS, payload: { users } });

export const setTotalUsersCount = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, payload: { totalUsersCount } });

export const setPageSize = (pageSize) => ({ type: SET_PAGE_SIZE, payload: { pageSize } });

export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, payload: { currentPage } });

export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, payload: { isFetching } });

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
    const usersItems = addUsersWallpapers(data.items);
    dispatch(setUsers(usersItems));
    dispatch(setTotalUsersCount(data.totalCount));
};

const redirectToLoginPage = (urlHistory) => {
    urlHistory.push('/login');
};

const followUnfollowFlow = async (userId, urlHistory, dispatch, getState, apiMethod, onSuccess) => {
    const isAuth = getState().auth.isAuth;

    if (isAuth) {
        dispatch(toggleFollowingProgress(true, userId));

        const data = await apiMethod(userId);

        if (data.resultCode === 0)
            dispatch(onSuccess(userId));

        dispatch(toggleFollowingProgress(false, userId));

        return;
    }

    redirectToLoginPage(urlHistory);
};

export const unfollow = (userId, urlHistory) => (dispatch, getState) => {
    followUnfollowFlow(userId, urlHistory, dispatch, getState, followAPI.unfollow, unfollowSuccess);
};

export const follow = (userId, urlHistory) => (dispatch, getState) => {
    followUnfollowFlow(userId, urlHistory, dispatch, getState, followAPI.follow, followSuccess);
};


export default usersReducer;