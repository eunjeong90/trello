import { ITodo, toDoState } from "atoms";
import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

interface IToDos {
  toDos: ITodo[];
  boardId: string;
}
const Wrapper = styled.div`
  padding-top: 30px;
  background-color: ${({ theme }) => theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;
interface ICardAreaProps {
  isDraggingOver: boolean;
  draggingFromThisWith: boolean;
}
const CardArea = styled.div<ICardAreaProps>`
  background-color: ${({ isDraggingOver, draggingFromThisWith }) =>
    isDraggingOver
      ? "#dfe6e9"
      : draggingFromThisWith
      ? "#b2bec3"
      : "transparent"};
  flex-grow: 1;
  border-radius: 5px;
  transition: background-color 0.2s ease-in-out;
  padding: 20px;
`;

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;

interface IForm {
  task: string;
}
const Board = ({ toDos, boardId }: IToDos) => {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onSubmit = ({ task }: IForm) => {
    // console.log(task);
    const newToDo = {
      id: Date.now(),
      text: task,
    };
    setToDos((allBoard) => {
      return {
        ...allBoard,
        [boardId]: [newToDo, ...allBoard[boardId]],
      };
    });
    setValue("task", "");
  };
  return (
    <>
      <Wrapper>
        <Title>{boardId}</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("task", { required: true })}
            type="text"
            placeholder={`Enter a ${boardId.toLowerCase()} for this card...`}
          />
        </Form>
        <Droppable droppableId={boardId}>
          {(magic, snapshot) => (
            <CardArea
              isDraggingOver={snapshot.isDraggingOver}
              draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
              ref={magic.innerRef}
              {...magic.droppableProps}
            >
              {toDos.map((toDo, index) => (
                <DraggableCard
                  toDoId={toDo.id}
                  toDoText={toDo.text}
                  index={index}
                  key={toDo.id}
                />
              ))}
              {magic.placeholder}
            </CardArea>
          )}
        </Droppable>
      </Wrapper>
    </>
  );
};

export default Board;
