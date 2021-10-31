import React, { useState } from 'react';
import { Fragment } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import x from './img/x.png';

const Todo_entries = (props) => {
  const [style, setStyle] = useState({textDecoration: "none", opacity: 1.0});
  const [color, setcolor] = useState({background: "rgba(99, 99, 99, 0.698)"});

  const [stats, setStats] = useState("undone");
  const is_done = () => {
    let num = Number(document.getElementsByClassName("todo-app__total")[0].innerHTML.split(" ")[0]);
    if(stats === "undone"){
      document.getElementsByClassName("todo-app__total")[0].innerHTML = `${num - 1} left`;
      setStats("done");
      props.decrement();
      setStyle({textDecoration: "line-through", opacity: 0.5});
      setcolor({background: "#26ca299b"});
    }
    else{
      document.getElementsByClassName("todo-app__total")[0].innerHTML = `${num + 1} left`;
      props.increment();
      setStats("undone");
      setStyle({textDecoration: "none", opacity: 1.0});
      setcolor({background: "rgba(99, 99, 99, 0.698)"});
    }
  }

  return (
    <li className="todo-app__item">
      <div className="todo-app__checkbox" onClick={is_done}>
        <input type="checkbox" className = {stats}></input>
        <label style = {color}></label>
      </div>
      <h1 className="todo-app__item-detail" style={style}> {props.text} </h1>
      <img src={x} className="todo-app__item-x"></img>
    </li>
  );
}


const Todo_list = () =>{
  const [task_left, count_task_left] = useState(0);
  const [bucket_list, setbucketlist] = useState([]);
  const [todos, settodos] = useState("");
  const [visibility, setVisibility] = useState({visibility: "hidden"});
  const increment = () => {
    count_task_left(task_left + 1);
  }
  const decrement = () => {
    count_task_left(task_left - 1);
  }
  
  const add_todo = (e) => {
    if(e.key === "Enter") {
      increment();
      let new_todo = bucket_list.concat(e.target.value);
      setbucketlist(new_todo);
      let to_list = new_todo.map((item,index) => {
        return <Todo_entries key = {index} val={index} text={item} increment={increment} decrement={decrement}/>;
      });
      console.log(task_left);
      if(task_left !== 0)
        document.getElementsByClassName("todo-app__total")[0].innerHTML = `${task_left + 1} left`;
      settodos(to_list);
      setVisibility({visibility:"visible"});
    }
  }


  //Define render DOM
  return(
    <Fragment>
      <header className="todo-app__header"> 
        <h1 className="todo-app__title">todos</h1>
      </header>
      <section className = "todo-app__main">
        <input className = "todo-app__input" id = "input" onKeyDown = {(e) => add_todo(e)}>
        </input>
        <ul className = "todo-app__list" id = "todo-list">
        {todos}
        </ul>
      </section>

      <footer className="todo-app__footer" id="todo-footer" style = {visibility}>
        <div className="todo-app__total">1 left</div>
          <ul className="todo-app__view-buttons">
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
            </ul>
          <div className="todo-app__clean">
            <button>Clear completed</button>
          </div>
      </footer>
    </Fragment>
  );

}
export default Todo_list;


