import React, { Dispatch, MouseEvent, SetStateAction, useEffect } from "react";
import ModalStyles from "../styles/Modal.module.scss";
import { useRouter } from "next/router";

interface IModal {
  returnURL: string;
  shouldCloseModal: boolean;
  //   setOpenModal: Dispatch<SetStateAction<boolean>>;
  children: JSX.Element;
}

const Modal = ({ returnURL, shouldCloseModal, children }: IModal) => {
  const router = useRouter();

  useEffect(() => {
    if (shouldCloseModal) {
      router.push(returnURL);
    }
  }, [shouldCloseModal]);

  const closeModal = (event: MouseEvent<HTMLDivElement>): void => {
    const classList = (event.target as HTMLDivElement).classList;
    if (classList.contains("modal")) router.push(returnURL);
  };

  return (
    <div className="modal" onClick={closeModal}>
      <div className="modal-main">{children}</div>
    </div>
  );
};

export default Modal;
