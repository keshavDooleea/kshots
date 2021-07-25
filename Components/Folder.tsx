import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { joinClasses } from "../utils/lib/joinClasses";
import styles from "../styles/Folder.module.scss";

interface IFolderProps {
  color: string;
  ccsClass?: string;
  children: any;
}

const Folder = ({ color, ccsClass, children }: IFolderProps) => {
  return (
    <>
      <span className={joinClasses(styles.folderSurrounding, "folder-main")}>
        <FontAwesomeIcon className={joinClasses("folder-icon", styles.icon as string)} style={{ color }} icon={faFolder} />
        <div className={styles.folderInfo} style={{ cursor: "pointer" }}>
          {children}
        </div>
      </span>
    </>
  );
};

export default Folder;
