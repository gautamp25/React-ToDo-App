import React, { useState, useEffect }from 'react'
import './App.css';
import Form from './components/Form'
import TodoList from './components/TodoList'

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setfilteredTodos] = useState([]);

  useEffect(() => {
    getTodosFromLocal();
  },[])
  useEffect(()=> {
    filterHandler();
    saveTodosToLocal();
  },[todos, status])

  const filterHandler = () => {
    switch(status){
      case "completed":
        setfilteredTodos(todos.filter((todo)=> todo.completed===true));
        break;
      case "uncompleted":
        setfilteredTodos(todos.filter((todo)=> todo.completed===false));
        break;
      default:
        setfilteredTodos(todos);
        break; 
    }
  }

  // save data to local storage
  const saveTodosToLocal = () => {
      localStorage.setItem("todos", JSON.stringify(todos))
  }
  const getTodosFromLocal = () => {
    if(localStorage.getItem("todos") === null){
      localStorage.setItem("todos", JSON.stringify([]))
    }else{
      let localTodos = JSON.parse(localStorage.getItem("todos"))
      setTodos(localTodos);
    }
  }
  return (
    <div className="App">
      <header>
        <h1>What needs to be done?</h1>
      </header>
      <Form setInputText={setInputText} 
       todos={todos}
       setTodos={setTodos}
       inputText={inputText}
       setStatus={setStatus}
      />
      <TodoList setTodos={setTodos}
       todos={todos}
       filteredTodos={filteredTodos} />
    </div>
  );
}

export default App;
