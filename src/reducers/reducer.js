const reducer = (state, action) => {
  switch (action.type) {
    case "GET_INPUT_VALUE":
      return { ...state, task: action.payload };

    case "SET_LOADING":
      return { ...state, isLoading: true };

    case "END_LOADING":
      return { ...state, isLoading: false };
    case "GET_DATA":
      return { ...state, list: action.payload };

    case "CLEAR_INPUT":
      return { ...state, task: "" };
    case "START_EDITING":
      return {
        ...state,
        isEditing: true,
        editingId: action.payload.id,
        task: action.payload.value,
      };
    case "END_EDITING":
      return { ...state, isEditing: false, editingId: "" };
    case "SHOW_MESSAGE":
      return { ...state, showMessage: true };
    case "SET_MESSAGE":
      return {
        ...state,
        message: {
          text: action.payload.text,
          messageState: action.payload.messageState,
        },
      };
    case "HIDE_MESSAGE":
      return { ...state, showMessage: false };
    default:
      throw new Error(`there is no such action ${action.type} please check`);
  }
};

export default reducer;
