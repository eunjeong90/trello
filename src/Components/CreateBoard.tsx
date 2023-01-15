import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { BoardState } from "recoil/BoardState";

interface IForm {
  createBoard: string;
}

const CreateBoard = () => {
  const [boards, setBoards] = useRecoilState(BoardState);
  console.log(boards);
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
  );
};

export default CreateBoard;
