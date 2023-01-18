import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export interface IBoardType {
  contentId: number;
  cardTitle: string;
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
          cardTitle: "study",
          value: "",
        },
      ],
    },
    {
      title: "Doing",
      content: [
        {
          contentId: 2,
          cardTitle: "someting",
          value: "",
        },
      ],
    },
    {
      title: "Done",
      content: [
        {
          contentId: 3,
          cardTitle: "eat",
          value: "",
        },
      ],
    },
  ],
  effects_UNSTABLE: [persistAtom],
});
