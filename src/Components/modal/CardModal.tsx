import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { CardTitle } from "styles/shared";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { useSetRecoilState } from "recoil";
import { BoardState } from "recoil/BoardState";
import { IBoard } from "Components/Board";

interface ICardProps extends IBoard {
  isHideModal(): void;
  cardText: string;
  cardId: number;
  cardIndex: number;
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
  isHideModal,
}: ICardProps) => {
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
    <Wrapper>
      <ModalArea>
        <div>
          <CardBox>
            <Header onSubmit={handleSubmit(onRenameTitleSubmit)}>
              <CardTitle
                {...register("title", {
                  required: true,
                })}
                ref={(e) => {
                  ref(e);
                  titleRef.current = e;
                }}
                onClick={handleHeaderClickEvent}
                onKeyDown={handleBoardTitleKeyPress}
              >
                {cardText}
              </CardTitle>
              <div>
                <p>in list {boardTitle}</p>
              </div>
            </Header>
            <MainColumn>main</MainColumn>
            <SideBar>side bar</SideBar>
          </CardBox>
          <i role="presentation" onClick={() => isHideModal()}>
            <FontAwesomeIcon icon={faXmark} />
          </i>
        </div>
      </ModalArea>
    </Wrapper>
  );
};

export default CardModal;

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  background-color: #00000014;
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
  i {
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
`;
