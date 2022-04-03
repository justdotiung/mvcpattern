import React from "react";

export const TabType = {
  KEYWORD: "KEYWORD",
  HISTORY: "HISTORY",
};

const TabLabel = {
  [TabType.KEYWORD]: "추천검색어",
  [TabType.HISTORY]: "최근검색어",
};

const Tabs = ({ selectedTab, onSelectedTab }) => {
  return (
    <ul className="tabs">
      {Object.values(TabType).map((type) => (
        <li
          key={type}
          className={type === selectedTab ? `active` : ""}
          onClick={() => onSelectedTab(type)}
        >
          {TabLabel[type]}
        </li>
      ))}
    </ul>
  );
};

export default Tabs;
