const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const SET_USERS_COUNT = 'SET_USERS_COUNT';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOWING_PROGRESS = 'TOGGLE_FOLLOWING_PROGRESS';

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

export const follow = (userId) => ({ type: FOLLOW, userId });

export const unfollow = (userId) => ({ type: UNFOLLOW, userId });

export const setUsers = (newUsers) => ({ type: SET_USERS, newUsers });

export const setTotalUsersCount = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, totalUsersCount });

export const setUsersCount = (pageSize) => ({ type: SET_USERS_COUNT, pageSize });

export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage });

export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });

export const toggleFollowingProgress = (isFollowing, userId) => ({
    type: TOGGLE_FOLLOWING_PROGRESS,
    isFollowing,
    userId,
});

export default usersReducer;