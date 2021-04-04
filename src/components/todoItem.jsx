import React, { useState, useEffect } from "react";
const TodoItem = (props) => {
  const {emitDeleteTodoItem} = props
  const [todoItem, setTodoItem] = useState(props.data); // get-data -> todoItems // set-data --set todo ıtem
  const [isDirty, setDirty] = useState(false); //dirty means ismodified and the purpose is stop the endless loop
  useEffect(() => {
    if (isDirty) {
      fetch(`http://localhost:8080/api/todoItems/${todoItem.id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(todoItem),
      })
        .then((response) => response.json())
        .then((data) => {
          setDirty(false);
          setTodoItem(data);
        });
    }
  }, [todoItem, isDirty]);

  function updateIsDone() {
    setTodoItem({ ...todoItem, done: !todoItem.done }); //setTodoItem({"id" : id, "done" : done, "task": task}) equivalent
    avoidEndlessLoop();
  }
  function avoidEndlessLoop() {
    setDirty(true);
  }

  function updateTask(e) {
    setTodoItem({ ...todoItem, task: e.target.value });
    setDirty(true);
  }

  useEffect(() => {
    console.log(todoItem.task);
  }, [todoItem]);

  function deleteTodoItem() {
    fetch(`http://localhost:8080/api/todoItems/${todoItem.id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then(() => emitDeleteTodoItem(todoItem))
      
  }
  
  return (
    <div>
      <input type="checkbox" checked={todoItem.done} onChange={updateIsDone} />
      {todoItem.done ? (
        <span style={{ textDecoration: "line-through" }}>{todoItem.task}</span>
      ) : (
        <input type="text" value={todoItem.task} onChange={updateTask} />
      )}
      <span
        onClick={deleteTodoItem}
        style={{ marginLeft: "1rem", cursor: "pointer" }}
      >
        🗑️
      </span>
    </div>
  );
};

export default TodoItem;
