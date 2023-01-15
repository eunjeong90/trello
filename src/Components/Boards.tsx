import { Droppable } from "react-beautiful-dnd";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { BoardState } from "recoil/BoardState";
import styled from "styled-components";
import Board from "./Board";

interface IForm {
  createBoard: string;
}

const Boards = () => {
  const [boards, setBoards] = useRecoilState(BoardState);
  const { register, handleSubmit, setValue } = useForm<IForm>({
    // defaultValue: { createBoard: "" },
  });
  const onSubmitNewBoard: SubmitHandler<IForm> = ({ createBoard }: IForm) => {
    setBoards((prevBoard) => {
      const copyBoard = [...prevBoard];
      const newBoard = {
        title: createBoard,
        content: [],
      };
      return [...copyBoard, newBoard];
    });
    setValue("createBoard", "");
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmitNewBoard)}>
        <input
          {...register("createBoard", {
            required: true,
            maxLength: 20,
            minLength: 1,
          })}
          type="text"
        />
      </form>
      <Wrapper>
        {/* <Droppable droppableId={boardId}> */}
        <BoardsArea>
          {boards.map((boardTitle) => (
            <Board
              key={boardTitle.title}
              board={boardTitle.content}
              boardId={boardTitle.title}
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
