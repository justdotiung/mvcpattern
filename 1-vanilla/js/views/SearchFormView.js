import { on, qs } from "../helpers.js";
import View from "./View.js";

const tag = "[SearchFormView]";
class SearchFormView extends View {
  constructor() {
    super(qs("#search-form-view"));

    this.inputElement = qs("[type=text]", this.element);
    this.resetElement = qs(".btn-reset", this.element);
    this.showResetButton(false);
    this.eventBind();
  }

  showResetButton(b = true) {
    this.resetElement.style.display = b ? "block" : "none";
  }
  eventBind() {
    this.on("submit", (e) => this.handleSubmit(e));
    on(this.inputElement, "keyup", () => this.handleKeyup());
    on(this.resetElement, "click", () => this.handleReset());
  }

  handleKeyup(e) {
    const { value } = this.inputElement;
    this.showResetButton(value.length > 0);

    if (value.length <= 0) this.handleReset();
  }

  handleReset() {
    this.showResetButton(false);
    this.emit("@reset");
  }

  handleSubmit(e) {
    e.preventDefault();
    const { value } = this.inputElement;
    this.emit("@submit", { value });
  }

  show(keyword) {
    this.inputElement.value = keyword;
    this.showResetButton(true);
    super.show();
  }
}

export default SearchFormView;
