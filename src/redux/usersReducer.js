const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const SET_USERS_COUNT = 'SET_USERS_COUNT';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

const initialState = {
    users: [],
    totalUsersCount: 0,
    usersCount: 5,
    currentPage: 1,
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                users: state.users.map((u) => {
                    if (u.id === action.userId)
                        return {
                            ...u,
                            followed: true,
                        };

                    return u;
                }),
            };
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: state.users.map((u) => {
                    if (u.id === action.userId)
                        return {
                            ...u,
                            followed: false,
                        };

                    return u;
                }),
            };
        }
        case SET_USERS: {
            return { ...state, users: [...action.newUsers] };
        }
        case SET_TOTAL_USERS_COUNT: {
            return { ...state, totalUsersCount: action.totalUsersCount };
        }
        case SET_USERS_COUNT: {
            return { ...state, usersCount: action.usersCount };
        }
        case SET_CURRENT_PAGE: {
            return { ...state, currentPage: action.currentPage };
        }
        default:
            return state;
    }
};

export const followAC = (userId) => ({ type: FOLLOW, userId });

export const unfollowAC = (userId) => ({ type: UNFOLLOW, userId });

export const setUsersAC = (newUsers) => ({ type: SET_USERS, newUsers });

export const setTotalUsersCountAC = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, totalUsersCount });

export const setUsersCountAC = (usersCount) => ({ type: SET_USERS_COUNT, usersCount });

export const setCurrentPageAC = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage });

export default usersReducer;