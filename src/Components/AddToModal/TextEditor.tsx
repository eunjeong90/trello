import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { BoardState } from "recoil/BoardState";
import {
  ContentState,
  convertFromRaw,
  convertToRaw,
  Editor,
  EditorState,
  RawDraftContentState,
  RichUtils,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { IBoard } from "Components/Board";
import styled from "styled-components";
interface ICardProps extends IBoard {
  cardIndex: number;
}

const BLOCK_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" },
];
const INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Monospace", style: "CODE" },
];

const TextEditor = ({ boardIndex, cardIndex }: ICardProps) => {
  const [boards, setBoards] = useRecoilState(BoardState);
  const { value: data } = boards[boardIndex].content[cardIndex];
  const initialState = data
    ? EditorState.createWithContent(convertFromRaw(data))
    : EditorState.createEmpty();
  const [editorState, setEditorState] = useState<EditorState>(initialState);
  const [isEmpty, setIsEmpty] = useState<boolean>(
    data.blocks.length === 0 && false
  );
  const [addText, setAddText] = useState(false);
  const editorRef = useRef<Editor>(null);

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
    setAddText(false);
  };
  const handleTextUndo = () => {
    if (data.blocks.length === 0) {
      setIsEmpty(false);
    }
    setEditorState(EditorState.undo(editorState));
    setAddText(false);
  };

  const handleAddTextToggle = () => {
    if (data.blocks.length === 0) {
      setIsEmpty(true);
    }
    editorRef.current?.focus();
    setAddText(true);
  };
  const handleBlockClick = (blockType: string) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };
  const handleInlineClick = (blockType: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, blockType));
  };
  const handleToolToggle = (
    e: React.MouseEvent,
    type: string,
    style: string
  ) => {
    e.preventDefault();
    if (type === "BLOCK") {
      handleBlockClick(style);
    } else {
      handleInlineClick(style);
    }
  };

  return (
    <DescriptionWrap>
      {data.blocks.length === 0 && !isEmpty ? (
        <EmptyDescription onClick={handleAddTextToggle}>
          <p>Add a more detailed description…</p>
        </EmptyDescription>
      ) : (
        <>
          <EditorWrap
            addText={addText}
            onClick={handleAddTextToggle}
            role="presentation"
          >
            {addText && (
              <ToolBar>
                {BLOCK_TYPES.map((type) => (
                  <button
                    key={type.label}
                    onMouseDown={(e) =>
                      handleToolToggle(e, "BLOCK", type.style)
                    }
                  >
                    {type.label}
                  </button>
                ))}
                {INLINE_STYLES.map((type) => (
                  <button
                    key={type.label}
                    onMouseDown={(e) =>
                      handleToolToggle(e, "INLINE", type.style)
                    }
                  >
                    {type.label}
                  </button>
                ))}
              </ToolBar>
            )}
            <Editor
              ref={editorRef}
              editorState={editorState}
              onChange={setEditorState}
            />
          </EditorWrap>
          {addText && (
            <ButtonArea>
              <input type="submit" value="Save" onClick={onTextSubmit} />
              <button type="button" onClick={handleTextUndo}>
                Cancel
              </button>
            </ButtonArea>
          )}
        </>
      )}
    </DescriptionWrap>
  );
};

export default TextEditor;

const DescriptionWrap = styled.div`
  margin-left: 40px;
`;
const EmptyDescription = styled.div`
  cursor: pointer;
  > p {
    background-color: #091e420a;
    min-height: 60px;
    padding: 15px 12px;
    text-decoration: none;
  }
`;
const EditorWrap = styled.div<{ addText: boolean }>`
  box-shadow: ${({ addText }) => addText && "0 0 0 2px inset #0079BF"};
  background-color: ${({ addText }) => addText && "#ffffff"};
  cursor: ${({ addText }) => (addText ? "text" : "pointer")};
  padding: 2px;
  height: auto;
  min-height: 70px;
  border-radius: 3px;
  .DraftEditor-editorContainer {
    line-height: 24px;
    padding: ${({ addText }) => (addText ? "20px" : "20px 2px")};
  }
  .DraftEditor-editorContainer .public-DraftEditor-content h1 {
    font-size: 2em !important;
    font-weight: bolder !important;
  }

  .DraftEditor-editorContainer .public-DraftEditor-content h2 {
    font-weight: bolder !important;
    font-size: 1.7em !important;
  }

  .DraftEditor-editorContainer .public-DraftEditor-content h3 {
    font-weight: bolder !important;
    font-size: 1.5em !important;
  }

  .DraftEditor-editorContainer .public-DraftEditor-content h4 {
    font-size: 1em !important;
    font-weight: bolder !important;
  }

  .DraftEditor-editorContainer .public-DraftEditor-content h5 {
    font-size: 0.83em !important;
    font-weight: bolder !important;
  }

  .DraftEditor-editorContainer .public-DraftEditor-content h6 {
    font-size: 0.67em !important;
    font-weight: bolder !important;
  }
`;
const ToolBar = styled.div`
  box-shadow: 0 2px 0 0 #ebecf0;
  padding: 8px 8px 8px 20px;
  position: sticky;
  top: 0;
  button {
    font-weight: 700;
    font-size: 16px;
    padding: 5px;
  }
`;
const ButtonArea = styled.div`
  margin-top: 8px;
  input[type="submit"] {
    margin: 0 4px 0 0;
    border: none;
    border-radius: 3px;
    box-shadow: none;
    box-sizing: border-box;
    cursor: pointer;
    display: inline-flex;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    padding: 6px 12px;
    background-color: #0079bf;
    color: #ffffff;
  }
  button[type="button"] {
    border: none;
    border-radius: 3px;
    box-shadow: none;
    box-sizing: border-box;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    padding: 6px 12px;
    transition-duration: 85ms;
    transition-property: background-color, border-color, box-shadow;
    transition-timing-function: ease;
    white-space: normal;
    &:hover {
      background-color: #091e420a;
    }
  }
`;
