import { delegate, qs, qsAll } from "../helpers.js";
import View from "./View.js";

export const TabType = {
  KEYWORD: "KEYWORD",
  HISTORY: "HISTORY",
};

const TabLabel = {
  [TabType.KEYWORD]: "추천검색어",
  [TabType.HISTORY]: "최근검색어",
};

export default class TabView extends View {
  constructor() {
    super(qs("#tab-view"));
    this.template = new Template();
    this.bindEvent();
  }

  show(selectedTab) {
    this.element.innerHTML = this.template.getTabList();
    qsAll("li", this.element).forEach((el) => {
      el.dataset.tab === selectedTab
        ? el.classList.add("active")
        : el.classList.remove("active");
    });

    super.show();
  }

  bindEvent() {
    // this.on("click", (e) => {
    //   const el = qsAll("li", this.element).filter((el) => el === e.target);
    //   const value = el[0].dataset.tab;
    //   this.emit("@change", { value });
    // });
    delegate(this.element, "click", "li", (e) => this.handleClick(e));
  }

  handleClick(e) {
    const value = e.target.dataset.tab;
    this.emit("@change", { value });
  }
}

class Template {
  getTabList() {
    return `
      <ul class="tabs">
        ${Object.values(TabType)
          .map((tabType) => ({
            tabType,
            tablabel: TabLabel[tabType],
          }))
          .map(this._getTab)
          .join("")}
      </ul>
    `;
  }

  _getTab({ tabType, tablabel }) {
    return `
      <li data-tab="${tabType}">${tablabel}</li>
    `;
  }
}
