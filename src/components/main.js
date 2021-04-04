import { useEffect, useState } from "react";
import TodoItem from "./todoItem";
function Main() {
  const [todoItems, setTodoItems] = useState(null);// get-data -> todoItems // set-data --set todo ıtem
 
  useEffect(() => {
    //on load
    if (!todoItems) {
      fetch("http://localhost:8080/api/todoItems")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setTodoItems(data);
        });
    }
  }, [todoItems]); //dependencies

  
  function addNewTodoItem(){
    fetch(`http://localhost:8080/api/todoItems`, {
      headers : {
        "content-type" : "application/json"
      },
      method : "POST",
    }).then(response => response.json()).then(
      data => {
         setTodoItems([...todoItems,data]) // destructring // get initial items add last data and copy it
      }
    )
  }
  function handleDeleteTodoItem(item) {
    const updatedTodoItems = todoItems.filter((data) => data.id !== item.id);
    setTodoItems([...updatedTodoItems]);
  }
  return (
    <div>
    <div id="parent">
    
      <div>
          <button style = {{backgroundColor : "lightblue", border : "1px solid lightblue", marginLeft:"3rem"}} onClick ={addNewTodoItem}>Add New Item</button>
      </div>
      <div>
      {todoItems
        ? todoItems.map((todoItem) => {
            return  <TodoItem key = {todoItem.id} data = {todoItem} emitDeleteTodoItem = {handleDeleteTodoItem}/>
          })
        : "loading data..."}
      </div>
      </div>
    </div>
  );
}

export default Main;