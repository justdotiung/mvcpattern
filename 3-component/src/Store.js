import { createNextId } from "./helpers.js";
import storage from "./storage.js";
// import { TabType } from "./views/TabView.js";

const tag = "[store]";

class Store {
  constructor(storage) {
    if (!storage) throw "no storage";
    this.storage = storage;
  }

  search(keyword) {
    this.addHistory(keyword);

    return this.storage.productData.filter((data) =>
      data.name.includes(keyword)
    );
  }

  removeHistory(removeKeyword) {
    this.storage.historyData = this.storage.historyData.filter(
      ({ keyword }) => keyword !== removeKeyword
    );

    return this.storage.historyData;
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

  addHistory(keyword = "") {
    keyword = keyword.trim();
    if (keyword.length <= 0) {
      return;
    }

    const exist = this.storage.historyData.some(
      (history) => history.keyword === keyword
    );
    if (exist) this.removeHistory(keyword);

    const id = createNextId(this.storage.historyData);
    const date = new Date();
    this.storage.historyData.push({ id, keyword, date });
  }
}

export default new Store(storage);
