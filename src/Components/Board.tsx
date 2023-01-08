import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

interface IToDos {
  toDos: string[];
  boardId: string;
}
const Wrapper = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${({ theme }) => theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;
const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

const Board = ({ toDos, boardId }: IToDos) => {
  return (
    <>
      <Wrapper>
        <Title>{boardId}</Title>
        <Droppable droppableId={boardId}>
          {(magic) => (
            <Wrapper ref={magic.innerRef} {...magic.droppableProps}>
              {toDos.map((toDo, index) => (
                <DraggableCard toDo={toDo} index={index} key={toDo} />
              ))}
              {magic.placeholder}
            </Wrapper>
          )}
        </Droppable>
      </Wrapper>
    </>
  );
};

export default Board;
