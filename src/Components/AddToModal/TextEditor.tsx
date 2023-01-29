import React, { useState } from "react";
import { convertFromRaw, Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

const TEXT_EDITOR_ITEM = "draft-js-item";

const TextEditor = () => {
  const data = localStorage.getItem(TEXT_EDITOR_ITEM);
  const initialState = data
    ? EditorState.createWithContent(convertFromRaw(JSON.parse(data)))
    : EditorState.createEmpty();
  const [editorState, setEditorState] = useState<EditorState>(initialState);

  return (
    <div
      style={{
        border: "1px solid black",
        minHeight: "6em",
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
  );
};

export default TextEditor;
