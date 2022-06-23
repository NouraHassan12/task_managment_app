import { TYPES } from "../Types";
import { v4 as uuidv4 } from "uuid";

export const addCard = (listID, text) => {
  const id = uuidv4();
  return {
    type: TYPES.ADD_CARD,
    payload: { text, listID, id },
  };
};

export const editCard = (id, listID, newText) => {
  return {
    type: TYPES.EDIT_CARD,
    payload: { id, listID, newText },
  };
};

export const deleteCard = (id, listID) => {
  return {
    type: TYPES.DELETE_CARD,
    payload: { id, listID },
  };
};
export const sort = (
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId
) => {
  return (dispatch) => {
    dispatch({
      type: TYPES.DRAG_HAPPENED,
      payload: {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexEnd,
        droppableIndexStart,
        draggableId,
      },
    });
  };
};
