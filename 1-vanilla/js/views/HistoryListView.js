import { formatRelativeDate, qs } from "../helpers.js";
import KeywordListView from "./KeywordListView.js";

export default class HistoryListView extends KeywordListView {
  constructor() {
    super(qs("#history-list-view"), new Template());
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
