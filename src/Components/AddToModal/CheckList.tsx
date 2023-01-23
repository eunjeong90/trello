import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { ContentTitleArea } from "Components/modal/CardModal";
import { CheckListTextArea } from "styles/shared";
import { useRecoilState } from "recoil";
import { BoardState, IBoardType } from "recoil/BoardState";
import { useForm } from "react-hook-form";
import { IBoard } from "Components/Board";
import Boards from "Components/Boards";

interface ICheckListProps extends IBoard {
  cardText: string;
  cardId: number;
  cardIndex: number;
  boardTitle: string;
  cardContent: IBoardType;
}
interface IForm {
  list: string;
}
const CheckList = ({
  boardTitle,
  boardIndex,
  cardText,
  cardContent,
  cardId,
  cardIndex,
}: ICheckListProps) => {
  const [boards, setBoards] = useRecoilState(BoardState);
  const { register, handleSubmit, setFocus, setValue } = useForm<IForm>();
  const [toggleAddList, setToggleAddList] = useState(false);

  useEffect(() => {
    setFocus("list");
  }, [toggleAddList, setFocus]);
  const onCheckListSubmit = ({ list }: IForm) => {
    console.log(list);
    setBoards((allBoards) => {
      const copyBoards = JSON.parse(JSON.stringify(allBoards));
      const targetBoardContent = copyBoards[boardIndex].content;
      const newCheckList = {
        checkId: Date.now(),
        value: list,
        state: false,
      };
      const { content, ...title } = copyBoards[boardIndex];
      const { checkList, ...rest } = targetBoardContent[cardIndex];
      const newInsertCheckContent = (targetBoardContent[cardIndex] = {
        ...rest,
        checkList: [...checkList, newCheckList],
      });
      copyBoards[boardIndex] = {
        ...title,
        content: [...targetBoardContent, newInsertCheckContent],
      };
      console.log(targetBoardContent);
      return [...copyBoards];
    });
    setValue("list", "");
  };
  const handleBoardTitleKeyPress = (keyEvent: React.KeyboardEvent) => {
    if (keyEvent.key === "Enter" && keyEvent.shiftKey === false) {
      keyEvent.preventDefault();
      handleSubmit(onCheckListSubmit)();
    }
  };
  const handleAddListState = () => setToggleAddList((prev) => !prev);
  // console.log(cardContent.checkList);
  // console.log(boards);
  return (
    <CheckWrapper>
      <ContentTitleArea>
        <i>
          <FontAwesomeIcon icon={faListCheck} />
        </i>
        <strong>Checklist</strong>
      </ContentTitleArea>
      <ContentBox>
        {cardContent.checkList?.map((item, index) => (
          <ListView key={cardId + index}>
            <CheckBox>
              <input type="checkbox" name="" id="" />
            </CheckBox>
            <ListItem>
              <span>{item.value}</span>
            </ListItem>
          </ListView>
        ))}
        {toggleAddList ? (
          <form onSubmit={handleSubmit(onCheckListSubmit)}>
            <CheckListTextArea
              {...register("list")}
              onKeyDown={handleBoardTitleKeyPress}
              placeholder="Add an item"
            />
            <div>
              <input type="submit" value="Add" />
              <button type="button" onClick={handleAddListState}>
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button type="button" onClick={handleAddListState}>
            Add an item
          </button>
        )}
      </ContentBox>
    </CheckWrapper>
  );
};

export default CheckList;

const CheckWrapper = styled.div``;
const ContentBox = styled.div`
  button {
    border-radius: 3px;
    background-color: #091e420a;
    align-items: center;
    border: none;
    border-radius: 3px;
    box-shadow: none;
    box-sizing: border-box;
    cursor: pointer;
    display: inline-flex;
    font-size: 14px;
    font-weight: 400;
    justify-content: center;
    line-height: 20px;
    padding: 6px 12px;
    text-decoration: none;
    transition-duration: 85ms;
    transition-property: background-color, border-color, box-shadow;
    transition-timing-function: ease;
    white-space: normal;
  }
`;
const ListView = styled.div`
  display: flex;
  align-items: center;

  padding-left: 40px;
  position: relative;
  transform-origin: left bottom;
  transition-duration: 0.3s;
  transition-property: transform, opacity, height, padding, margin,
    background-color;
  transition-timing-function: ease-in;
`;
const CheckBox = styled.div`
  border-radius: 4px;
  flex-shrink: 0;
  height: 16px;
  left: -6px;
  margin: 6px;
  overflow: hidden;
  position: absolute;
  text-align: center;
  top: 0;
  transition: all 0.2s ease-in-out;
  white-space: nowrap;
  width: 16px;
  display: block;
  input[type="checkbox"] {
    margin: 0;
    vertical-align: middle;
  }
`;
const ListItem = styled.div`
  overflow-wrap: break-word;
  word-break: break-word;
  padding: 6px 0;
  width: 100%;
  span {
    min-height: 20px;
  }
`;
