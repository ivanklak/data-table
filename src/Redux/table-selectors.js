import { createSelector } from "reselect";

const getUsersSelector = state => {
  return state.tablePage.users;
};

export const getUsers = createSelector(getUsersSelector, users => {
  return users.filter(u => true);
});

export const getPageSize = state => {
  return state.tablePage.pageSize;
};

export const getTotalUsersCount = state => {
  return state.tablePage.totalUsersCount;
};

export const getCurrentPage = state => {
  return state.tablePage.currentPage;
};
