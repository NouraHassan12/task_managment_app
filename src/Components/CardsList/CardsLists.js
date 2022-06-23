import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Delete from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/EditOutlined";
import { Dialog, DialogContent } from "@material-ui/core";
import { editCard, deleteCard } from "../../Redux/Actions/cardsActions";
import { connect } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import "./CardsListsStyle.css";

function CardsLists({ text, id, listID, index, editCard, deleteCard }) {
  const [isEditing, setEditing] = useState(false);
  const [cardText, setText] = useState(text);

  //handleChang Fun for input field
  const handleChange = (e) => {
    setText(e.target.value);
  };
  //save the edited card func
  const saveCard = (e) => {
    e.preventDefault();

    editCard(id, listID, cardText);
    setEditing(false);
  };
  // delete card
  const handleDeleteCard = (e) => {
    console.log(listID);
    deleteCard(id, listID);
  };
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card className="cardContainer" sx={{ minWidth: 300 }}>
            <CardContent>
              <Typography variant="body2">{text}</Typography>
            </CardContent>
            <div className="deleteIcon" onMouseDown={handleDeleteCard}>
              <Delete fontSize="small" />
            </div>
            <div className="editIcon" onMouseDown={() => setEditing(true)}>
              <Edit fontSize="small" />
            </div>{" "}
            {isEditing && (
              <Dialog
                open={isEditing !== false}
                onClose={() => setEditing(false)}
                style={{ textAlign: "center" }}
                aria-labelledby="form-dialog-title"
                maxWidth="sm"
                fullWidth={true}
              >
                <DialogContent className="contentStyle">
                  <Typography variant="h6" style={{ color: "rgb(76 164 104)" }}>
                    ✏️ Edit Card Content
                  </Typography>
                  <Card className="edittextAreaCard">
                    <CardContent>
                      <TextareaAutosize
                        autoFocus
                        onChange={(e) => handleChange(e)}
                        value={cardText}
                        style={{
                          resize: "none",
                          width: "200px",
                          border: "none",
                          outline: "none",
                          overflow: "hidden",
                          backgroundColor: "#212121",
                          color: "rgb(101 106 101)",
                        }}
                      />
                    </CardContent>
                  </Card>
                </DialogContent>
                <CardActions className="contentStyle">
                  <div className="btnGroup">
                    <Button
                      variant="contained"
                      className="addBtn"
                      onClick={saveCard}
                      style={{ marginLeft: "10px" }}
                    >
                      Save
                    </Button>
                  </div>
                </CardActions>
              </Dialog>
            )}
          </Card>
        </div>
      )}
    </Draggable>
  );
}

export default connect(null, { editCard, deleteCard })(CardsLists);
