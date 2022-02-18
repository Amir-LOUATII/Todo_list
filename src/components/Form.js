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
          const doc = { task: task, date: new Date().getTime() };
          addItem(doc);
        }
      } else {
        const item = list.find(
          (item) => item.task.toLowerCase() === task.toLowerCase()
        );
        if (!item) {
          editItem(editingId, task);
        }
      }
    }
    clearInput();
    endEditing();
  };
  return (
    <form onSubmit={submitHandler} className="form">
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
