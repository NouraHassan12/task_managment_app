import { TYPES } from "../Types";

const initialState = {
  "list-0": {
    id: "list-0",
    cards: ["card-0"],
    title: " 📃 To do",
  },
  "list-1": {
    id: "list-1",
    cards: ["card-1"],
    title: " ✏️ In progress",
  },
  "list-2": {
    id: "list-2",
    cards: ["card-2"],
    title: " ✔️ Done",
  },
};

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.ADD_CARD: {
      const { listID, id } = action.payload;
      const list = state[listID];
      list.cards.push(`card-${id}`);
      return { ...state, [listID]: list };
    }

    case TYPES.DRAG_HAPPENED:
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexEnd,
        droppableIndexStart,
      } = action.payload;

      // in the same list
      if (droppableIdStart === droppableIdEnd) {
        const list = state[droppableIdStart];
        const card = list.cards.splice(droppableIndexStart, 1);
        list.cards.splice(droppableIndexEnd, 0, ...card);
        return { ...state, [droppableIdStart]: list };
      }

      // other list
      if (droppableIdStart !== droppableIdEnd) {
        // find the list where the drag happened
        const listStart = state[droppableIdStart];
        // pull out the card from this list
        const card = listStart.cards.splice(droppableIndexStart, 1);
        // find the list where the drag ended
        const listEnd = state[droppableIdEnd];

        // put the card in the new list
        listEnd.cards.splice(droppableIndexEnd, 0, ...card);
        return {
          ...state,
          [droppableIdStart]: listStart,
          [droppableIdEnd]: listEnd,
        };
      }
      return state;

    case TYPES.DELETE_CARD: {
      const { listID, id } = action.payload;

      const list = state[listID];
      const newCards = list.cards.filter((cardID) => cardID !== id);

      return { ...state, [listID]: { ...list, cards: newCards } };
    }

    default:
      return state;
  }
};

export default boardReducer;
