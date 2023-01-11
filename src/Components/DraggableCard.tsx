import React, { useEffect } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

interface IToDoProps {
  toDoId: number;
  toDoText: string;
  index: number;
  handleCardRemove: (param: number) => void;
}

const DraggableCard = ({
  toDoId,
  toDoText,
  index,
  handleCardRemove,
}: IToDoProps) => {
  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          <span>{toDoText}</span>
          <DeleteButton onClick={() => handleCardRemove(index)}>x</DeleteButton>
        </Card>
      )}
    </Draggable>
  );
};

export default React.memo(DraggableCard);

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${({ theme, isDragging }) =>
    isDragging ? "#e4f2ff" : theme.cardColor};
  box-shadow: ${({ isDragging }) =>
    isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.05)" : "none"};
  display: flex;
  justify-content: space-between;
`;
const DeleteButton = styled.button``;
