import React from "react";
import { useGlobalContext } from "../context/context";

const Text = () => {
  const {
    message: { messageState, text },
    showMessage,
  } = useGlobalContext();

  return (
    <section>
      <h1 className="title">Todo List</h1>
      {showMessage && (
        <h5
          className={
            messageState === "success" ? "message success" : "message error"
          }
        >
          {text}
        </h5>
      )}
    </section>
  );
};

export default Text;
