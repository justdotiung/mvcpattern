import React from "react";

export default class List extends React.Component {
  constructor() {
    super();
    this.state = { data: [] };
  }

  renderItem(data, index) {
    throw "renderItem()를 구현하세요";
  }

  render() {
    return (
      <ul className="list">
        {this.state.data.map((data, index) => (
          <li
            key={data.id}
            onClick={() => {
              this.props.onClick(data.keyword);
            }}
          >
            {this.renderItem(data, index)}
          </li>
        ))}
      </ul>
    );
  }
}
