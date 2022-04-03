import { createNextId } from "./helpers.js";
import { TabType } from "./views/TabView.js";

const tag = "[store]";

export default class Store {
  constructor(storage) {
    if (!storage) throw "no storage";
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

    this.addHistory(keyword);
  }

  removeHistory(removeKeyword) {
    this.storage.historyData = this.storage.historyData.filter(
      ({ keyword }) => keyword !== removeKeyword
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

  addHistory(keyword) {
    const exist = this.storage.historyData.some(
      (history) => history.keyword === keyword
    );
    if (exist) this.removeHistory(keyword);

    const id = createNextId(this.storage.historyData);
    const date = new Date();
    this.storage.historyData.push({ id, keyword, date });
  }
}
