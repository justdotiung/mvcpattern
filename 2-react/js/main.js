import { formatRelativeDate } from "./js/helpers.js";
import store from "./js/Store.js";

const TabType = {
  KEYWORD: "KEYWORD",
  HISTORY: "HISTORY",
};

const TabLabel = {
  [TabType.KEYWORD]: "추천검색어",
  [TabType.HISTORY]: "최근검색어",
};

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      searchKeyword: "",
      searchResult: [],
      submitted: false,
      selectedTab: TabType.KEYWORD,
      keywordList: [],
      historyList: [],
    };
  }

  componentDidMount() {
    const keywordList = store.getKeywordList();
    const historyList = store.getHistoryList();
    this.setState({ keywordList, historyList });
  }

  handleChangeInput(e) {
    if (e.target.value.length <= 0 && this.state.submitted) {
      return this.handleResetButton();
    }

    this.setState({
      searchKeyword: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.search(this.state.searchKeyword);
  }

  search(searchKeyword) {
    const searchResult = store.search(searchKeyword);
    const historyList = store.getHistoryList();

    this.setState({
      searchKeyword,
      searchResult,
      historyList,
      submitted: true,
    });
  }

  handleResetButton(e) {
    /*
    비동기로 되기때문에 정확하게 비워지지않는다.
    this.setState({
      searchKeyword: "",
    });
    */

    this.setState(
      () => ({
        searchKeyword: "",
        searchResult: [],
        submitted: false,
      }),
      () => {}
    );
  }

  handleHistoryResetButton(e, historyKeyword) {
    e.stopPropagation();
    const historyList = store.removeHistory(historyKeyword);

    this.setState({ historyList });
  }

  keywordList() {
    return store.getKeywordList();
  }

  historyList() {
    return store.getHistoryList();
  }

  render() {
    const searchForm = (
      <form
        onSubmit={(e) => this.handleSubmit(e)}
        onReset={() => this.handleResetButton()}
      >
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          autoFocus
          value={this.state.searchKeyword}
          onChange={(e) => this.handleChangeInput(e)}
        />
        {this.state.searchKeyword.length > 0 && (
          <button
            type="reset"
            className="btn-reset"
            onClick={(e) => this.handleResetButton(e)}
          ></button>
        )}
      </form>
    );

    const searchResultBox = (
      <div className="content">
        {this.state.searchResult.length > 0 ? (
          <ul className="result">
            {this.state.searchResult.map((data) => (
              <li key={data.id}>
                <img src={data.imageUrl} art={data.name} />
                <p>{data.name}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty-box">검색결과가 없습니다.</div>
        )}
      </div>
    );

    const keywordList = (
      <ul className="list">
        {this.state.keywordList.map((data, i) => (
          <li key={data.id} onClick={(e) => this.search(data.keyword)}>
            <span className="number">{i + 1}</span>
            <span>{data.keyword}</span>
          </li>
        ))}
      </ul>
    );

    const historyList = (
      <ul className="list">
        {this.state.historyList.map((data, i) => (
          <li
            key={data.id}
            onClick={(e) => {
              this.search(data.keyword);
            }}
          >
            <span className="number">{i + 1}</span>
            <span>{data.keyword}</span>
            <span className="date">{formatRelativeDate(data.date)}</span>
            <button
              className="btn-remove"
              onClick={(e) => {
                this.handleHistoryResetButton(e, data.keyword);
              }}
            ></button>
          </li>
        ))}
      </ul>
    );

    const tabs = (
      <>
        <ul className="tabs">
          {Object.values(TabType).map((type) => (
            <li
              key={type}
              className={type === this.state.selectedTab ? `active` : ""}
              onClick={() => this.setState({ selectedTab: type })}
            >
              {TabLabel[type]}
            </li>
          ))}
        </ul>
        {this.state.selectedTab === TabType.KEYWORD && keywordList}
        {this.state.selectedTab === TabType.HISTORY && historyList}
      </>
    );

    return (
      <>
        <header>
          <h2 className="container">검색</h2>
        </header>
        <div className="container">
          {searchForm}

          {this.state.submitted ? searchResultBox : tabs}
        </div>
      </>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#app"));
