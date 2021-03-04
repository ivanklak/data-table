import { usersAPI } from "../api/api";

const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";

let initialState = {
  users: [],
  pageSize: 50,
  totalUsersCount: 0,
  isFetching: true
};

const tableReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS: {
      return { ...state, users: action.users };
    }
    case SET_CURRENT_PAGE: {
      return { ...state, currentPage: action.currentPage };
    }

    case SET_TOTAL_USERS_COUNT: {
      return { ...state, totalUsersCount: action.count };
    }
    case TOGGLE_IS_FETCHING: {
      return { ...state, isFetching: action.isFetching };
    }
    default:
      return state;
  }
};

export const setUsers = users => ({ type: SET_USERS, users });
export const setCurrentPage = currentPage => ({
  type: SET_CURRENT_PAGE,
  currentPage
});
export const setTotalUsersCount = totalUsersCount => ({
  type: SET_TOTAL_USERS_COUNT,
  count: totalUsersCount
});
export const setTougleIsFetching = isFetching => ({
  type: TOGGLE_IS_FETCHING,
  isFetching
});

//thunk
export const requestUsers = (currentPage, pageSize) => {
  return dispatch => {
    dispatch(setTougleIsFetching(true));
    dispatch(setCurrentPage(currentPage));
    usersAPI.getUsers(currentPage, pageSize).then(data => {
      //   debugger;
      dispatch(setTougleIsFetching(false));
      dispatch(setUsers(data.items));
      dispatch(setTotalUsersCount(Math.ceil(data.totalCount / 4))); //чтобы не загружать всех пользователей
      // console.log(data);
    });
  };
};

export default tableReducer;
