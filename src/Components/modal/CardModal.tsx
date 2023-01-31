import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { BoardState, IBoardType } from "recoil/BoardState";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faHeading,
  faPenToSquare,
  faTrashCan,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { CardTitle } from "styles/shared";
import { IBoard } from "Components/Board";
import CheckList from "Components/AddToModal/CheckList";
import TextEditor from "Components/AddToModal/TextEditor";
import { useHistory } from "react-router-dom";
interface ICardProps extends IBoard {
  handleCardRemove(param: number): void;
  cardText: string;
  cardId: number;
  cardIndex: number;
  cardContent: IBoardType;
  boardTitle: string;
}
interface IForm {
  title: string;
}

const CardModal = ({
  boardTitle,
  boardIndex,
  cardText,
  cardId,
  cardIndex,
  cardContent,
  handleCardRemove,
}: ICardProps) => {
  const history = useHistory();
  const setBoards = useSetRecoilState(BoardState);
  const { register, handleSubmit } = useForm<IForm>();
  const titleRef = useRef<HTMLTextAreaElement | null>(null);
  const { ref } = register("title");

  const onRenameTitleSubmit = ({ title }: IForm) => {
    setBoards((allBoards) => {
      const copyBoard = [...allBoards];
      const targetBoardContent = [...allBoards[boardIndex].content];
      const targetCard = copyBoard[boardIndex].content[cardIndex];
      const { cardTitle, ...rest } = targetCard;
      const newCardTitle = {
        ...rest,
        cardTitle: title,
      };
      targetBoardContent[cardIndex] = {
        ...newCardTitle,
      };
      copyBoard[boardIndex] = {
        title: copyBoard[boardIndex].title,
        content: [...targetBoardContent],
      };
      return [...copyBoard];
    });
    titleRef.current?.blur();
  };
  const handleBoardTitleKeyPress = (keyEvent: React.KeyboardEvent) => {
    if (keyEvent.key === "Enter" && keyEvent.shiftKey === false) {
      keyEvent.preventDefault();
      handleSubmit(onRenameTitleSubmit)();
    }
  };
  const handleHeaderClickEvent = () => {
    titleRef.current?.select();
  };
  return (
    <Wrapper onClick={() => history.push(`/`)}>
      <ModalArea>
        <div>
          <CardBox>
            <Header onSubmit={handleSubmit(onRenameTitleSubmit)}>
              <i>
                <FontAwesomeIcon icon={faHeading} />
              </i>

              <div className="title">
                <CardTitle
                  {...register("title", {
                    required: true,
                  })}
                  ref={(e) => {
                    ref(e);
                    titleRef.current = e;
                  }}
                  onClick={handleHeaderClickEvent}
                  onKeyPress={handleBoardTitleKeyPress}
                >
                  {cardText}
                </CardTitle>
              </div>
              <div className="boardTitle">
                <p>in list {boardTitle}</p>
              </div>
            </Header>
            <MainColumn>
              <Description>
                <ContentTitleArea>
                  <i>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </i>
                  <strong>Description</strong>
                </ContentTitleArea>
                <div>
                  <TextEditor
                    boardIndex={boardIndex}
                    cardIndex={cardIndex}
                    boardTitle={boardTitle}
                  />
                </div>
              </Description>
              <CheckList
                boardTitle={boardTitle}
                boardIndex={boardIndex}
                cardText={cardText}
                cardId={cardId}
                cardIndex={cardIndex}
                cardContent={cardContent}
              />
            </MainColumn>
            <SideBar>
              <div className="Add-list">
                <strong>Add to card</strong>
                <button onClick={() => handleCardRemove(cardIndex)}>
                  <i>
                    <FontAwesomeIcon icon={faClock} />
                  </i>

                  <span>Dates</span>
                </button>
              </div>
              <div className="action-list">
                <strong>Actions</strong>
                <button onClick={() => handleCardRemove(cardIndex)}>
                  <i>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </i>

                  <span>Delete</span>
                </button>
              </div>
            </SideBar>
          </CardBox>
          <CloseIcon role="presentation" onClick={() => history.push(`/`)}>
            <FontAwesomeIcon icon={faXmark} />
          </CloseIcon>
        </div>
      </ModalArea>
    </Wrapper>
  );
};

