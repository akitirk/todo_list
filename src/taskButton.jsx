import React from "react";
import "./taskButton.css";

export default class TaskButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: "", description: "" };
  }

  getTitle = (event) => {
    this.setState({ title: event.target.value });
  };

  getDescription = (event) => {
    this.setState({ description: event.target.value });
  };

  createTask = (event) => {
    this.props.toggle();
    fetch(`http://localhost:8000/todos/`, {
      method: "POST",
      body: JSON.stringify({
        id: this.props.todoList.length + 1,
        title: this.state.title,
        description: this.state.description,
        completed: false,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        //let a = this.state.todo_list.slice(); //creates the clone of the state
        //a[a.length] = json;
        //this.setState({ todo_list: a });
      });
  };

  render() {
    return (
      <div className="modal">
        <div className="modal_content">
          <span className="close" onClick={this.handleClick}>
            &times;
          </span>
          <form>
            <h3>Create task!</h3>
            <label>
              Title:
              <input type="text" name="title" onChange={this.getTitle} />
            </label>
            <br />
            <label>
              Description:
              <input
                type="text"
                name="description"
                onChange={this.getDescription}
              />
            </label>
            <br />
            <button onClick={this.createTask}>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}
