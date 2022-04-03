import React from "react";
import List from "./List.js";
import Store from "../Store";

export default class KeywordList extends List {
  componentDidMount() {
    const data = Store.getKeywordList();
    this.setState({ data });
  }

  renderItem(data, i) {
    return (
      <>
        <span className="number">{i + 1}</span>
        <span>{data.keyword}</span>
      </>
    );
  }
}
