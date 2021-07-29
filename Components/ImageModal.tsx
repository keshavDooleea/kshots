import React, { ChangeEvent, Dispatch, MouseEvent, SetStateAction, useState } from "react";
import { getDecodedBase64 } from "../utils/lib/config";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IModal {
  src: string;
  setShouldEnlarge: Dispatch<SetStateAction<boolean>>;
  resetURL: () => void;
}

const ImageModal = ({ src, setShouldEnlarge, resetURL }: IModal) => {
  const [sliderVal, setSliderValue] = useState<string>("1");

  const closeModal = () => {
    setShouldEnlarge(false);
    resetURL();
  };

  const onModalClicked = (event: MouseEvent<HTMLDivElement>): void => {
    const classList = (event.target as HTMLDivElement).classList;
    if (classList.contains("top") || classList.contains("bottom")) {
      closeModal();
    }
  };

  const changeSlider = (event: ChangeEvent<HTMLInputElement>) => {
    setSliderValue(event.target.value);
  };

  return (
    <div className="modal image-modal" onClick={onModalClicked}>
      <div className="top">
        <span></span>
        <input type="range" id="slider" min="-0.5" max="2.5" step="0.1" value={sliderVal} onChange={changeSlider} />
        <div className="close" onClick={closeModal}>
          <div>
            <FontAwesomeIcon className="icon" icon={faTimes} />
          </div>
        </div>
      </div>

      <div className="bottom">
        <img src={getDecodedBase64(src)} alt="Enlarged modal image" style={{ transform: `scale(${sliderVal})` }} />
      </div>
    </div>
  );
};

export default ImageModal;
