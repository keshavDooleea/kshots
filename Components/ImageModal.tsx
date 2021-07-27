import React, { Dispatch, MouseEvent, SetStateAction } from "react";
import { getDecodedBase64 } from "../utils/lib/config";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IModal {
  src: string;
  setShouldEnlarge: Dispatch<SetStateAction<boolean>>;
  resetURL: () => void;
}

const ImageModal = ({ src, setShouldEnlarge, resetURL }: IModal) => {
  const closeModal = () => {
    setShouldEnlarge(false);
    resetURL();
  };

  const onModalClicked = (event: MouseEvent<HTMLDivElement>): void => {
    const classList = (event.target as HTMLDivElement).classList;
    if (classList.contains("image-modal")) {
      closeModal();
    }
  };

  return (
    <div className="modal image-modal" onClick={onModalClicked}>
      <img src={getDecodedBase64(src)} alt="Enlarged modal image" />
      <div className="close" onClick={closeModal}>
        <div>
          <FontAwesomeIcon className="icon" icon={faTimes} />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
