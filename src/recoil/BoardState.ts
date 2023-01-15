import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export interface IBoardType {
  contentId: number;
  value: string[];
}
interface IBoardState {
  title: string;
  content: IBoardType[];
}
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
          contentId: Date.now(),
          value: [],
        },
      ],
    },
    {
      title: "Doing",
      content: [
        {
          contentId: Date.now(),
          value: [],
        },
      ],
    },
    {
      title: "Done",
      content: [
        {
          contentId: Date.now(),
          value: [],
        },
      ],
    },
  ],
  effects_UNSTABLE: [persistAtom],
});
