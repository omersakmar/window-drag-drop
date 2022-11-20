import React, { useState } from "react";
import Card from "./Card";
import { useDrop } from "react-dnd";
import { FixedSizeGrid as Grid } from "react-window";

const PictureList = [
  {
    id: 1,
    src: "https://johnlewis.scene7.com/is/image/JohnLewis/005738051alt3?",
  },
  {
    id: 2,
    src: "https://johnlewis.scene7.com/is/image/JohnLewis/dress-2-010422-1",
  },
  {
    id: 3,
    src: "https://johnlewis.scene7.com/is/image/JohnLewis/005346298",
  },
  {
    id: 4,
    src: "https://johnlewis.scene7.com/is/image/JohnLewis/006076501alt1?",
  },
];

const Cell = ({ columnIndex, rowIndex, style }) => (
  <div style={style}>
    {PictureList.map((picture) => (
      <Card image={picture.src} id={picture.id} />
    ))}
  </div>
);

const CardGrid = () => {
  const [board, setBoard] = useState([]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: (item) => addImageToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  // Drag image from the window and drop it to the board
  const addImageToBoard = (id) => {
    const pictureList = PictureList.filter((picture) => id === picture.id);
    setBoard((board) => [...board, pictureList[0]]);
  };

  // Removes all items

  const clearBoard = () => {
    setBoard([]);
  };

  // Removes an individual item.
  // Not a good piece of code, because
  // if you have multiple elements in the board
  // with the same ID, then this code will remove
  // all of them with just one click
  const removeItem = (id) => {
    const newBoard = board.filter((picture) => picture.id !== id);
    setBoard(newBoard);
  };
  return (
    <>
      <div className="flex">
        <Grid
          columnCount={1}
          columnWidth={500}
          height={500}
          rowCount={1}
          rowHeight={500}
          width={500}
        >
          {Cell}
        </Grid>

        <div className="container mx-auto bg-yellow-50" ref={drop}>
          {board.length === 0 ? (
            <p>Cart is empty</p>
          ) : (
            <button onClick={clearBoard}>Clear</button>
          )}
          {board.map((picture) => (
            <div className="flex justify-cente">
              <Card key={picture.id} image={picture.src} id={picture.id} />
              <button
                onClick={() => {
                  removeItem(picture.id);
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CardGrid;
