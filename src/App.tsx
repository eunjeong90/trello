import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import GlobalStyles from "styles/GlobalStyles";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { toDoState } from "atoms";
import DraggableCard from "Components/DraggableCard";
import Board from "Components/Board";

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  // const [toDoSelected, setTodoSelected] = useRecoilState(toDoSelector);

  const onDragEnd = (info: DropResult) => {
    console.log(info);
    const {
      source: { droppableId: startBoardId, index: startIndex },
      destination: endBoard,
    } = info;
    if (!endBoard) return;
    if (endBoard?.droppableId === startBoardId) {
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[startBoardId]];
        // console.log(`boardCopy ${JSON.stringify(boardCopy)}`);
        const taskObj = boardCopy[startIndex];
        console.log(`taskObj ${JSON.stringify(taskObj)}`);
        const [removed] = boardCopy.splice(startIndex, 1);
        boardCopy.splice(endBoard?.index, 0, taskObj);
        return {
          ...allBoards,
          [startBoardId]: boardCopy,
        };
      });
    } else if (endBoard?.droppableId !== startBoardId) {
      setToDos((allBoards) => {
        const startBoardCopy = [...allBoards[startBoardId]];
        const taskObj = startBoardCopy[startIndex];
        const endBoardCopy = [...allBoards[endBoard.droppableId]];
        startBoardCopy.splice(startIndex, 1);
        endBoardCopy.splice(endBoard.index, 0, taskObj);
        return {
          ...allBoards,
          [startBoardId]: startBoardCopy,
          [endBoard.droppableId]: endBoardCopy,
        };
      });
    }
  };
  return (
    <>
      <GlobalStyles />
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            {Object.keys(toDos).map((boardId) => (
              <Board key={boardId} boardId={boardId} toDos={toDos[boardId]} />
            ))}
          </Boards>
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default App;
