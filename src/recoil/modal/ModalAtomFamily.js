import { atomFamily } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "ModalAtomFamilyPersist",
  storage: localStorage,
});

export const ModalAtomFamily = atomFamily({
  key: "ModalAtomFamily",
  default: (modalId) => ({
    modalId,
    isOpen: false,
    title: "",
    content: "",
    selectOption: "",
  }),
  effects_UNSTABLE: [persistAtom],
});
