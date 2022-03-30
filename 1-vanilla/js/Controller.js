import { TabType } from "./views/TabView.js";

const tag = "[Controller]";

export default class Controller {
  constructor(
    store,
    {
      searchFormView,
      searchResultView,
      tabView,
      keywordListView,
      historyListView,
    }
  ) {
    console.log(tag);
    this.store = store;

    // TODO
    this.searchFormView = searchFormView;
    this.searchResultView = searchResultView;
    this.tabView = tabView;
    this.keywordListView = keywordListView;
    this.historyListView = historyListView;
    this.subscribeViewEvents();
    this.render();
  }

  subscribeViewEvents() {
    this.searchFormView
      .on("@submit", (e) => this.search(e.detail.value))
      .on("@reset", () => this.reset());
    this.tabView.on("@change", (e) => this.tabChange(e.detail.value));
    this.keywordListView.on("@change", (e) => this.search(e.detail.value));
    this.historyListView
      .on("@change", (e) => this.search(e.detail.value))
      .on("@remove", (e) => this.remove(e.detail.value));
  }

  tabChange(tabType) {
    this.store.selectedTab = tabType;
    this.render();
  }

  search(keyword) {
    this.store.search(keyword);
    this.render();
  }

  remove(keyword) {
    console.log("df");
    this.store.removeHistory(keyword);
    this.render();
  }

  reset() {
    this.store.searchKeyword = "";
    this.store.searchResult = [];
    this.render();
    // console.log(keyword);
  }

  render() {
    if (this.store.searchKeyword.length > 0) {
      this.tabView.hide();
      this.keywordListView.hide();
      this.historyListView.hide();
      this.searchFormView.show(this.store.searchKeyword);
      this.searchResultView.show(this.store.searchResult);
      return;
    }
    if (this.store.selectedTab === TabType.KEYWORD) {
      this.keywordListView.show(this.store.getKeywordList());
      this.historyListView.hide();
    } else if (this.store.selectedTab === TabType.HISTORY) {
      this.historyListView.show(this.store.getHistoryList());
      this.keywordListView.hide();
    } else {
      throw "사용할 수 없는 탭입니다.";
    }
    this.tabView.show(this.store.selectedTab);
    this.searchResultView.hide();
  }
}
