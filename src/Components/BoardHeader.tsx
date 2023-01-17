import { useForm } from "react-hook-form";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { Title } from "styles/shared";
import { BoardState } from "recoil/BoardState";
import { useSetRecoilState } from "recoil";
import { IBoard } from "./Board";
import { useRef } from "react";

interface IForm {
  title: string;
}
const BoardHeader = ({ boardTitle, boardIndex }: IBoard) => {
  const setBoards = useSetRecoilState(BoardState);
  const titleRef = useRef<HTMLTextAreaElement | null>(null);
  const { handleSubmit, register, setFocus } = useForm<IForm>({
    defaultValues: { title: boardTitle },
  });
  const { ref } = register("title");
  console.log(register("title"));
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
  const onClick = () => {
    setFocus("title");
    titleRef.current?.select();
  };
  return (
    <Header onSubmit={handleSubmit(onRenameTitleSubmit)}>
      <TargetArea onClick={onClick} />
      <Title
        {...register("title", {
          required: true,
        })}
        ref={(e) => {
          ref(e);
          titleRef.current = e;
        }}
        onKeyDown={handleBoardTitleKeyPress}
      >
        {boardTitle}
      </Title>
      <HeaderListIconBox>
        <div>
          <FontAwesomeIcon icon={faEllipsis} />
        </div>
      </HeaderListIconBox>
    </Header>
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
  div {
    padding: 6px;
    line-height: 20px;
  }
`;
