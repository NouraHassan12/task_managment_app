import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import Card from "@material-ui/core/Card";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { connect } from "react-redux";
import { addCard } from "../../Redux/Actions/cardsActions";
import "./AddCardStyle.css";
function AddCard({ listID, addCard }) {
  const [form, setForm] = useState(false);
  const [cardContent, setCardContent] = useState("");

  // open add card form
  const handleOpenForm = () => {
    setForm(true);
  };
  // close add card form
  const handleCloseForm = () => {
    setForm(false);
  };
  //handleChange Func for input field
  const handleCardContentChange = (e) => {
    setCardContent(e.target.value);
  };
  //add new card
  const handleAddCard = () => {
    if (cardContent) {
      setCardContent("");
      addCard(listID, cardContent);
    }
  };
  return (
    <>
      <div onClick={handleOpenForm}>
        {form ? (
          <>
            <Card
              className="textAreaCard"
              style={{
                backgroundColor: "#212121",
                color: "rgb(182, 182, 182)",
              }}
            >
              <TextareaAutosize
                autoFocus
                placeholder={"Add Card"}
                onBlur={handleCloseForm}
                onChange={handleCardContentChange}
                value={cardContent}
                style={{
                  resize: "none",
                  width: "100",
                  border: "none",
                  outline: "none",
                  overflow: "hidden",
                  backgroundColor: "#212121",
                  color: "rgb(182, 182, 182)",
                }}
              />
            </Card>
            <div className="btnGroup">
              <Button
                variant="contained"
                className="addBtn"
                onMouseDown={handleAddCard}
              >
                Add Card
              </Button>
              <CloseIcon />
            </div>
          </>
        ) : (
          <div className="button">
            <AddIcon className="closeIcon" />
            <p> Add Another Card</p>
          </div>
        )}
      </div>
    </>
  );
}

export default connect(null, { addCard })(AddCard);
