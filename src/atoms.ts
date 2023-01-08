import { atom, selector } from "recoil";

interface ITodoState {
  [key: string]: string[];
}
export const toDoState = atom<ITodoState>({
  key: "toDo",
  default: {
    "To Do": ["a", "b"],
    Doing: ["c", "d", "e"],
    Done: ["f"],
  },
});

// export const toDoSelector = selector<[]>({
//   key: "toDoSelect",
//   get: ({ get }) => {
//     const toDo = get(toDoState);
//     return console.log(toDo);
//   },
//   set: ({ set }, list, startIndex, endIndex) => {
//     const toDo = list;
//     const [removed] = toDo.splice(startIndex, 1);
//     toDo.splice(endIndex, 0, toDo);
//     set(toDo);
//   },
// });
