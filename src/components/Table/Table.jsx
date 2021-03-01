import React, { useState } from "react";
import s from "./Table.module.css";

import { NavigateNext } from "@styled-icons/material-rounded/NavigateNext";
import { ArrowIosBackOutline } from "@styled-icons/evaicons-outline/ArrowIosBackOutline";


const Table = props => {
  //   console.log(props);
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }
  let portionSize = 10;
  let portionsCount = Math.ceil(pagesCount / portionSize);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortionNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionNumber = portionNumber * portionSize;

  const { sortRows } = props;
  const getNames = name => {
    if (!sortRows) {
      return;
    }
    return sortRows.key === name ? sortRows.direction : undefined;
  };

  return (
    <div key={props.users.id}>
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
        {portionNumber > 1 && (
          <ArrowIosBackOutline
            size="25"
            color="grey"
            className={s.pagesBtnLeft}
            onClick={() => {
              setPortionNumber(portionNumber - 1);
            }}
          />
        )}

        {pages
          .filter(p => p >= leftPortionNumber && p <= rightPortionNumber)
          .map(p => {
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
        {portionsCount > portionNumber && (
          <NavigateNext
            size="25"
            color="grey"
            className={s.pagesBtnRight}
            onClick={() => {
              setPortionNumber(portionNumber + 1);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Table;
