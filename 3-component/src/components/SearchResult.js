import React from "react";

const SearchResult = ({ data }) => {
  if (data.length <= 0) {
    return <li className="empty-box">검색결과가 없습니다.</li>;
  }
  return (
    <>
      <ul className="result">
        {data.map(({ id, name, imageUrl }) => (
          <li key={id}>
            <img src={imageUrl} art={name} />
            <p>{name}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SearchResult;
