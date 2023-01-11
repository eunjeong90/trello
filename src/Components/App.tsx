import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { BoardState } from "recoil/BoardState";
import Boards from "Components/Boards";

function App() {
  const [, setToDos] = useRecoilState(BoardState);
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
      <DragDropContext onDragEnd={onDragEnd}>
        <Boards />
      </DragDropContext>
    </>
  );
}

export default App;
