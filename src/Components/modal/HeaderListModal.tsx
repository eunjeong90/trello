import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export interface IList {
  handleBoardRemove: () => void;
  handleAllCardRemove: () => void;
  isHideModal: () => void;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeaderListModal = ({
  handleBoardRemove,
  handleAllCardRemove,
  isHideModal,
  setToggle,
}: IList) => {
  const handleClose = () => {
    setToggle(false);
    isHideModal();
  };
  return (
    <BoardPopUp>
      <div>
        <PopHeader>
          <span>List actions</span>
          <i role="presentation" onClick={handleClose}>
            <FontAwesomeIcon icon={faXmark} />
          </i>
        </PopHeader>
        <div>
          <PopContent>
            <ul>
              <li>
                <span role="presentation" onClick={() => handleAllCardRemove()}>
                  Archive all cards in this list...
                </span>
              </li>
            </ul>
            <hr />
            <ul>
              <li>
                <span role="presentation" onClick={() => handleBoardRemove()}>
                  Archive this list
                </span>
              </li>
            </ul>
          </PopContent>
        </div>
      </div>
    </BoardPopUp>
  );
};

export default HeaderListModal;

const BoardPopUp = styled.div`
  cursor: default;
  overflow: hidden;
  background-color: ${({ theme }) => theme.cardColor};
  position: absolute;
  left: 230px;
  right: 0;
  width: 304px;
  top: 40px;
  z-index: 100;
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
`;
const PopHeader = styled.div`
  height: 40px;
  margin-bottom: 8px;
  position: relative;
  text-align: center;
  color: #9aa3b3;
  span {
    border-bottom: 1px solid #091e4221;
    box-sizing: border-box;
    display: block;
    line-height: 40px;
    margin: 0 12px;
    overflow: hidden;
    padding: 0 32px;
    position: relative;
    text-overflow: ellipsis;
    white-space: nowrap;
    z-index: 1;
  }
  i {
    cursor: pointer;
    padding: 10px 12px 10px 8px;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 2;
    &:hover svg {
      color: #7a818f;
    }
  }
`;
const PopContent = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0 12px 12px;
  max-height: 714px;
  span {
    cursor: pointer;
    display: block;
    font-weight: 400;
    margin: 0 -12px;
    padding: 6px 12px;
    position: relative;
    text-decoration: none;
    &:hover {
      background-color: #091e420a;
    }
  }
  hr {
    border: 0;
    height: 1px;
    padding: 0;
    width: 100%;
    margin: 8px 0;
    background-color: #091e4221;
  }
`;
