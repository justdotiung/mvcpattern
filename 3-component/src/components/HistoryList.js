import React from "react";
import List from "./List.js";
import { formatRelativeDate } from "../helpers.js";
import Store from "../Store.js";

export default class HistoryList extends React.Component {
  constructor() {
    super();
    this.state = {
      historyList: [],
    };
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    const historyList = Store.getHistoryList();
    this.setState({ historyList });
  }

  handleHistoryReset(keyword) {
    Store.removeHistory(keyword);
    this.fetch();
  }

  render() {
    return (
      <List
        data={this.state.historyList}
        onClick={this.props.onClick}
        hasDate
        onRemove={(keyword) => this.handleHistoryReset(keyword)}
      />
    );
  }
}
