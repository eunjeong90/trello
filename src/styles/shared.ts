import styled from "styled-components";

export const TextArea = styled.textarea`
  border-radius: 3px;
  box-shadow: none;
  font-weight: 600;
  height: 28px;
  margin: -4px 0;
  max-height: 256px;
  min-height: 20px;
  padding: 10px 8px;
  overflow: hidden;
  resize: none;
  outline: none;
  border: none;
`;
export const Title = styled(TextArea)`
  font-size: 16px;
  overflow: hidden;
  overflow-wrap: break-word;
  background: #0000;
  border-radius: 3px;
  box-shadow: none;
  font-weight: 600;
  height: 28px;
  margin: -4px 0;
  max-height: 256px;
  min-height: 20px;
  width: 100%;
  padding: 4px 8px;
  &:focus {
    box-shadow: inset 0 0 0 2px #0079bf;
    background: #ffffff;
  }
`;
export const BoardAddTitle = styled(Title);
export const CardTitle = styled(Title)`
  font-size: 20px;
  font-weight: 600;
  height: 32px;
  line-height: 24px;
  margin: -4px -8px;
  min-height: 24px;
  padding: 4px 8px;
`;
