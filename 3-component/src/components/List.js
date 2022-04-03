import React from "react";

export default class List extends React.Component {
  constructor() {
    super();
    this.state = { data: [] };
  }

  renderItem(data, index) {
    throw "리스트를 구현해주세요.";
  }

  render() {
    console.log(this.state.data);
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
