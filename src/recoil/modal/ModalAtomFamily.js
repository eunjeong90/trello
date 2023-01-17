import { atomFamily } from "recoil";

export const ModalAtomFamily = atomFamily({
  key: "ModalAtomFamily",
  default: (modalId) => ({
    modalId,
    isOpen: false,
    title: "",
    content: "",
    selectOption: "",
  }),
});
