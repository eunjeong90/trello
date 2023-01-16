import { Draggable, Droppable } from "react-beautiful-dnd";
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
      <Wrapper>
        <BoardsBox>
          <Droppable
            droppableId="boardsArea"
            type="BOARD"
            direction="horizontal"
          >
            {(magic, snapshot) => (
              <BoardsArea ref={magic.innerRef} {...magic.droppableProps}>
                {boards.map((board, index) => (
                  <div key={board.title}>
                    <Board
                      boardContent={board.content}
                      boardTitle={board.title}
                      boardIndex={index}
                    />
                  </div>
                ))}
                <CreateBoard />
              </BoardsArea>
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
  flex-grow: 1;
  position: relative;
`;

const BoardsArea = styled.div`
  width: 100%;
  bottom: 0;
  left: 0;
  margin-top: 10px;
  margin-bottom: 8px;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 8px;
  position: absolute;
  right: 0;
  top: 0;
  -webkit-user-select: none;
  user-select: none;
  white-space: nowrap;
  > div {
    margin-right: 10px;
    display: inline-block;
    height: 100%;
    margin: 0 4px;
    vertical-align: top;
    white-space: nowrap;
    width: 272px;
  }
`;
