import { Droppable } from "react-beautiful-dnd";
import { useRecoilValue } from "recoil";
import { BoardState } from "recoil/BoardState";
import styled from "styled-components";
import Board from "./Board";
import CreateBoard from "./CreateBoard";

const Boards = () => {
  const boards = useRecoilValue(BoardState);
  console.log(boards);
  return (
    <>
      <CreateBoard />
      <Wrapper>
        {/* <Droppable droppableId={boardId}> */}
        <BoardsArea>
          {boards.map((board, index) => (
            <Board
              key={board.title}
              boardContent={board.content}
              boardTitle={board.title}
              boardIndex={index}
            />
          ))}
        </BoardsArea>
        {/* </Droppable> */}
      </Wrapper>
    </>
  );
};

export default Boards;

const Wrapper = styled.div`
  display: flex;
  /* max-width: 680px; */
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const BoardsArea = styled.div`
  width: 100%;
  /* display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr); */
  display: flex;
  > div {
    margin-right: 10px;
  }
`;
