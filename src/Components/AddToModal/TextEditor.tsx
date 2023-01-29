import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { BoardState } from "recoil/BoardState";
import { convertFromRaw, convertToRaw, Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import { IBoard } from "Components/Board";
interface ICardProps extends IBoard {
  cardIndex: number;
}

const TextEditor = ({ boardIndex, cardIndex }: ICardProps) => {
  const [boards, setBoards] = useRecoilState(BoardState);
  const { value: data } = boards[boardIndex].content[cardIndex];
  const initialState = data
    ? EditorState.createWithContent(convertFromRaw(data))
    : EditorState.createEmpty();
  const [editorState, setEditorState] = useState<EditorState>(initialState);

  const onTextSubmit = () => {
    const conversionData = convertToRaw(editorState.getCurrentContent());
    setBoards((allBoards) => {
      const deepCopy = JSON.parse(JSON.stringify(allBoards));
      const targetBoardContent = deepCopy[boardIndex].content;
      const { value, ...rest } = targetBoardContent[cardIndex];
      targetBoardContent[cardIndex] = {
        ...rest,
        value: conversionData,
      };
      return [...deepCopy];
    });
  };
  return (
    <>
      <div
        style={{
          border: "1px solid black",
          minHeight: "200px",
          cursor: "text",
        }}
        role="presentation"
      >
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          placeholder="Write something!"
        />
      </div>
      <input type="submit" value="save" onClick={onTextSubmit} />
    </>
  );
};

export default TextEditor;
