import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";
import { COLORS } from "../utils/lib/config";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

interface IColorProps {
  selectedColor: string;
  setSelectedColor: Dispatch<SetStateAction<string>>;
}

const Colors = ({ selectedColor, setSelectedColor }: IColorProps) => {
  return (
    <div className="color-container">
      {COLORS.map((color, index) => (
        <div key={index} style={{ backgroundColor: color }} className="color-main" onClick={() => setSelectedColor(color)}>
          {selectedColor === color && <FontAwesomeIcon icon={faCheck} className="color-check" />}
          {selectedColor === color && <div className="color-selected" style={{ borderColor: color }} />}
        </div>
      ))}
    </div>
  );
};

export default Colors;
