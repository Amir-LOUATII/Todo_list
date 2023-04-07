import React, { useRef, useEffect } from "react";
import { useGlobalContext } from "../context/context";

const Form = () => {
  const {
    task,
    inputValue,
    addItem,
    clearInput,
    isEditing,
    editItem,
    editingId,
    endEditing,
    list,
    setError,
  } = useGlobalContext();
  useEffect(() => {
    textInput.current.focus();
  }, []);

  const textInput = useRef();
  const inputchangeHandler = (e) => {
    inputValue(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (task) {
      if (!isEditing) {
        const item = list.find(
          (item) => item.task.toLowerCase() === task.toLowerCase()
        );
        if (!item) {
          const doc = {
            task: task,
            date: new Date().getTime(),
            checked: false,
          };
          addItem(doc);
        } else {
          setError("This task already exist");
        }
      } else {
        const item = list.find((item) => item.task === task);
        if (!item) {
          editItem(editingId, task);
          endEditing();
        }
      }
    } else {
      setError("Please Enter a valid value");
    }
    clearInput();
  };

  return (
    <form onSubmit={submitHandler} className="form">
      <h1>process.env.REACT_APP_TEST</h1>
      <input
        type="text"
        value={task}
        onChange={inputchangeHandler}
        ref={textInput}
      />
      <button type="submit" className="btn">
        Add
      </button>
    </form>
  );
};

export default Form;
