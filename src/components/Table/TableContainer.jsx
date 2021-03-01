import React, { useState, useEffect } from "react";
import Table from "./Table";
import { connect } from "react-redux";
import {
  getUsers,
  getPageSize,
  getTotalUsersCount,
  getCurrentPage
} from "../../Redux/table-selectors";
import { requestUsers, setCurrentPage } from "../../Redux/table-reducer";

const TableContainer = props => {
  const [sortRows, setsortRowss] = useState([]);
  const { users } = props;

  const sortUsers = React.useMemo(() => {
    let sortedUsers = [...users];
    if (sortRows !== null) {
      sortedUsers.sort((a, b) => {
        if (a[sortRows.key] < b[sortRows.key]) {
          return sortRows.direction === "ascending" ? -1 : 1;
        }
        if (a[sortRows.key] > b[sortRows.key]) {
          return sortRows.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortedUsers;
  }, [users, sortRows]);

  const requestSort = key => {
    let direction = "ascending";
    if (
      sortRows &&
      sortRows.key === key &&
      sortRows.direction === "ascending"
    ) {
      direction = "descending";
    }
    setsortRowss({ key, direction });
  };

  useEffect(() => {
    props.requestUsers(props.currentPage, props.pageSize);
  }, []);

  const onPageChanged = pageNumber => {
    props.requestUsers(pageNumber, props.pageSize);
  };

  return (
    <div>
      <Table
        totalUsersCount={props.totalUsersCount}
        pageSize={props.pageSize}
        currentPage={props.currentPage}
        onPageChanged={onPageChanged}
        users={sortUsers}
        requestSort={requestSort}
        sortRows={sortRows}
      />
    </div>
  );
};

let mapStateToProps = state => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state)
  };
};

export default connect(mapStateToProps, { requestUsers, setCurrentPage })(
  TableContainer
);
