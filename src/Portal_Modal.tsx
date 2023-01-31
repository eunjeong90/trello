import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface IModalPortal {
  children: ReactNode;
}
const ModalPortal = ({ children }: IModalPortal) => {
  const ref = useRef<Element | null>();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    if (document) {
      const dom = document.getElementById("modal-root");
      ref.current = dom;
    }
  }, []);
  if (ref.current && mounted) {
    return createPortal(
      <div className="modal-container">{children}</div>,
      ref.current
    );
  }
  return null;
};
export default ModalPortal;
