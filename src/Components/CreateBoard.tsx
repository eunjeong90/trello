import { SubmitHandler, useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { BoardState } from "recoil/BoardState";
import styled from "styled-components";

interface IForm {
  createBoard: string;
}

const CreateBoard = () => {
  const setBoards = useSetRecoilState(BoardState);
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
    <CreateBox>
      <form onSubmit={handleSubmit(onSubmitNewBoard)}>
        <input
          {...register("createBoard", {
            required: true,
            maxLength: 20,
            minLength: 1,
          })}
          type="text"
          placeholder="Enter list title..."
        />
      </form>
    </CreateBox>
  );
};

export default CreateBoard;

const CreateBox = styled.div`
  display: inline-block;
`;
