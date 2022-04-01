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
    };
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
    const searchResult = this.search(this.state.searchKeyword);
    this.setState({
      searchResult,
      submitted: true,
    });
  }

  search(keyword) {
    return store.search(keyword);
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
      () => {
        console.log(this.state.searchKeyword);
      }
    );
  }

  handleChangeTab(e) {
    // e.target.classList.add("active");
    // Array.from(e.target.childNode).forEach((node) => {
    //   node.classList.add("active");
    //   console.log(node);
    // });
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
        {this.state.selectedTab === TabType.KEYWORD && <>cncjs</>}
        {this.state.selectedTab === TabType.HISTORY && <>cnfscjs</>}
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
