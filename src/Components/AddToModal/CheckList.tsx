import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { ContentTitleArea } from "Components/modal/CardModal";
import { CheckListTextArea } from "styles/shared";
import { useRecoilState } from "recoil";
import { BoardState } from "recoil/BoardState";
import { useForm } from "react-hook-form";

interface IForm {
  checkList: string;
}
const CheckList = () => {
  const [boards, setBoards] = useRecoilState(BoardState);
  const { register, handleSubmit, setFocus } = useForm<IForm>();
  const [toggleAddList, setToggleAddList] = useState(false);

  useEffect(() => {
    setFocus("checkList");
  }, [toggleAddList, setFocus]);
  const onCheckListSubmit = ({ checkList }: IForm) => {
    console.log(checkList);
  };

  const handleAddListState = () => setToggleAddList((prev) => !prev);
  return (
    <CheckWrapper>
      <ContentTitleArea>
        <i>
          <FontAwesomeIcon icon={faListCheck} />
        </i>
        <strong>Checklist</strong>
      </ContentTitleArea>
      <ContentBox>
        {toggleAddList ? (
          <form onSubmit={handleSubmit(onCheckListSubmit)}>
            <CheckListTextArea
              {...register("checkList")}
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
