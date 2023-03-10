# `mini project - Trello clone`

### Introduction π©π»βπ» 
νΈλ λ‘λ₯Ό ν΄λ‘ μ½λ©ν νλ‘μ νΈμλλ€. **[trello](https://eunjeong90.github.io/trello/ "trello link") (https://eunjeong90.github.io/trello)**  

μΉΈλ°λ³΄λμΈ νΈλ λ‘λ μ§ν μ€μΈ νλ‘μ νΈλ μΌμ μ μκ°ννμ¬ λ³΄λ€ μ½κ² νλ¦μ ν¬μ°©νλλ‘ λ§λ€μ΄μ§ μ±μλλ€. νΉν ν¬μ€νΈμμ λΌμλ€ λ€μ λΆμ΄λ λ°©μμμ μ°©μν νΈλ λ‘μ DnD(drag and drop)κ° ν΄λΉ νλ‘μ νΈμ μ§ννλ κ°μ₯ μ€μν μμμμ΅λλ€. DnDλ μ€μ  νΈλ λ‘ μ μμ¬μΈ Atlassianκ° λ°°ν¬ν react-beautiful-dndλ₯Ό ν΅ν΄ κ΅¬ννμκ³ , κ° boardμ λ€μ΄μ€λ listμ listμμ λ°μ΄ν°λ₯Ό μ€μ  trelloμ μ μ¬νκ² λ³΄μ¬μ§ μ μλλ‘ μ²λ¦¬νμμ΅λλ€. μ΄λ₯Ό ν΅ν΄ Reactμμ λΆλ³μ±μ μ§ν€λ©° λ°μ΄ν°λ₯Ό λ€λ£¨λ κ²μ νμ΅ν  μ μμμ΅λλ€.  

### Dependencies
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black" /> <img src="https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" /> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"/>  
<img src="https://img.shields.io/badge/Recoil-3577E5?style=for-the-badge&logo=&logoColor=black" /> <img src="https://img.shields.io/badge/reactbeautifuldnd-3DDC84?style=for-the-badge&logo=&logoColor=black" /> <img src="https://img.shields.io/badge/ReactHookForm-EC5990?style=for-the-badge&logo=ReactHookForm&logoColor=white" /> <img src="https://img.shields.io/badge/StyledComponents-DB7093?style=for-the-badge&logo=StyledComponents&logoColor=white" /> 

### Structure π΄ 
    root  
    β£ public  
    β β£ favicon.ico  
    β β£ index.html  
    β β£ logo192.png  
    β β£ logo512.png  
    β β£ manifest.json  
    β β robots.txt  
    β£ src  
    β β£ Components  
    β β β£ AddToModal  
    β β β β CheckList.tsx  
    β β β£ modal  
    β β β β£ CardModal.tsx  
    β β β β HeaderListModal.tsx  
    β β β£ App.tsx  
    β β β£ AppRouter.tsx  
    β β β£ Board.tsx  
    β β β£ BoardHeader.tsx  
    β β β£ Boards.tsx  
    β β β£ CreateBoard.tsx  
    β β β£ DraggableCard.tsx  
    β β β Main.tsx  
    β β£ hook  
    β β β useModal.js  
    β β£ recoil  
    β β β£ modal  
    β β β β£ ModalAtomFamily.js  
    β β β β£ ModalIdAtom.js  
    β β β β ModalSelectorFamily.js  
    β β β BoardState.ts  
    β β£ styles  
    β β β£ GlobalStyles.ts  
    β β β£ shared.ts  
    β β β theme.ts  
    β β£ Portal.tsx  
    β β£ custom.d.ts  
    β β£ index.css  
    β β£ index.tsx  
    β β styled.d.ts  
    β£ .eslintrc.js  
    β£ package-lock.json  
    β£ package.json  
    β£ styled-components.ts  
    β tsconfig.json  

### Main Feature π
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
> νλμ ν° μμ­μΈ boardλΌλ¦¬μ DnD, board μμ λ΄κΈ΄ listλ€μ DnD, κ·Έλ¦¬κ³  μλ‘ λ€λ₯Έ boardμ listλ€μ μμ λ‘­κ² DnD ν  μ μμ΅λλ€.
*****
#### **κ°νΈν μμ±, μμ κ³Ό μ­μ **
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

> ν΄λΉ ν΄λ‘  νλ‘μ νΈμ λ°μ΄ν°λ localstorageμ μ μ₯λ©λλ€. κ°λ¨νκ² νμ€νΈ ν΄λ³΄μΈμ!  
> trelloμ κΈ°λ³Έ ννλ¦Ώκ³Ό κ°μ΄ μ²« μνλ‘ boardλ 'To do', 'Doing', 'Done'μ titleμ κ°μ§κ³  μμ΅λλ€. ν΄λΉ title λΆλΆμ ν΄λ¦­νλ©΄ μνλ κ°μΌλ‘ λ³κ²½ν  μ μμΌλ©° μ­μ λ κ°λ₯ν©λλ€. λͺ¨λ  boardλ₯Ό μ­μ νλλΌλ Add another listλ₯Ό ν΄λ¦­νμ¬ μλ‘μ΄ boardλ₯Ό μΆκ°ν  μ μμ΅λλ€.

*****
#### **listμ λΆκ° κΈ°λ₯**
* **rich text editor**
![ezgif com-gif-maker-_3_](https://user-images.githubusercontent.com/89186225/215447225-76d54c73-4da5-49ba-ba70-1eed2e73f072.gif)
> κ° listλ₯Ό ν΄λ¦­μ ν΄λΉ listμ contentλ₯Ό κΎΈλ©° μ€ λΆκ° κΈ°λ₯μ΄ λ΄κΈ΄ λͺ¨λ¬μ΄ λΉλλ€. 
> `description`λ ν΄λΉ listλ₯Ό μ€λͺν  μ μλ rich text editorκ° μ μ©λμ΄ μμ΅λλ€. ν΄λΉ λΌμ΄λΈλ¬λ¦¬λ draft-jsλ₯Ό μ¬μ©νμΌλ©°, reactμ λ§μΆ° controlled componentμΌλ‘ λ§λ€μ΄μ Έ μ ννμ΅λλ€. draftλ ν¨κ» μ¬μ©ν  μ μλ νλ¬κ·ΈμΈμ΄ λ§μλλ°, μ΄νμ νλ¬κ·ΈμΈμ μ¬μ©νλλΌλ μ΄λ€ μμΌλ‘ μλνλμ§ μ΄ν΄νκΈ° μν΄ κΈ°λ³Έ λ©μλλ‘ μμνμ΅λλ€. rich text editorμ κ°μ₯ κΈ°λ³Έμ μΈ κΈ°λ₯μ μ κ³΅νκ³  μκΈ° λλ¬Έμ μ΄νμ μ΄λ―Έμ§λ λ―Έλμ΄ λ±μ μΆκ°ν  μ μλλ‘ ν  μμ μλλ€. 

* **checklist**
![ezgif com-gif-maker-_2_](https://user-images.githubusercontent.com/89186225/215454763-cd55843c-0932-4b89-92f2-954efd842a06.gif)
> `checklist`μμλ ν΄λΉ μ£Όμ μ μ°κ΄λ λ¦¬μ€νΈλ₯Ό λ§λ€μ΄ μλ£μ μ²΄ν¬ν  μ μμ΅λλ€. list modal μμ μ€ μ μΌ λ¨Όμ  μμνλλ°, μκ°λ³΄λ€ λ§μ΄ μ λ₯Ό λ¨Ήμλ κΈ°λ₯μλλ€. 
> λͺ¨λ  λ°μ΄ν° μνλ recoil atomμΌλ‘ λ§λ€μ΄ λμ boardStateμμ λ³κ²½λλλ°, reactμ λ°μ΄ν° λΆλ³μ±μ μν΄ μ΄μ  μνλ₯Ό λ³΅μ¬ν ν μΆκ° κΈ°λ₯ μμμ μμν©λλ€. spread operatorμ 1depth μ΄μμμλ κΉμ λ³΅μ¬λ₯Ό ν΄μ£Όμ§ λͺ»ν΄ μλ¬κ° λ΄κ³ , κΉμ λ³΅μ¬λ₯Ό ν μ΄νμ λ³κ²½μ΄ κ°λ₯νμ΅λλ€. JSON.parse, JSON.stringifyλ₯Ό μ΄μ©ν΄ κΉμ λ³΅μ¬ μ΄ν λ€μ μμμ΄ κ°λ₯ν΄μ‘μ§λ§, ν΄λΉ λ³΅μ¬ κ³Όμ μ κ±°μΉλ©΄ κΈ°μ‘΄ μνμ μλ typeμ΄ μ λΆ μ¬λΌμ§κ³  any νμμΌλ‘ λ³ννκΈ° λλ¬Έμ λ μμ ν λ°©μμΌλ‘ λ¦¬ν©ν λ§ ν  μμ μλλ€.

*****
κ³μ μλ°μ΄νΈ λ©λλ€ π
