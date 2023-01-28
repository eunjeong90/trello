# `mini project - Trello clone`

## introduction 👩🏻‍💻 
트렐로를 클론코딩한 프로젝트입니다. **[trello](https://eunjeong90.github.io/trello/ "trello link") (https://eunjeong90.github.io/trello)** _****_  
칸반보드인 트렐로는 진행 중인 프로젝트나 일정을 시각화하여 보다 쉽게 흐름을 포착하도록 만들어진 앱입니다. 특히 포스트잇을 떼었다 다시 붙이는 방식에서 착안한 트렐로의 DnD(drag and drop)가 해당 프로젝트의 진행하는 가장 중요한 요소였습니다. DnD는 실제 트렐로 제작사인 Atlassian가 배포한 react-beautiful-dnd를 통해 구현하였고, 각 board에 들어오는 list와 list안의 데이터를 실제 trello와 유사하게 보여질 수 있도록 처리하였습니다. 이를 통해 React에서 불변성을 지키며 데이터를 다루는 것을 학습할 수 있었습니다.  

### Dependencies
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black" /> <img src="https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" /> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"/>  
<img src="https://img.shields.io/badge/Recoil-3577E5?style=for-the-badge&logo=&logoColor=black" /> <img src="https://img.shields.io/badge/reactbeautifuldnd-3DDC84?style=for-the-badge&logo=&logoColor=black" /> <img src="https://img.shields.io/badge/ReactHookForm-EC5990?style=for-the-badge&logo=ReactHookForm&logoColor=white" /> <img src="https://img.shields.io/badge/StyledComponents-DB7093?style=for-the-badge&logo=StyledComponents&logoColor=white" /> 

### structure 🌴 
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
![화면-기록-2023-01-28-오후-7 39 38](https://user-images.githubusercontent.com/89186225/215262450-e39f45f8-5480-488e-803b-3e9a83081a92.gif)
> 해당 클론 프로젝트의 데이터는 localstorage에 저장됩니다. 간단하게 테스트 해보세요!  
> trello의 기본 템플릿과 같이 첫 상태로 board는 'To do', 'Doing', 'Done'의 title을 가지고 있습니다. 해당 title 부분을 클릭하면 원하는 값으로 변경할 수 있으며 삭제도 가능합니다. 모든 board를 삭제하더라도 Add another list를 클릭하여 새로운 board를 추가할 수 있습니다.
