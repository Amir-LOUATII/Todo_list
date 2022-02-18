import React from "react";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

import { useGlobalContext } from "../context/context";

const ListItem = ({ task, id }) => {
  const { deleteItem, setEditing } = useGlobalContext();
  return (
    <article>
      <div className="text">
        <h3>{task}</h3>
      </div>
      <div className="icons">
        <button
          className="btn-icon"
          onClick={(e) => {
            setEditing(id, task);
          }}
        >
          <FaEdit className="edit" />
        </button>
        <button
          className="btn-icon"
          onClick={() => {
            deleteItem(id);
          }}
          id={id}
        >
          <FaTrash className="trash" />
        </button>
      </div>
    </article>
  );
};

export default ListItem;
