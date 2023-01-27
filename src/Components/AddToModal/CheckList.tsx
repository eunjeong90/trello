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
  const [isChecked, setIsChecked] = useState(false);
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
        state: isChecked,
      };
      console.log(newCheckList);
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
          const newObj = {
            ...item,
            state: !item.state,
          };
          setIsChecked(!item.state);
          console.log(isChecked);
          return newObj;
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
  console.log(stateArr);
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
            <ListItem>
              <CheckBox
                onClick={() => onCheckState(item.checkId)}
                bgColor={item.state ? "#4492bf" : "#fafbfc"}
              >
                <Checked isChecked={item.state ? "1" : "0"} />
              </CheckBox>
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
const CheckBox = styled.div<{ bgColor: string }>`
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 2px;
  box-shadow: inset 0 0 0 2px #dfe1e6;
  cursor: pointer;
  flex-shrink: 0;
  height: 16px;
  left: -5px;
  margin: 6px;
  overflow: hidden;
  position: absolute;
  text-align: center;
  top: 1px;
  transition: all 0.2s ease-in-out;
  white-space: nowrap;
  width: 16px;
`;
const Checked = styled.span<{ isChecked: string }>`
  display: inline-block;
  height: 16px;
  width: 16px;
  opacity: ${({ isChecked }) => isChecked};
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23fff' viewBox='-3 -4 16 16'%3E%3Cpath d='M1.49 3.215a.667.667 0 0 0-.98.903l2.408 2.613c.358.351.892.351 1.223.02l.243-.239a1689.645 1689.645 0 0 0 2.625-2.589l.027-.026a328.23 328.23 0 0 0 2.439-2.429.667.667 0 1 0-.95-.936c-.469.476-1.314 1.316-2.426 2.417l-.027.026a1368.126 1368.126 0 0 1-2.517 2.482L1.49 3.215Z'/%3E%3C/svg%3E");
`;
const ListItem = styled.div`
  overflow-wrap: break-word;
  word-break: break-word;
  padding: 8px 0;
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
    top: 1px;
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
