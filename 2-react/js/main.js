class App extends React.Component {
  constructor() {
    super();

    this.state = {
      searchKeyword: "",
    };
  }

  handleChangeInput(e) {
    this.setState({
      searchKeyword: e.target.value,
    });
  }

  render() {
    return (
      <>
        <header>
          <h2 className="container">검색</h2>
        </header>
        <div className="container">
          <form>
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              autoFocus
              value={this.state.searchKeyword}
              onChange={(e) => this.handleChangeInput(e)}
            />
            {this.state.searchKeyword.length > 0 && (
              <button type="reset" className="btn-reset"></button>
            )}
          </form>
        </div>
      </>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#app"));
