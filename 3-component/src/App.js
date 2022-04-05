import React from "react";
import Headers from "./components/Header.js";
import HistoryList from "./components/HistoryList.js";
import KeywordList from "./components/KeywordList.js";
import SearchForm from "./components/SearchForm.js";
import SearchResult from "./components/SearchResult.js";
import Tabs, { TabType } from "./components/Tabs.js";
import store from "./Store.js";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchKeyword: "",
      searchResult: [],
      submitted: false,
      selectedTab: TabType.KEYWORD,
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.search(this.state.searchKeyword);
  }

  search(searchKeyword = "") {
    const searchResult = store.search(searchKeyword);
    this.setState({
      searchResult,
      searchKeyword,
      submitted: true,
    });
  }

  handleReset() {
    this.setState({ searchKeyword: "", searchResult: [], submitted: false });
  }

  handleChange(searchKeyword) {
    if (searchKeyword.length <= 0) {
      this.handleReset();
      return;
    }
    this.setState({ searchKeyword });
  }

  handleSelectedTab(selectedTab) {
    this.setState({ selectedTab });
  }

  render() {
    const { searchKeyword, searchResult, submitted, selectedTab } = this.state;
    return (
      <>
        <Headers />
        <div className="container">
          <SearchForm
            value={searchKeyword}
            onSubmit={(e) => this.handleSubmit(e)}
            onReset={() => this.handleReset()}
            onChange={(value) => this.handleChange(value)}
          />
          <div className="content">
            {submitted ? (
              <SearchResult data={searchResult} />
            ) : (
              <>
                <Tabs
                  selectedTab={selectedTab}
                  onSelectedTab={(type) => {
                    this.handleSelectedTab(type);
                  }}
                />
                {selectedTab === TabType.KEYWORD && (
                  <KeywordList
                    onClick={(keyword) => {
                      this.search(keyword);
                    }}
                  />
                )}
                {selectedTab === TabType.HISTORY && (
                  <HistoryList
                    onClick={(keyword) => {
                      this.search(keyword);
                    }}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}
