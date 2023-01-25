import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { ContentTitleArea } from "Components/modal/CardModal";
import { CheckListTextArea } from "styles/shared";
import { useRecoilState } from "recoil";
import { BoardState, IBoardType, ICheckListType } from "recoil/BoardState";
import { useForm } from "react-hook-form";
import { IBoard } from "Components/Board";

interface ICheckListProps extends IBoard {
  cardText: string;
  cardId: number;
  cardIndex: number;
  boardTitle: string;
  cardContent: IBoardType;
}
interface IListForm {
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
  const { register, handleSubmit, setFocus, setValue } = useForm<IListForm>();
  const { checkList } = cardContent;
  const [toggleAddList, setToggleAddList] = useState(false);
  useEffect(() => {
    setFocus("list");
  }, [toggleAddList, setFocus]);

  const onCheckListSubmit = ({ list }: IListForm) => {
    console.log(list);
    setBoards((allBoards) => {
      const copyBoards = JSON.parse(JSON.stringify(allBoards));
      const targetBoardContent = copyBoards[boardIndex].content;
      const newCheckList = {
        checkId: Date.now(),
        value: list,
        state: false,
      };
      const { checkList, ...rest } = targetBoardContent[cardIndex];
      targetBoardContent[cardIndex] = {
        ...rest,
        checkList: [...checkList, newCheckList],
      };
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
  const onCheckState = (itemId: number) => {
    setBoards((allBoards) => {
      const copyBoards = JSON.parse(JSON.stringify(allBoards));
      const targetContent = copyBoards[boardIndex].content;
      const list = copyBoards[boardIndex].content[cardIndex].checkList;
      const newState = list.map((item: ICheckListType) => {
        if (itemId === item.checkId) {
          return { ...item, state: !item.state };
        } else {
          return item;
        }
      });
      const { checkList, ...rest } = targetContent[cardIndex];
      targetContent[cardIndex] = {
        ...rest,
        checkList: newState,
      };
      return [...copyBoards];
    });
  };
  const stateArr = checkList?.map((item) => item.state);
  const currentState = stateArr.filter((item) => item);
  return (
    <CheckWrapper>
      <ContentTitleArea>
        <i>
          <FontAwesomeIcon icon={faListCheck} />
        </i>
        <strong>Checklist</strong>
      </ContentTitleArea>
      <ContentBox>
        <ProgressBar>
          <span>
            {stateArr.length === 0
              ? "0"
              : Math.round((currentState.length / stateArr.length) * 100)}
            &#37;
          </span>
          <div className="progress-bar">
            <CurrentBar
              className="progress-current-bar"
              width={(currentState.length / stateArr.length) * 100 + "%"}
            ></CurrentBar>
          </div>
        </ProgressBar>
        {checkList?.map((item, index) => (
          <ListView key={cardId + index}>
            <span>{item.state === true ? "chcked" : ""}</span>
            <ListItem>
              <span
                onClick={() => onCheckState(item.checkId)}
                role="presentation"
              >
                {item.value}
              </span>
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
const ListView = styled.form`
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
const ProgressBar = styled.div`
  margin-bottom: 6px;
  position: relative;
  span {
    font-size: 11px;
    left: 0;
    line-height: 10px;
    position: absolute;
    text-align: center;
    top: -1px;
    width: 32px;
  }
  .progress-bar {
    background: #091e4214;
    border-radius: 4px;
    clear: both;
    height: 8px;
    margin: 0 0 0 40px;
    overflow: hidden;
    position: relative;
  }
  .progress-current-bar {
    background-color: #5ba4cf;
    bottom: 0;
    left: 0;
    position: absolute;
    top: 0;
    transition-duration: 0.14s;
    transition-property: width, background-color;
    transition-timing-function: ease-in;
  }
`;
const CurrentBar = styled.div<{ width: string }>`
  background-color: #5ba4cf;
  bottom: 0;
  left: 0;
  position: absolute;
  top: 0;
  transition-duration: 0.14s;
  transition-property: width, background-color;
  transition-timing-function: ease-in;
  width: ${(props) => props.width};
`;
