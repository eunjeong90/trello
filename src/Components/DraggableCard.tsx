import React from "react";
import ModalPortal from "Portal";
import useModal from "hook/useModal";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import CardModal from "./modal/CardModal";
import { IBoard } from "./Board";

interface IToDoProps extends IBoard {
  toDoId: number;
  toDoText: string;
  index: number;
  handleCardRemove: (param: number) => void;
}

const DraggableCard = ({
  boardTitle,
  boardIndex,
  toDoId,
  toDoText,
  index,
  handleCardRemove,
}: IToDoProps) => {
  const CardPopUp = useModal(toDoId);
  const {
    modal: { isOpen },
    isOpenModal,
    isHideModal,
  } = CardPopUp;
  return (
    <>
      {isOpen && (
        <ModalPortal>
          <CardModal
            boardTitle={boardTitle}
            boardIndex={boardIndex}
            cardText={toDoText}
            cardId={toDoId}
            cardIndex={index}
            isHideModal={isHideModal}
            handleCardRemove={handleCardRemove}
          />
        </ModalPortal>
      )}
      <Draggable draggableId={toDoId + ""} index={index}>
        {(magic, snapshot) => (
          <Card
            isDragging={snapshot.isDragging}
            ref={magic.innerRef}
            {...magic.dragHandleProps}
            {...magic.draggableProps}
            onClick={() => isOpenModal()}
          >
            <span>{toDoText}</span>
          </Card>
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
const DeleteButton = styled.button``;
