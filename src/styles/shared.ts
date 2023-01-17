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
