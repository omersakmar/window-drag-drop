import React from "react";
import { useDrag } from "react-dnd";

const Card = ({ image, id }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <img
      ref={drag}
      style={{ border: isDragging ? "1px solid black" : "0px" }}
      src={image}
      alt="dress"
    />
  );
};

export default Card;
