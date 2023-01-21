import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { BoardState } from "recoil/BoardState";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Title } from "styles/shared";
interface IForm {
  createBoard: string;
}

const CreateBoard = () => {
  const setBoards = useSetRecoilState(BoardState);
  const { register, handleSubmit, setValue, setFocus } = useForm<IForm>({
    defaultValues: { createBoard: "" },
  });
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    setFocus("createBoard");
  }, [setFocus, toggle]);

  const onSubmitNewBoard: SubmitHandler<IForm> = ({ createBoard }: IForm) => {
    setBoards((prevBoard) => {
      const copyBoard = [...prevBoard];
      const newBoard = {
        title: createBoard,
        content: [],
      };
      return [...copyBoard, newBoard];
    });
    setValue("createBoard", "");
  };
  const handleFormStateToggle = () => setToggle((prev) => !prev);
  return (
    <CreateBox>
      {toggle ? (
        <InputStateForm onSubmit={handleSubmit(onSubmitNewBoard)}>
          <Title
            as="input"
            {...register("createBoard", {
              required: true,
              maxLength: 20,
              minLength: 1,
            })}
            type="text"
            placeholder="Enter list title..."
          />
          <div>
            <input type="submit" value="Add list" />
            <i role="presentation" onClick={handleFormStateToggle}>
              <FontAwesomeIcon icon={faXmark} />
            </i>
          </div>
        </InputStateForm>
      ) : (
        <TextState onClick={handleFormStateToggle}>
          <strong>
            <i>&#43;</i>
            Add another list
          </strong>
        </TextState>
      )}
    </CreateBox>
  );
};

export default CreateBoard;

const CreateBox = styled.div`
  width: 272px;
  flex-shrink: 0;
  background-color: #ebecf08f;
  border-radius: 3px;
  min-height: 40px;
  height: fit-content;
  padding: 4px 0;
  transition: background 85ms ease-in, opacity 40ms ease-in,
    border-color 85ms ease-in;
`;
const InputStateForm = styled.form`
  padding: 4px;
  form {
    padding: 4px 0px;
  }
  input[type="text"] {
    width: 100%;
    padding: 8px 12px;
    outline: none;
    line-height: 20px;
    height: 36px;
    font-size: 14px;
    background-color: white;
  }
  input[type="submit"] {
    font-size: 16px;
    height: 32px;
    outline: none;
    line-height: 20px;
    padding: 6px 12px;
    padding-bottom: 4px;
    padding-top: 4px;
    margin-right: 3px;
    color: white;
    border-radius: 3px;
    border: none;
    background-color: ${({ theme }) => theme.bgColor};
    cursor: pointer;
  }
  div {
    height: 32px;
    margin: 9px 0 0;
    overflow: hidden;
  }
  i {
    height: 32px;
    line-height: 32px;
    width: 32px;
    display: inline-block;
    text-align: center;
    cursor: pointer;
  }
  svg {
    vertical-align: middle;
    height: 1.3em;
  }
`;
const TextState = styled.div`
  padding: 6px 8px;
  cursor: pointer;
  strong {
    color: white;
    font-size: 16px;
    i {
      margin-right: 2px;
      font-size: 25px;
      height: 25px;
      line-height: 25px;
      width: 25px;
      text-align: center;
      display: inline-block;
      vertical-align: middle;
    }
  }
`;
