import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

interface IToDoProps {
  toDo: string;
  index: number;
}
const DraggableCard = ({ toDo, index }: IToDoProps) => {
  return (
    <Draggable draggableId={toDo} index={index} key={toDo}>
      {(magic) => (
        <Card
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {toDo}
        </Card>
      )}
    </Draggable>
  );
};

export default React.memo(DraggableCard);

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${({ theme }) => theme.cardColor};
`;
