import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export interface IBoardType {
  id: number;
  text: string;
}
interface IBoardState {
  [key: string]: IBoardType[];
}
const { persistAtom } = recoilPersist({
  key: "toDoPersist",
  storage: localStorage,
});
export const BoardState = atom<IBoardState>({
  key: "toDo",
  default: {
    "To Do": [],
    Doing: [],
    Done: [],
  },
  effects_UNSTABLE: [persistAtom],
});
