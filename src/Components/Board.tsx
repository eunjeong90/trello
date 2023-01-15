import { IBoardType, BoardState } from "recoil/BoardState";
import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

interface IBoard {
  boardContent: IBoardType[];
  boardTitle: string;
  boardIndex: number;
}
interface ICardAreaProps {
  isDraggingOver: boolean;
  draggingFromThisWith: boolean;
}

interface IForm {
  task: string;
  data: string;
  title: string;
}
const Board = ({ boardContent, boardTitle, boardIndex }: IBoard) => {
  const setBoards = useSetRecoilState(BoardState);
  const { register, setValue, handleSubmit } = useForm<IForm>({
    defaultValues: { task: "" },
  });

  const onCreateCardSubmit = ({ task }: IForm) => {
    setBoards((prevBoard) => {
      const copyBoard = [...prevBoard];
      const targetBoardContent = [...prevBoard[boardIndex].content];
      const newCard = {
        contentId: Date.now(),
        value: task,
      };
      copyBoard[boardIndex] = {
        title: copyBoard[boardIndex].title,
        content: [...targetBoardContent, newCard],
      };
      return [...copyBoard];
    });
    setValue("task", "");
  };
  const handleCardTitleKeyPress = (keyEvent: React.KeyboardEvent) => {
    if (keyEvent.key === "Enter" && keyEvent.shiftKey === false) {
      keyEvent.preventDefault();
      handleSubmit(onCreateCardSubmit)();
    }
  };
  const handleCardRemove = (index: number) => {
    setBoards((allBoards) => {
      const copyBoard = [...allBoards];
      const targetBoardContent = [...copyBoard[boardIndex].content];
      console.log(targetBoardContent);
      targetBoardContent.splice(index, 1);
      copyBoard[boardIndex] = {
        title: copyBoard[boardIndex].title,
        content: [...targetBoardContent],
      };
      return [...copyBoard];
    });
  };

  return (
    <>
      <Wrapper>
        <TitleForm>
          <Title name="title">{boardTitle}</Title>
        </TitleForm>

        <Droppable droppableId={boardTitle}>
          {(magic, snapshot) => (
            <CardArea
              isDraggingOver={snapshot.isDraggingOver}
              draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
              ref={magic.innerRef}
              {...magic.droppableProps}
            >
              {boardContent.map((toDo, index) => (
                <DraggableCard
                  toDoId={toDo.contentId}
                  toDoText={toDo.value}
                  index={index}
                  key={toDo.contentId}
                  handleCardRemove={handleCardRemove}
                />
              ))}
              {magic.placeholder}
            </CardArea>
          )}
        </Droppable>
        <EnterForm onSubmit={handleSubmit(onCreateCardSubmit)}>
          <EnterCardTitle
            {...register("task", { required: true })}
            name="task"
            onKeyDown={handleCardTitleKeyPress}
            placeholder={`Enter a ${boardTitle.toLowerCase()} for this card...`}
          />
        </EnterForm>
      </Wrapper>
    </>
  );
};

export default Board;

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
