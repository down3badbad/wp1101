import './App.css';
import React from 'react';
import { Fragment } from 'react';
import { useState } from 'react';

const Calc = () => {
  const [curr_value, set_curr_value] = useState(0);
  const [ans, set_ans]= useState(0);
  const [past_val, set_record] = useState([]);
  const [is_float, set_float] = useState(0);
  const [lock_op, set_lock] = useState({lock: 0, op: ""});
  var operators = {
    '+': function(a, b) { return +a + +b },
    '-': function(a, b) { return a - b },
    '*': function(a, b) { return a * b },
    '/': function(a, b) { return a / b },
  };

  const allclear = () => {
    set_curr_value(0);
    set_float(0);
    set_record([]);
    set_ans(0);
    set_lock({lock: 0, op: ""});
  }

  ///////////////////////
  const add_num = (e) => {
    console.log(past_val);
    let input = e.target.className.split(" ")[1].at(-1);
    if(lock_op.lock === 0){
      if(input === "."){
        if(is_float === 0){
          set_float(1);
          set_curr_value("" + curr_value + input);
        }
        else{}
      }
      else{
        if(curr_value === 0) set_curr_value(input);
        else set_curr_value("" + curr_value + input);
      }
    }
    else{
      let x = past_val.concat(curr_value);
      let y = x.concat(lock_op.op);
      set_record(y);
      set_curr_value(input);
      set_lock({lock: 0, op: ""});
    }
  }

  ////////////////////
  const operator = (e) => {
    let input = e.target.className.split(" ")[2];
    if(input === "addition"){
      set_lock({lock: 1, op:"+"});
    }
    else if(input === "subtraction"){
      set_lock({lock: 1, op:"-"});
    }
    else if(input === "multiplication"){
      set_lock({lock: 1, op:"*"});
    }
    else if(input === "division"){
      set_lock({lock: 1, op:"/"});
    }
    else if(input === "equal"){
      set_lock({lock: 1, op:"="});
    }

    if(past_val.length !== 0){
      let b = past_val.at(-1);
      let a = past_val.at(-2);
      let c = curr_value;
      let x = operators[b](a, c).toFixed(2);
      let ans = x % 1 === 0 ? operators[b](a, c) : operators[b](a, c).toFixed(2);
      if(ans.length > 7) set_curr_value("overflow");
      else set_curr_value(ans);
    }
  }

  ///////////////////////
  const changesign = () => {
    set_curr_value(curr_value * -1);
  }

  const percentage = () => {
    set_curr_value(curr_value / 100);
  }

  return(
    <Fragment>
    <div className = "value">{curr_value}</div>
    <div className="buttons-container">
      <div className="button function clear" onClick = {allclear}>AC</div>
      <div className="button function sign" onClick = {changesign}>±</div>
      <div className="button function percent" onClick = {percentage}>%</div>
      <div className="button operator division" onClick = {(e) => operator(e)}>÷</div>
      <div className="button number-7" onClick = {(e) => add_num(e)}>7</div>
      <div className="button number-8" onClick = {(e) => add_num(e)}>8</div>
      <div className="button number-9" onClick = {(e) => add_num(e)}>9</div>
      <div className="button operator multiplication" onClick = {(e) => operator(e)}>×</div>
      <div className="button number-4" onClick = {(e) => add_num(e)}>4</div>
      <div className="button number-5" onClick = {(e) => add_num(e)}>5</div>
      <div className="button number-6" onClick = {(e) => add_num(e)}>6</div>
      <div className="button operator subtraction" onClick = {(e) => operator(e)}>−</div>
      <div className="button number-1" onClick = {(e) => add_num(e)}>1</div>
      <div className="button number-2" onClick = {(e) => add_num(e)}>2</div>
      <div className="button number-3" onClick = {(e) => add_num(e)}>3</div>
      <div className="button operator addition" onClick = {(e) => operator(e)}>+</div>
      <div className="button number-0" onClick = {(e) => add_num(e)}>0</div>
      <div className="button number-." onClick = {(e) => add_num(e)}>.</div>
      <div className="button operator equal" onClick = {(e) => operator(e)}>=</div>
    </div>
    </Fragment>
  );
}

export default Calc;
