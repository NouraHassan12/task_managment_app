import { TYPES } from "../Types";

const initialState = {
  "card-0": {
    text: "To do card",
    id: `card-0`,
    list: "list-0",
  },
  "card-1": {
    text: "in progress card",
    id: `card-1`,
    list: "list-1",
  },
  "card-2": {
    text: "completed task",
    id: `card-2`,
    list: "list-2",
  },
};

const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.ADD_CARD: {
      const { text, listID, id } = action.payload;

      const newCard = {
        text,
        id: `card-${id}`,
        list: listID,
      };

      return { ...state, [`card-${id}`]: newCard };
    }
    case TYPES.EDIT_CARD: {
      const { id, newText } = action.payload;
      const card = state[id];
      card.text = newText;
      return { ...state, [`card-${id}`]: card };
    }

    case TYPES.DELETE_CARD: {
      const { id } = action.payload;
      const newState = state;
      delete newState[id];
      return newState;
    }

    default:
      return state;
  }
};

export default cardsReducer;
