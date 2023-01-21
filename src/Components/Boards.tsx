import { Droppable } from "react-beautiful-dnd";
import { useRecoilValue } from "recoil";
import { BoardState } from "recoil/BoardState";
import styled from "styled-components";
import Board from "./Board";
import CreateBoard from "./CreateBoard";

const Boards = () => {
  const boards = useRecoilValue(BoardState);
  return (
    <>
      <Wrapper>
        <BoardsBox>
          <Droppable
            droppableId="boardsArea"
            type="BOARD"
            direction="horizontal"
          >
            {(magic) => (
              <>
                <BoardsArea ref={magic.innerRef} {...magic.droppableProps}>
                  {boards.map((board, index) => (
                    <Board
                      boardContent={board.content}
                      boardTitle={board.title}
                      boardIndex={index}
                      key={board.title}
                    />
                  ))}
                </BoardsArea>
                {magic.placeholder}
                <CreateBoard />
              </>
            )}
          </Droppable>
        </BoardsBox>
      </Wrapper>
    </>
  );
};

export default Boards;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-right: 0;
  position: relative;
  transition: margin 0.1s ease-in;
`;
const BoardsBox = styled.div`
  display: flex;
  margin-top: 10px;
  margin-bottom: 8px;
  overflow-y: hidden;
  overflow-x: auto;
  padding-bottom: 8px;
  width: 100%;
`;

const BoardsArea = styled.div`
  /* width: 100%; */
  /* -webkit-user-select: none;
  user-select: none;
  white-space: nowrap; */
  height: fit-content;
  display: flex;
  > div {
    margin-right: 10px;
    height: 100%;
    margin: 0 4px;
    vertical-align: top;
    white-space: nowrap;
    width: 272px;
    flex-shrink: 0;
  }
`;
