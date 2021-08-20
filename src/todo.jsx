import React from "react";
import TaskButton from "./taskButton";
import "./todo.css";

export default class ToDo extends React.Component {
  constructor() {
    super();
    this.state = { todo_list: [], seen: false, deleted: false };
  }

  async componentDidMount() {
    const data = await fetch("http://localhost:8000/todos");
    if (data.ok) {
      let temp = await data.json();
      this.setState({ todo_list: temp });
    }
  }

  togglePop = () => {
    this.setState({
      seen: !this.state.seen,
    });
  };

  toggleChecked = (event) => {
    fetch(`http://localhost:8000/todos/${event.target.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        completed: event.target.checked,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        let a = this.state.todo_list.slice(); //creates the clone of the state
        a[event.target.value] = json;
        this.setState({ todo_list: a });
      });
  };

  deleteItem = (event) => {
    fetch(`http://localhost:8000/todos/${event.target.id}`, {
      method: "DELETE",
    });
  };

  render() {
    return (
      <div>
        <ul>
          {this.state.todo_list.map((item, index) => (
            <li key={item.id} className={item.completed ? "strikethrough" : ""}>
              <input
                type="checkbox"
                id={item.id}
                name={item.id}
                value={index}
                checked={item.completed}
                onClick={this.toggleChecked}
              />
              <label htmlFor={item.id}>{item.title}</label>
              <button
                id={item.id}
                onClick={this.deleteItem}
                style={{ marginLeft: "0.75%" }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <div className="btn" onClick={this.togglePop}>
          <button>Create task</button>
        </div>
        {this.state.seen ? (
          <TaskButton toggle={this.togglePop} todoList={this.state.todo_list} />
        ) : null}
      </div>
    );
  }
}
