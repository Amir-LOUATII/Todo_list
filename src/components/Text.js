import React from "react";
import { useGlobalContext } from "../context/context";

const Text = () => {
  const {
    message: { messageState, text },
    showMessage,
  } = useGlobalContext();
  console.log("the message state is ", messageState);
  console.log("the message text is ", messageState);
  console.log("the showMessage  is ", showMessage);
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
