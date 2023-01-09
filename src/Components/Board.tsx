import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

interface IToDos {
  toDos: string[];
  boardId: string;
}
const Wrapper = styled.div`
  padding-top: 30px;
  background-color: ${({ theme }) => theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;
interface ICardAreaProps {
  isDraggingOver: boolean;
  draggingFromThisWith: boolean;
}
const CardArea = styled.div<ICardAreaProps>`
  background-color: ${({ isDraggingOver, draggingFromThisWith }) =>
    isDraggingOver
      ? "#dfe6e9"
      : draggingFromThisWith
      ? "#b2bec3"
      : "transparent"};
  flex-grow: 1;
  border-radius: 5px;
  transition: background-color 0.2s ease-in-out;
  padding: 20px;
`;

const Board = ({ toDos, boardId }: IToDos) => {
  return (
    <>
      <Wrapper>
        <Title>{boardId}</Title>
        <Droppable droppableId={boardId}>
          {(magic, snapshot) => (
            <CardArea
              isDraggingOver={snapshot.isDraggingOver}
              draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
              ref={magic.innerRef}
              {...magic.droppableProps}
            >
              {toDos.map((toDo, index) => (
                <DraggableCard toDo={toDo} index={index} key={toDo} />
              ))}
              {magic.placeholder}
            </CardArea>
          )}
        </Droppable>
      </Wrapper>
    </>
  );
};

export default Board;
