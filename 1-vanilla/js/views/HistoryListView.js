import { delegate, formatRelativeDate, on, qs, qsAll } from "../helpers.js";
import KeywordListView from "./KeywordListView.js";

export default class HistoryListView extends KeywordListView {
  constructor() {
    super(qs("#history-list-view"), new Template());
  }

  bindEvents() {
    this.on("click", (e) => {
      delegate(this.element, "click", "button", (e) => {
        this.handleClickRemoveButton(e);
      });
    });
    console.log("his");
    super.bindEvents();
  }

  handleClickRemoveButton(e) {
    console.log();
    const value = e.target.parentNode.dataset.keyword;
    this.emit("@remove", { value });
  }
}

class Template {
  getEmptyMessage() {
    return `
              <div class="empty-box">검색 이력이 없습니다.</div>
          `;
  }
  getList(data) {
    return `
              <ul class="list">
                  ${data.map(this._getList).join("")}
              </ul>
          `;
  }

  _getList({ id, keyword, date }) {
    return `
          <li data-keyword="${keyword}">
           <span class="number">${id}</span>${keyword}
           <span class="date">${formatRelativeDate(date)}</span>
           <button class="btn-remove"></button>
           </li>
        `;
  }
}
