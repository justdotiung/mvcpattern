import { delegate, qs } from "../helpers.js";
import View from "./View.js";

export default class KeywordListView extends View {
  constructor(element = qs("#keyword-list-view"), template = new Template()) {
    super(element);

    this.template = template;
    this.bindEvents();
  }

  show(data = []) {
    this.element.innerHTML =
      data.length > 0
        ? this.template.getList(data)
        : this.template.getEmptyMessage();
    super.show();
  }

  bindEvents() {
    console.log("key");
    delegate(this.element, "click", "li", (e) => this.handleClick(e));
  }

  handleClick(e) {
    const value = e.target.dataset.keyword;
    this.emit("@change", { value });
  }
}

class Template {
  getEmptyMessage() {
    return `
            <div class="empty-box">추천 검색어가 없습니다.</div>
        `;
  }
  getList(data) {
    return `
            <ul class="list">
                ${data.map(this._getList).join("")}
            </ul>
        `;
  }

  _getList({ id, keyword }) {
    return `
        <li data-keyword="${keyword}">
         <span class="number">${id}</span>${keyword}
         </li>
      `;
  }
}
