import React from "react";
import Table from "./Table";
import { connect } from "react-redux";
import {
  getUsers,
  getPageSize,
  getTotalUsersCount,
  getCurrentPage
} from "../../Redux/table-selectors";
import { requestUsers, setCurrentPage } from "../../Redux/table-reducer";

class TableContainer extends React.Component {
  componentDidMount() {
    this.props.requestUsers(this.props.currentPage, this.props.pageSize);
    // console.log(this.props);
    // debugger;
  }
  onPageChanged = pageNumber => {
    this.props.requestUsers(pageNumber, this.props.pageSize);
  };
  render() {
    return (
      <div>
        <Table
          users={this.props.users}
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageChanged={this.onPageChanged}
        />
      </div>
    );
  }
}

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