export default CardModal;

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  background-color: #00000087;
  height: 100%;
  justify-content: center;
  left: 0;
  overflow-y: auto;
  overflow-x: hidden;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 20;
`;
const ModalArea = styled.div`
  background-color: #f4f5f7;
  border-radius: 2px;
  margin: 48px 0 80px;
  overflow: hidden;
  position: relative;
  width: 768px;
  z-index: 25;
  overflow: visible;
`;
const CloseIcon = styled.i`
  border-radius: 50%;
  color: #5d5f61;
  height: 32px;
  margin: 4px;
  line-height: 32px;
  display: inline-block;
  text-align: center;
  overflow: hidden;
  padding: 4px;
  position: absolute;
  right: 0;
  top: 0;
  transition: background-color 85ms, color 85ms;
  width: 32px;
  z-index: 2;
  cursor: pointer;
  &:hover {
    background-color: #091e4214;
    color: #42526e;
    text-decoration: none;
  }
  svg {
    height: 1.25em;
    display: inline-block;
  }
`;
const CardBox = styled.div`
  background-color: #f4f5f7;
  min-height: 600px;
`;
const Header = styled.div`
  min-height: 32px;
  padding: 12px 40px 8px 56px;
  position: relative;
  z-index: 1;
  i {
    left: 16px;
    position: absolute;
    top: 26px;
  }
  div.title {
    padding: 12px 0 0;
  }
  div.boardTitle {
    display: inline-block;
    margin: 4px 8px 4px 2px;
    font-size: 14px;
  }
`;
const MainColumn = styled.div`
  float: left;
  margin: 0;
  min-height: 24px;
  padding: 0 8px 8px 16px;
  position: relative;
  width: 552px;
  z-index: 1;
`;
const SideBar = styled.div`
  float: right;
  overflow: hidden;
  padding: 0 16px 8px 8px;
  width: calc(100% - 600px);
  z-index: 10;
  div {
    margin-bottom: 8px;
    strong {
      color: #5e6c84;
      font-size: 12px;
      font-weight: 600;
      line-height: 16px;
      line-height: 20px;
      margin-bottom: -4px;
      margin-top: 16px;
    }
    button {
      background-color: #091e420a;
      border: none;
      border-radius: 3px;
      box-shadow: none;
      box-sizing: border-box;
      cursor: pointer;
      display: block;
      height: 32px;
      margin-top: 8px;
      max-width: 300px;
      width: 100%;
      text-align: left;
      overflow: hidden;
      padding: 6px 12px;
      position: relative;
      text-decoration: none;
      text-overflow: ellipsis;
      transition-duration: 85ms;
      transition-property: background-color, border-color, box-shadow;
      transition-timing-function: ease;
      -webkit-user-select: none;
      user-select: none;
      white-space: nowrap;
      i {
        margin: 0 6px 0 -6px;
        height: 20px;
        line-height: 20px;
        width: 20px;
      }
      span {
        font-size: 14px;
      }
    }
  }
`;
export const ContentTitleArea = styled.div`
  align-items: center;
  display: flex;
  min-height: 32px;
  margin: 0 0 4px 40px;
  padding: 8px 0;
  position: relative;
  i {
    left: -40px;
    top: 8px;
    position: absolute;
  }
  strong {
    display: inline-block;
    margin: 0;
    min-height: 18px;
    min-width: 40px;
    width: auto;
    font-size: 16px;
    line-height: 20px;
    font-weight: 600;
  }
`;
const Description = styled.div`
  margin-bottom: 24px;
  position: relative;
`;
