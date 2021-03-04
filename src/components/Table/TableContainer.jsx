import React, { useState, useEffect } from "react";
import Table from "./Table";
import s from "./Table.module.css";
import { connect } from "react-redux";
import {
  getUsers,
  getPageSize,
  getTotalUsersCount,
  getCurrentPage,
  getIsFetching
} from "../../Redux/table-selectors";
import { requestUsers, setCurrentPage } from "../../Redux/table-reducer";
import Preloader from "../Preloader/Preloader";

const TableContainer = props => {
  const [sortRows, setSortRows] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    props.requestUsers(props.currentPage, props.pageSize);
  }, []);

  const onPageChanged = pageNumber => {
    props.requestUsers(pageNumber, props.pageSize);
  };

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
    setSortRows({ key, direction });
  };

  const search = rows => {
    return rows.filter(
      row => row.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
    );
  };

  return (
    <div>
      <input
        value={searchValue}
        type="text"
        className={s.search}
        placeholder="Search.. "
        onChange={e => setSearchValue(e.target.value)}
      />
      {props.isFetching ? <Preloader /> : null}
      <Table
        totalUsersCount={props.totalUsersCount}
        pageSize={props.pageSize}
        currentPage={props.currentPage}
        onPageChanged={onPageChanged}
        users={search(sortUsers)}
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
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state)
  };
};

export default connect(mapStateToProps, { requestUsers, setCurrentPage })(
  TableContainer
);
