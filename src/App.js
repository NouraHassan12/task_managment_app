import "./App.css";
import TaskBoard from "./Components/Board/Board";
import { connect } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import { sort } from "./Redux/Actions/cardsActions";
function App({ lists, cards, sort }) {
  let listOrder = ["list-0", "list-1", "list-2"];

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    sort(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
      draggableId,
      type
    );
  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="boardlistsContainer">
          {listOrder.map((listID, index) => {
            const list = lists[listID];
            if (list) {
              const listCards = list.cards.map((cardID) => cards[cardID]);

              return (
                <TaskBoard
                  listID={list.id}
                  key={list.id}
                  title={list.title}
                  cards={listCards}
                  index={index}
                />
              );
            }
          })}
        </div>
      </DragDropContext>
    </>
  );
}

const mapStateToProps = (state) => ({
  lists: state.lists,
  cards: state.cards,
});
export default connect(mapStateToProps, { sort })(App);
