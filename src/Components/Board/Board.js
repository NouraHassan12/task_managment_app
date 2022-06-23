import React from "react";
import CardsLists from "../CardsList/CardsLists";
import Typography from "@material-ui/core/Typography";
import AddCard from "../AddCard/AddCard";
import "./boardStyle.css";
import { Droppable } from "react-beautiful-dnd";
function Board({ title, cards, listID, index }) {
  return (
    <Droppable droppableId={listID}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="container"
        >
          <Typography
            variant="h6"
            style={{
              color: `${
                title == " 📃 To do"
                  ? "#bd1d7e"
                  : title == " ✏️ In progress"
                  ? "#842ab3"
                  : "#b19b2a"
              } `,
            }}
          >
            {title}
          </Typography>
          {cards.map((card, index) => (
            <CardsLists
              key={card.id}
              text={card.text}
              id={card.id}
              index={index}
              listID={listID}
            />
          ))}
          {title === " 📃 To do" && <AddCard listID={listID} />}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default Board;
