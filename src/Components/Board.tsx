import { IBoardType, BoardState } from "recoil/BoardState";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
import BoardHeader from "./BoardHeader";

export interface IBoard {
  boardContent?: IBoardType[];
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
const Board = ({ boardContent, boardTitle: title, boardIndex }: IBoard) => {
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
        cardTitle: task,
        value: "",
        checkList: [],
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
      <Draggable draggableId={title} index={boardIndex} key={title}>
        {(magic) => (
          <Wrapper
            ref={magic.innerRef}
            {...magic.dragHandleProps}
            {...magic.draggableProps}
          >
            <BoardHeader boardTitle={title} boardIndex={boardIndex} />
            <Droppable droppableId={title} type="CARD">
              {(magic, snapshot) => (
                <CardArea
                  isDraggingOver={snapshot.isDraggingOver}
                  draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
                  ref={magic.innerRef}
                  {...magic.droppableProps}
                >
                  {boardContent?.map((toDo, index) => (
                    <DraggableCard
                      toDo={toDo}
                      toDoId={toDo.contentId}
                      toDoText={toDo.cardTitle}
                      index={index}
                      key={toDo.contentId}
                      boardTitle={title}
                      boardIndex={boardIndex}
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
                onKeyPress={handleCardTitleKeyPress}
                placeholder={`Enter a ${title.toLowerCase()} for this card...`}
              />
            </EnterForm>
          </Wrapper>
        )}
      </Draggable>
    </>
  );
};

export default Board;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.boardColor};
  border-radius: 5px;
  padding-bottom: 20px;
  max-height: 100vh;
  position: relative;
`;
export const TextArea = styled.textarea`
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

const CardArea = styled.div<ICardAreaProps>`
  background-color: ${({ isDraggingOver, draggingFromThisWith }) =>
    isDraggingOver
      ? "#dfe6e9"
      : draggingFromThisWith
      ? "#b2bec3"
      : "transparent"};
  border-radius: 5px;
  transition: background-color 0.2s ease-in-out;
  padding: 1px 8px;
`;

const Form = styled.form`
  width: 100%;
  padding-left: 8px;
  padding-right: 8px;
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
