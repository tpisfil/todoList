import React, {useState} from 'react';
import './App.css';

function App() {

  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]); //list of all your todos

  const handleNewTodoSubmit = (e) => {
    e.preventDefault();
    // todos.push(newTodo); //you cant push 

    if (newTodo.length == 0){ //cannot add an empty todo 
      return; 
    }

    const todoItem = {
      text: newTodo,
      complete: false
    }

    setTodos([...todos, todoItem]); //remember you have to make a copy of the array first with spread, and then tag on the new item 
    setNewTodo(""); //this clears out the state of the newTodo
  }

  const handleTodoDelete = (idx) => {
    const filteredTodos = todos.filter((todo, i) => {
      return i!==idx; 
    })

    setTodos(filteredTodos);
  }

  const handleToggleComplete = (idx) => {
    const updatedTodos = todos.map((todo,i) => {
      if (idx == i) {
        todo.complete = !todo.complete;
      }

      return todo;
    })

    setTodos(updatedTodos);
  }

  return (
    <div>
      <h1>To Do List!</h1>
      
      <form onSubmit={(e) => {
        handleNewTodoSubmit(e);
      }}>
        <input type="text" value={newTodo} onChange={(e) => {
          setNewTodo(e.target.value);
        }}/>
        <button type="submit">Add</button>
      </form>

      <hr></hr>

      {todos.map((todo, i) => {
        return(
          <div key={i}>
            <input checked={todo.complete } type="checkbox" onChange={(e) => {
          handleToggleComplete(i);
        }}/>
            <span>{todo.text}</span>
            <button onClick={(e) => {
              handleTodoDelete(i);
            }}>Delete</button>
          </div>
        );
      })}

    </div>
  );
}

export default App;
