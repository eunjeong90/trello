import { useCallback, useState, useRef, useEffect } from "react";

import { useRecoilState } from "recoil";
import { ModalSelectorFamily } from "recoil/modal/ModalSelectorFamily";

const useModal = (modalId) => {
  const [modal, setModal] = useRecoilState(ModalSelectorFamily(modalId));
  const [outside, setOutSide] = useState(false);

  const WrapperEl = useRef();

  const isOpenModal = useCallback(() => {
    setModal((current) => ({ ...current, isOpen: true }));
  }, []);
  const isHideModal = () => {
    setModal((current) => ({ ...current, isOpen: false }));
  };
  return { WrapperEl, modal, setModal, isOpenModal, isHideModal };
};

export default useModal;
