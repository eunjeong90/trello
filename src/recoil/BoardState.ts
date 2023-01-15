import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export interface IBoardType {
  contentId: number;
  value: string;
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
          contentId: 1,
          value: "study",
        },
      ],
    },
    {
      title: "Doing",
      content: [
        {
          contentId: 2,
          value: "someting",
        },
      ],
    },
    {
      title: "Done",
      content: [
        {
          contentId: 3,
          value: "eat",
        },
      ],
    },
  ],
  effects_UNSTABLE: [persistAtom],
});
