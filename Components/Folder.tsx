import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IFolderProps {
  color: string;
}

const Folder = ({ color }: IFolderProps) => {
  return (
    <>
      <FontAwesomeIcon className="folder-icon" style={{ color }} icon={faFolder} />
    </>
  );
};

export default Folder;
