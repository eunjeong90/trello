import React from "react";
import { Link, Route, useHistory } from "react-router-dom";
import { Draggable } from "react-beautiful-dnd";
import useModal from "hook/useModal";
import styled from "styled-components";
import ModalPortal from "Portal";
import { IBoardType } from "recoil/BoardState";
import CardModal from "./modal/CardModal";
import { IBoard } from "./Board";

interface IToDoProps extends IBoard {
  toDoId: number;
  toDoText: string;
  index: number;
  toDo: IBoardType;
  handleCardRemove: (param: number) => void;
}

const DraggableCard = ({
  boardTitle,
  boardIndex,
  toDoId,
  toDoText,
  index,
  toDo,
  handleCardRemove,
}: IToDoProps) => {
  const CardPopUp = useModal(toDoId);
  const {
    modal: { isOpen },
    isOpenModal,
  } = CardPopUp;
  return (
    <>
      {isOpen && (
        <ModalPortal>
          <Route path={`/${boardTitle}/${toDo.cardTitle}`}>
            <CardModal
              cardContent={toDo}
              boardTitle={boardTitle}
              boardIndex={boardIndex}
              cardText={toDoText}
              cardId={toDoId}
              cardIndex={index}
              handleCardRemove={handleCardRemove}
            />
          </Route>
        </ModalPortal>
      )}
      <Draggable draggableId={toDoId + ""} index={index}>
        {(magic, snapshot) => (
          <Link to={`/${boardTitle}/${toDo.cardTitle}`}>
            <Card
              isDragging={snapshot.isDragging}
              ref={magic.innerRef}
              {...magic.dragHandleProps}
              {...magic.draggableProps}
              onClick={() => isOpenModal()}
            >
              <span>{toDoText}</span>
            </Card>
          </Link>
        )}
      </Draggable>
    </>
  );
};

export default React.memo(DraggableCard);

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${({ theme, isDragging }) =>
    isDragging ? "#e4f2ff" : theme.cardColor};
  box-shadow: ${({ isDragging }) =>
    isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.05)" : "none"};
  display: flex;
  justify-content: space-between;
  &:hover {
    background-color: #f4f4f4;
  }
`;
