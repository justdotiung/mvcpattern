import { TabType } from "./views/TabView.js";

const tag = "[store]";

export default class Store {
  constructor(storage) {
    if (!storage) throw "no storage";
    // console.log(tag);
    this.storage = storage;
    this.searchKeyword = "";
    this.searchResult = [];
    this.selectedTab = TabType.KEYWORD;
  }

  search(keyword) {
    this.searchKeyword = keyword;
    this.searchResult = this.storage.productData.filter((data) =>
      data.name.includes(keyword)
    );
  }

  getKeywordList() {
    return this.storage.keywordData;
  }

  getHistoryList() {
    return this.storage.historyData.sort(this._sortHistory);
  }

  _sortHistory(h1, h2) {
    return h2.date - h1.date;
  }
}
