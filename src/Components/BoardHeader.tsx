import { useForm } from "react-hook-form";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { Title } from "styles/shared";
import { BoardState } from "recoil/BoardState";
import { useSetRecoilState } from "recoil";
import { IBoard } from "./Board";
import React, { useRef, useState } from "react";
import useModal from "hook/useModal";
import HeaderListModal from "./modal/HeaderListModal";
import ToolTipPortal from "Portal_Tooltip";

interface IForm {
  title: string;
}
const BoardHeader = ({ boardTitle, boardIndex }: IBoard) => {
  const setBoards = useSetRecoilState(BoardState);
  const { handleSubmit, register, setFocus } = useForm<IForm>({
    defaultValues: { title: boardTitle },
  });
  const BoardPopUp = useModal(`${boardTitle}`);
  const {
    modal: { isOpen },
    isOpenModal,
    isHideModal,
  } = BoardPopUp;
  const [toggle, setToggle] = useState<boolean>(isOpen);
  const titleRef = useRef<HTMLTextAreaElement | null>(null);
  const { ref } = register("title");
  const tooltipBtn = useRef<HTMLButtonElement | null>(null);
  const onRenameTitleSubmit = ({ title }: IForm) => {
    setBoards((allBoards) => {
      const copyBoard = [...allBoards];
      copyBoard[boardIndex] = {
        title: title,
        content: copyBoard[boardIndex].content,
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
    setFocus("title");
    titleRef.current?.select();
  };
  const handleBoardRemove = () => {
    setBoards((prevBoard) => {
      const copyBoards = [...prevBoard];
      const targetRemoveIndex = copyBoards.findIndex(
        ({ title }) => title === boardTitle
      );
      copyBoards.splice(targetRemoveIndex, 1);
      return [...copyBoards];
    });
  };
  const handleAllCardRemove = () => {
    setBoards((prevBoards) => {
      const copyBoard = [...prevBoards];
      const { content, ...withoutContent } = copyBoard[boardIndex];
      copyBoard[boardIndex] = {
        ...withoutContent,
        content: [],
      };
      return [...copyBoard];
    });
    setToggle(false);
    isHideModal();
  };
  const handleCloseToggle = () => {
    if (toggle === true) {
      setToggle(false);
      isHideModal();
    } else {
      setToggle(true);
      isOpenModal();
    }
    console.log(toggle);
  };

  const [coords, setCoords] = useState<object>({});

  const updateTooltipCoords = (button: any) => {
    const rect = button.getBoundingClientRect();
    setCoords({
      left: rect.x + rect.width / 2,
      top: rect.y + window.scrollY,
    });
    console.log(window.scrollY);
  };
  return (
    <>
      {isOpen && (
        <ToolTipPortal>
          <HeaderListModal
            handleBoardRemove={handleBoardRemove}
            isHideModal={isHideModal}
            handleAllCardRemove={handleAllCardRemove}
            setToggle={setToggle}
            coords={coords}
            updateTooltipCoords={() => updateTooltipCoords(tooltipBtn.current)}
          />
        </ToolTipPortal>
      )}
      <Header onSubmit={handleSubmit(onRenameTitleSubmit)}>
        <TargetArea onClick={handleHeaderClickEvent} />
        <Title
          {...register("title", {
            required: true,
          })}
          ref={(e) => {
            ref(e);
            titleRef.current = e;
          }}
          onKeyPress={handleBoardTitleKeyPress}
        >
          {boardTitle}
        </Title>
        <HeaderListIconBox>
          <button
            ref={tooltipBtn}
            onClick={(e) => {
              updateTooltipCoords(e.currentTarget);
              handleCloseToggle();
            }}
          >
            <FontAwesomeIcon icon={faEllipsis} />
          </button>
        </HeaderListIconBox>
      </Header>
    </>
  );
};

export default BoardHeader;

const Header = styled.div`
  flex: 0 0 auto;
  min-height: 20px;
  padding: 10px 8px;
  position: relative;
  padding-right: 36px;
`;
const TargetArea = styled.div`
  bottom: 0;
  cursor: pointer;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

const HeaderListIconBox = styled.div`
  position: absolute;
  right: 4px;
  top: 4px;
  z-index: 1;
  cursor: pointer;
  border-radius: 3px;
  &:hover {
    background-color: #b4b7bb6d;
  }
  button {
    padding: 6px;
  }
  svg {
    color: #828181;
  }
`;
