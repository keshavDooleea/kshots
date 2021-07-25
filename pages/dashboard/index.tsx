import { useSession } from "next-auth/client";
import { MouseEvent, useEffect, useState } from "react";
import CommonLayout from "../../Components/CommonLayout";
import styles from "../../styles/Dashboard.module.scss";
import Folder from "../../Components/Folder";
import { GET } from "../../utils/lib/http";
import { IDBFolder } from "../../utils/lib/intefaces";
import { joinClasses } from "../../utils/lib/joinClasses";
import { faPenSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";

interface IDashboardProps {
  title: string;
  shouldFetchFolder: boolean;
}

function Dashboard({ title, shouldFetchFolder }: IDashboardProps) {
  const [session, setSession] = useSession();
  const [folders, setFolders] = useState<IDBFolder[]>();
  const tabTitle = title || "Dashboard";
  const shouldFetch = shouldFetchFolder ?? true;
  const router = useRouter();
  // useAuthRedirect();

  // Todo: change to getInitialProps
  useEffect(() => {
    const getFolders = async () => {
      const foldersResponse = await GET<IDBFolder[]>("folder");
      setFolders(foldersResponse.data);
    };

    if (shouldFetch) {
      getFolders();
    }
  }, []);

  const onFolderClicked = async (event: MouseEvent<HTMLDivElement>, id: number) => {
    const classList = (event.target as HTMLDivElement).classList;

    if (classList.contains("folder-edit-icon")) {
      router.push({
        pathname: "/dashboard/edit",
        query: { id },
      });

      return;
    }

    router.push({
      pathname: "/dashboard/create",
      // query: { id },
    });
  };

  return (
    <CommonLayout title={tabTitle}>
      <div className={joinClasses("topDiv", styles.main)}>
        {folders?.map((folder, index) => (
          <div key={index} className={styles.folderMain} onClick={(event) => onFolderClicked(event, folder.id)}>
            <Folder color={folder.color} ccsClass={styles.icon}>
              <span>
                <h4>{folder.name}</h4>
                <small>Created on {folder.createdat}</small>
              </span>
              <div className="folder-edit-icon">
                <FontAwesomeIcon className="icon" icon={faPenSquare} />
              </div>
            </Folder>
          </div>
        ))}
      </div>
    </CommonLayout>
  );
}

export default Dashboard;
