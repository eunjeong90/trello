import { selectorFamily } from "recoil";
import { ModalAtomFamily } from "./ModalAtomFamily";
import { ModalIdAtom } from "./ModalIdAtom";

export const ModalSelectorFamily = selectorFamily({
  key: "ModalSelectorFamily",
  get:
    (modalId) =>
    ({ get }) =>
      get(ModalAtomFamily(modalId)),

  set:
    (modalId) =>
    ({ get, set, reset }, modalInfo) => {
      set(ModalAtomFamily(modalId), modalInfo);
      set(ModalIdAtom, (prev) => Array.from(new Set([...prev, modalInfo.id])));
    },
});
