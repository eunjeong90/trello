import { useRecoilValue } from "recoil";
import { BoardState } from "recoil/BoardState";
import styled from "styled-components";
import Board from "./Board";

const Boards = () => {
  const board = useRecoilValue(BoardState);
  return (
    <Wrapper>
      <BoardsArea>
        {Object.keys(board).map((boardId) => (
          <Board key={boardId} boardId={boardId} toDos={board[boardId]} />
        ))}
      </BoardsArea>
    </Wrapper>
  );
};

export default Boards;

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const BoardsArea = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;
