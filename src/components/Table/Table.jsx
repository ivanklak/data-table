import React from "react";
import s from "./Table.module.css";

const Table = props => {
  //   console.log(props);

  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const { sortRows } = props.users;
  const getNames = name => {
    if (!sortRows) {
      return;
    }
    return sortRows.key === name ? sortRows.direction : undefined;
  };

  return (
    <div>
      <div className={s.pages}>
        {pages.map(p => {
          return (
            <span
              className={props.currentPage === p && s.selectedPage}
              onClick={e => {
                props.onPageChanged(p);
              }}
            >
              {p + " "}
            </span>
          );
        })}
      </div>
      <table className={s.table}>
        <thead className={s.thead}>
          <tr>
            <th
              onClick={() => props.requestSort("id")}
              className={getNames("id")}
            >
              ID
            </th>
            <th
              onClick={() => props.requestSort("name")}
              className={getNames("name")}
            >
              Name
            </th>
            <th
              onClick={() => props.requestSort("status")}
              className={getNames("status")}
            >
              Status
            </th>
            <th>Photo</th>
          </tr>
        </thead>
        <tbody className={s.tbody}>
          {props.users.map(u => (
            <tr key={u.id} className={s.tbody}>
              <td>{u.id}</td>
              <td style={{ width: "250px" }}>{u.name}</td>
              <td style={{ width: "250px" }}>
                {u.status ? u.status : "No status yet"}
              </td>
              <td>{u.photos.small != null ? "Yep" : "Nope"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={s.pages}>
        {pages.map(p => {
          return (
            <span
              className={props.currentPage === p && s.selectedPage}
              onClick={e => {
                props.onPageChanged(p);
              }}
            >
              {p + " "}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Table;
