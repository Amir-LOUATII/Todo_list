import React, { useContext, useReducer, useEffect } from "react";
import reducer from "../reducers/reducer";
import db from "../firestore/firestoreConfig";

const appContext = React.createContext();

const intialState = {
  isLoading: true,
  isError: false,
  list: [],
  isEditing: false,
  editingId: "",
  task: "",
  showMessage: false,
  message: { text: "", messageState: "error" },
};
const AppContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, intialState);
  const inputValue = (value) => {
    dispatch({ type: "GET_INPUT_VALUE", payload: value });
  };

  useEffect(() => {
    dispatch({ type: "SET_LOADING" });
    const unsub = db
      .collection("list")
      .orderBy("date")
      .onSnapshot(
        (snapshot) => {
          if (snapshot.empty) {
            dispatch({ type: "END_LOADING" });
            dispatch({ type: "GET_DATA", payload: [] });
          } else {
            let result = [];
            snapshot.docs.forEach((doc) => {
              result.push({ id: doc.id, ...doc.data() });
            });
            dispatch({ type: "GET_DATA", payload: result });
            dispatch({ type: "END_LOADING" });
          }
        },
        (err) => {
          dispatch({ type: "SET_ERROR", payload: err.message });
        }
      );
    return () => unsub();
  }, []);

  useEffect(() => {
    let dispayMessage = setTimeout(() => {
      dispatch({ type: "HIDE_MESSAGE" });
    }, 2000);

    return () => {
      clearTimeout(dispayMessage);
    };
  }, [state.message]);

  const setEditing = (id, value) => {
    dispatch({ type: "START_EDITING", payload: { id, value } });
    window.scrollTo(0, 0);
  };

  const endEditing = () => {
    dispatch({ type: "END_EDITING" });
    dispatch({
      type: "SET_MESSAGE",
      payload: { text: "task successfly edited", messageState: "success" },
    });
    dispatch({ type: "SHOW_MESSAGE" });
  };
  const clearInput = () => {
    dispatch({ type: "CLEAR_INPUT" });
  };
  const deleteItem = (id) => {
    db.collection("list").doc(id).delete();
  };

  const updateItem = (id, update) => {
    db.collection("list").doc(id).update(update);
  };
  const clearList = () => {
    db.collection("list")
      .get()
      .then((res) => {
        res.forEach((doc) => {
          doc.ref.delete();
        });
      });
  };

  const addItem = (task) => {
    db.collection("list").add(task);

    dispatch({
      type: "SET_MESSAGE",
      payload: { text: "task successfly added", messageState: "success" },
    });
    dispatch({ type: "SHOW_MESSAGE" });
  };

  const editItem = (id, value) => {
    db.collection("list").doc(id).update({ task: value });
  };

  const setError = (text) => {
    dispatch({
      type: "SET_MESSAGE",
      payload: { text: text, messageState: "error" },
    });
    dispatch({ type: "SHOW_MESSAGE" });
  };
  return (
    <appContext.Provider
      value={{
        ...state,
        inputValue,
        deleteItem,
        addItem,
        clearList,
        clearInput,
        setEditing,
        editItem,
        endEditing,
        setError,
        updateItem,
      }}
    >
      {props.children}
    </appContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(appContext);
};
export { AppContextProvider, useGlobalContext };
