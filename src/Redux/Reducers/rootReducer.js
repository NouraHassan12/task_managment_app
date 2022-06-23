import { combineReducers } from "redux";
import boardReducer from "./boardReducer";
import cardsReducer from "./cardsReducer";
export default combineReducers({
  lists: boardReducer,
  cards: cardsReducer,
});
