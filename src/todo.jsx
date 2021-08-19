import React from "react";

export default class ToDo extends React.Component {
  constructor() {
    super();
    this.state = { todo_list: [] };
  }

  getData = async () => {
    const data = await fetch(
      "https://my-json-server.typicode.com/akitirk/todo"
    );
    if (data.ok) {
      let temp = await data.json();
      this.setState({ todo_list: temp });
      console.log(temp);
    }
  };

  render() {
    return (
      <ul>
        {this.state.todo_list.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    );
  }
}
