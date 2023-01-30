# `mini project - Trello clone`

### Introduction 👩🏻‍💻 
트렐로를 클론코딩한 프로젝트입니다. **[trello](https://eunjeong90.github.io/trello/ "trello link") (https://eunjeong90.github.io/trello)**  

칸반보드인 트렐로는 진행 중인 프로젝트나 일정을 시각화하여 보다 쉽게 흐름을 포착하도록 만들어진 앱입니다. 특히 포스트잇을 떼었다 다시 붙이는 방식에서 착안한 트렐로의 DnD(drag and drop)가 해당 프로젝트의 진행하는 가장 중요한 요소였습니다. DnD는 실제 트렐로 제작사인 Atlassian가 배포한 react-beautiful-dnd를 통해 구현하였고, 각 board에 들어오는 list와 list안의 데이터를 실제 trello와 유사하게 보여질 수 있도록 처리하였습니다. 이를 통해 React에서 불변성을 지키며 데이터를 다루는 것을 학습할 수 있었습니다.  

### Dependencies
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black" /> <img src="https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" /> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"/>  
<img src="https://img.shields.io/badge/Recoil-3577E5?style=for-the-badge&logo=&logoColor=black" /> <img src="https://img.shields.io/badge/reactbeautifuldnd-3DDC84?style=for-the-badge&logo=&logoColor=black" /> <img src="https://img.shields.io/badge/ReactHookForm-EC5990?style=for-the-badge&logo=ReactHookForm&logoColor=white" /> <img src="https://img.shields.io/badge/StyledComponents-DB7093?style=for-the-badge&logo=StyledComponents&logoColor=white" /> 

### Structure 🌴 
    root  
    ┣ public  
    ┃ ┣ favicon.ico  
    ┃ ┣ index.html  
    ┃ ┣ logo192.png  
    ┃ ┣ logo512.png  
    ┃ ┣ manifest.json  
    ┃ ┗ robots.txt  
    ┣ src  
    ┃ ┣ Components  
    ┃ ┃ ┣ AddToModal  
    ┃ ┃ ┃ ┗ CheckList.tsx  
    ┃ ┃ ┣ modal  
    ┃ ┃ ┃ ┣ CardModal.tsx  
    ┃ ┃ ┃ ┗ HeaderListModal.tsx  
    ┃ ┃ ┣ App.tsx  
    ┃ ┃ ┣ AppRouter.tsx  
    ┃ ┃ ┣ Board.tsx  
    ┃ ┃ ┣ BoardHeader.tsx  
    ┃ ┃ ┣ Boards.tsx  
    ┃ ┃ ┣ CreateBoard.tsx  
    ┃ ┃ ┣ DraggableCard.tsx  
    ┃ ┃ ┗ Main.tsx  
    ┃ ┣ hook  
    ┃ ┃ ┗ useModal.js  
    ┃ ┣ recoil  
    ┃ ┃ ┣ modal  
    ┃ ┃ ┃ ┣ ModalAtomFamily.js  
    ┃ ┃ ┃ ┣ ModalIdAtom.js  
    ┃ ┃ ┃ ┗ ModalSelectorFamily.js  
    ┃ ┃ ┗ BoardState.ts  
    ┃ ┣ styles  
    ┃ ┃ ┣ GlobalStyles.ts  
    ┃ ┃ ┣ shared.ts  
    ┃ ┃ ┗ theme.ts  
    ┃ ┣ Portal.tsx  
    ┃ ┣ custom.d.ts  
    ┃ ┣ index.css  
    ┃ ┣ index.tsx  
    ┃ ┗ styled.d.ts  
    ┣ .eslintrc.js  
    ┣ package-lock.json  
    ┣ package.json  
    ┣ styled-components.ts  
    ┗ tsconfig.json  

### Main Feature 👀
*****
#### **Drag and Drop**
![ezgif com-gif-maker-_1_](https://user-images.githubusercontent.com/89186225/215263655-d71716f1-4cbe-4191-a076-c295f3eb323b.gif)
`src/components/Main.tsx`
    
    const setBoards = useSetRecoilState(BoardState);

    const onDragEnd = (info: DropResult) => {
      const {
        source: { droppableId: startBoardId, index: startIndex },
        destination: endBoard,
        type,
      } = info;
      const sameBoard = endBoard?.droppableId === startBoardId;
      const otherBoard = endBoard?.droppableId !== startBoardId;

      if (!endBoard) return;
      if (type === "BOARD") {
        setBoards((allBoards) => {
          const boardCopy = [...allBoards];
          const targetIndex = boardCopy[startIndex];
          boardCopy.splice(startIndex, 1);
          boardCopy.splice(endBoard.index, 0, targetIndex);
          return boardCopy;
        });
      }
      switch (type === "CARD") {
        case sameBoard:
          setBoards((allBoards) => {
            const boardCopy = [...allBoards];
            const targetIndex = boardCopy.findIndex(
              ({ title }) => title === startBoardId
            );
            const targetCards = [...boardCopy[targetIndex].content];
            const targetCard = targetCards[startIndex];
            const [removed] = targetCards.splice(startIndex, 1);
            targetCards.splice(endBoard?.index, 0, targetCard);
            boardCopy[targetIndex] = {
              title: startBoardId,
              content: [...targetCards],
            };
            return [...boardCopy];
          });
          break;
        case otherBoard:
          setBoards((allBoards) => {
            const boardCopy = [...allBoards];

            const firstIndex = boardCopy.findIndex(
              ({ title }) => title === startBoardId
            );
            const firstBoard = [...boardCopy[firstIndex].content];
            const firstCard = firstBoard[startIndex];

            const finishedIndex = boardCopy.findIndex(
              ({ title }) => title === endBoard.droppableId
            );
            const finishedBoard = [...boardCopy[finishedIndex].content];
            firstBoard.splice(startIndex, 1);
            finishedBoard.splice(endBoard.index, 0, firstCard);
            
            boardCopy[firstIndex] = {
              title: startBoardId,
              content: [...firstBoard],
            };
            boardCopy[finishedIndex] = {
              title: endBoard.droppableId,
              content: [...finishedBoard],
            };
            return [...boardCopy];
          });
          break;
      }
    };
> 하나의 큰 영역인 board끼리의 DnD, board 안에 담긴 list들의 DnD, 그리고 서로 다른 board의 list들을 자유롭게 DnD 할 수 있습니다.
*****
#### **간편한 생성, 수정과 삭제**
![ezgif com-gif-maker](https://user-images.githubusercontent.com/89186225/215263047-65e72577-f193-460f-a03f-66a709c04cfd.gif)
`src/recoil/BoardsState.ts`

    import { recoilPersist } from "recoil-persist";

    const { persistAtom } = recoilPersist({
      key: "boardsPersist",
      storage: localStorage,
    });
    export const BoardState = atom<Array<IBoardState>>({
      key: "boards",
      default: [
        {
          title: "To Do",
          content: [
            {
              contentId: 1,
              cardTitle: "study",
              value: "",
              checkList: [],
            },
          ],
        },
        ...
      effects_UNSTABLE: [persistAtom],
    });

> 해당 클론 프로젝트의 데이터는 localstorage에 저장됩니다. 간단하게 테스트 해보세요!  
> trello의 기본 템플릿과 같이 첫 상태로 board는 'To do', 'Doing', 'Done'의 title을 가지고 있습니다. 해당 title 부분을 클릭하면 원하는 값으로 변경할 수 있으며 삭제도 가능합니다. 모든 board를 삭제하더라도 Add another list를 클릭하여 새로운 board를 추가할 수 있습니다.

*****
#### **list의 부가 기능**
* **rich text editor**
![ezgif com-gif-maker-_3_](https://user-images.githubusercontent.com/89186225/215447225-76d54c73-4da5-49ba-ba70-1eed2e73f072.gif)
> 각 list를 클릭시 해당 list의 content를 꾸며 줄 부가 기능이 담긴 모달이 뜹니다. 
> `description`는 해당 list를 설명할 수 있는 rich text editor가 적용되어 있습니다. 해당 라이브러리는 draft-js를 사용했으며, react에 맞춰 controlled component으로 만들어져 선택했습니다. draft는 함께 사용할 수 있는 플러그인이 많았는데, 이후에 플러그인을 사용하더라도 어떤 식으로 작동하는지 이해하기 위해 기본 메소드로 작업했습니다. rich text editor의 가장 기본적인 기능을 제공하고 있기 때문에 이후에 이미지나 미디어 등을 추가할 수 있도록 할 예정입니다. 

* **checklist**
![ezgif com-gif-maker-_2_](https://user-images.githubusercontent.com/89186225/215454763-cd55843c-0932-4b89-92f2-954efd842a06.gif)
> `checklist`에서는 해당 주제와 연관된 리스트를 만들어 완료시 체크할 수 있습니다. list modal 작업 중 제일 먼저 시작했는데, 생각보다 많이 애를 먹었던 기능입니다. 
> 모든 데이터 상태는 recoil atom으로 만들어 놓은 boardState에서 변경되는데, react의 데이터 불변성을 위해 이전 상태를 복사한 후 추가 기능 작업을 시작합니다. spread operator은 1depth 이상에서는 깊은 복사를 해주지 못해 에러가 떴고, 깊은 복사를 한 이후에 변경이 가능했습니다. JSON.parse, JSON.stringify를 이용해 깊은 복사 이후 다시 작업이 가능해졌지만, 해당 복사 과정을 거치면 기존 상태에 있던 type이 전부 사라지고 any 타입으로 변화하기 때문에 더 안전한 방식으로 리팩토링 할 예정입니다.

*****
계속 업데이트 됩니다 😎
