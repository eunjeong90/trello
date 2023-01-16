import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import { BoardState } from "recoil/BoardState";
import Boards from "Components/Boards";

function App() {
  const setBoards = useSetRecoilState(BoardState);

  const onDragEnd = (info: DropResult) => {
    const {
      source: { droppableId: startBoardId, index: startIndex },
      destination: endBoard,
      type,
    } = info;
    console.log(info);
    const sameBoard = endBoard?.droppableId === startBoardId;
    const otherBoard = endBoard?.droppableId !== startBoardId;

    if (!endBoard) return;
    if (type === "BOARD") {
      setBoards((allBoards) => {
        const boardCopy = [...allBoards];
        const targetIndex = boardCopy[startIndex];
        console.log(targetIndex);
        boardCopy.splice(startIndex, 1);
        boardCopy.splice(endBoard.index, 0, targetIndex);
        return boardCopy;
      });
    }
    switch (type === "CARD") {
      case sameBoard:
        setBoards((allBoards) => {
          const boardCopy = [...allBoards];
          const targetIndex = boardCopy.findIndex(
            ({ title }) => title === startBoardId
          );
          const targetCards = [...boardCopy[targetIndex].content];
          const targetCard = targetCards[startIndex];
          // console.log(targetCard);
          const [removed] = targetCards.splice(startIndex, 1);
          targetCards.splice(endBoard?.index, 0, targetCard);
          boardCopy[targetIndex] = {
            title: startBoardId,
            content: [...targetCards],
          };
          return [...boardCopy];
        });
        break;
      case otherBoard:
        setBoards((allBoards) => {
          const boardCopy = [...allBoards];

          const firstIndex = boardCopy.findIndex(
            ({ title }) => title === startBoardId
          );
          const firstBoard = [...boardCopy[firstIndex].content];
          const firstCard = firstBoard[startIndex];

          const finishedIndex = boardCopy.findIndex(
            ({ title }) => title === endBoard.droppableId
          );
          const finishedBoard = [...boardCopy[finishedIndex].content];
          firstBoard.splice(startIndex, 1);
          finishedBoard.splice(endBoard.index, 0, firstCard);

          console.log(firstBoard, finishedBoard);
          boardCopy[firstIndex] = {
            title: startBoardId,
            content: [...firstBoard],
          };
          boardCopy[finishedIndex] = {
            title: endBoard.droppableId,
            content: [...finishedBoard],
          };
          return [...boardCopy];
        });
        break;
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
