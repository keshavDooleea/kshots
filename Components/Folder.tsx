import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { joinClasses } from "../utils/lib/joinClasses";

interface IFolderProps {
  color: string;
  ccsClass?: string;
}

const Folder = ({ color, ccsClass }: IFolderProps) => {
  return (
    <>
      <FontAwesomeIcon className={joinClasses("folder-icon", ccsClass as string)} style={{ color }} icon={faFolder} />
    </>
  );
};

export default Folder;
