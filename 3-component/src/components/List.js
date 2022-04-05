import React from "react";
import { formatRelativeDate } from "../helpers.js";

const List = ({
  data,
  onClick,
  hasIndex = false,
  hasDate = false,
  onRemove,
}) => {
  const handleHistoryReset = (e, keyword) => {
    e.stopPropagation();
    onRemove(keyword);
  };

  return (
    <ul className="list">
      {data.map((data, i) => (
        <li
          key={data.id}
          onClick={() => {
            onClick(data.keyword);
          }}
        >
          {hasIndex && <span className="number">{i + 1}</span>}
          <span>{data.keyword}</span>
          {hasDate && (
            <span className="date">{formatRelativeDate(data.date)}</span>
          )}
          {!!onRemove && (
            <button
              className="btn-remove"
              onClick={(e) => {
                handleHistoryReset(e, data.keyword);
              }}
            ></button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default List;
