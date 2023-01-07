import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset};
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
  html,
  body,
  #root {
    font-size: 100%;
    width: 100vw;
    height: 100vh;
    max-width: 1920px;
    overflow-x: hidden;
    font-style: normal;
    font-weight: 400;
    letter-spacing: -0.15px;
    line-height: 1;
  }
  body, input, textarea, select, button, table {
    font-family: "Malgun Gothic", "맑은고딕", sans-serif;
  }
  body {
    -ms-user-select: none;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    font-family: 'Source Sans Pro', sans-serif;
    background-color: ${({ theme }) => theme.bgColor};
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  * {
    box-sizing: border-box;
  }
  button {
    padding: 0;
    margin: 0;
    border: 0;
    outline: 0;
    cursor: pointer;
    background: 0;
}
  input:focus {
    outline: none;
  }
  ul {
    list-style: none;
  }
  label {
    cursor: pointer;
  }
  .a11y-hidden {
     position: absolute;
     clip: rect(0 0 0 0);
     width: 1px;
     height: 1px;
     overflow: hidden;
     margin: -1px;
     border: 0;
     padding: 0;
     white-space: nowrap;
  }
  .label-hidden {
     /* text-indent: 100%; */
     /* white-space: nowrap; */
     color: transparent;
     overflow: hidden;
  }
`;

export default GlobalStyles;
