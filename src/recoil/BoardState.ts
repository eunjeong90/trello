import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export interface IBoardType {
  contentId: number;
  cardTitle: string;
  value: string;
  checkList: ICheckListType[];
}
export interface ICheckListType {
  checkId: number;
  value: string;
  state: boolean;
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
          checkList: [],
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
          checkList: [],
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
          checkList: [],
        },
      ],
    },
  ],
  effects_UNSTABLE: [persistAtom],
});
