import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { RawDraftContentState } from "draft-js";

export interface IBoardType {
  contentId: number;
  cardTitle: string;
  value: RawDraftContentState;
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
          cardTitle: "공부",
          value: {
            blocks: [],
            entityMap: {},
          },
          checkList: [],
        },
      ],
    },
    {
      title: "Doing",
      content: [
        {
          contentId: 2,
          cardTitle: "프로젝트 작업",
          value: {
            blocks: [],
            entityMap: {},
          },
          checkList: [],
        },
      ],
    },
    {
      title: "Done",
      content: [
        {
          contentId: 3,
          cardTitle: "운동",
          value: {
            blocks: [],
            entityMap: {},
          },
          checkList: [],
        },
      ],
    },
  ],
  effects_UNSTABLE: [persistAtom],
});
