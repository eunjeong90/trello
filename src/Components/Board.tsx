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
  background-color: ${({ theme }) => theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;
const TextArea = styled.textarea`
  border-radius: 3px;
  box-shadow: none;
  font-weight: 600;
  height: 28px;
  margin: -4px 0;
  max-height: 256px;
  min-height: 20px;
  padding: 10px 8px;
  overflow: hidden;
  resize: none;
  outline: none;
  border: none;
`;
const Title = styled(TextArea)`
  text-align: left;
  font-size: 16px;
  background: #0000;
  &:focus {
    box-shadow: inset 0 0 0 2px #0079bf;
    background: #ffffff;
  }
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
  /* flex-grow: 1; */
  border-radius: 5px;
  transition: background-color 0.2s ease-in-out;
  padding: 1px 8px;
`;

const Form = styled.form`
  width: 100%;
  padding-left: 8px;
  padding-right: 8px;
`;
const TitleForm = styled(Form)`
  min-height: 20px;
  padding: 10px 8px;
  position: relative;
`;
const EnterForm = styled(Form)`
  margin-top: 10px;
`;
const EnterCardTitle = styled(TextArea)`
  width: 100%;
  height: 54px;
  padding: 5px;
  box-sizing: border-box;
  display: block;
  line-height: 20px;
  overflow-wrap: break-word;
`;

interface IForm {
  task: string;
  // cardTitle: string;
  data: string;
}
const Board = ({ toDos, boardId }: IToDos) => {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();

  const onCardTitleSubmit = ({ task }: IForm) => {
    // console.log(task);
    const newToDo = {
      id: Date.now(),
      text: task,
    };
    setToDos((prevBoard) => {
      return {
        ...prevBoard,
        [boardId]: [...prevBoard[boardId], newToDo],
      };
    });
    setValue("task", "");
  };
  const handleCardTitleKeyPress = (keyEvent: React.KeyboardEvent) => {
    if (keyEvent.key === "Enter" && keyEvent.shiftKey === false) {
      keyEvent.preventDefault();
      handleSubmit(onCardTitleSubmit)();
    }
  };

  // const onChangeTitle = (
  //   event: React.FormEvent<HTMLTextAreaElement>,
  //   keyEvent: React.KeyboardEvent
  // ) => {
  //   const targetTitle = { cardTitle: event.currentTarget.value };
  //   console.log(targetTitle);

  // if (keyEvent.key === "Enter" && keyEvent.shiftKey === false) {
  //   setToDos((allBoard) => {
  //     return {
  //       ...allBoard,
  //       // [newTitle]: [...allBoard[boardId]],
  //     };
  //   });
  //   // return handleSubmit(CommentOnSubmit(data));
  // }
  // };
  return (
    <>
      <Wrapper>
        <TitleForm>
          <Title
            // {...register("cardTitle", {
            //   required: true,
            // })}
            name="cardTitle"
            // onKeyDown={onChangeTitle}
          >
            {boardId}
          </Title>
        </TitleForm>

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
        <EnterForm onSubmit={handleSubmit(onCardTitleSubmit)}>
          <EnterCardTitle
            {...register("task", { required: true })}
            onKeyDown={handleCardTitleKeyPress}
            placeholder={`Enter a ${boardId.toLowerCase()} for this card...`}
          />
        </EnterForm>
      </Wrapper>
    </>
  );
};

export default Board;
