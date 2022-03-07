import React from "react";
import ListItem from "./ListItem";
import { useGlobalContext } from "../context/context";

const List = () => {
  const { list, isLoading } = useGlobalContext();
  return (
    <section>
      {!isLoading && list.length < 1 && (
        <h2 className="list-text">Don't be lazy,just start now!</h2>
      )}
      {!isLoading && list.length > 0 && (
        <ul>
          {list.map((item) => {
            return (
              <li key={item.id}>
                <ListItem {...item} />
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default List;
