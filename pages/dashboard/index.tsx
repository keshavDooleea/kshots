import { useSession } from "next-auth/client";
import { useEffect, useState } from "react";
import CommonLayout from "../../Components/CommonLayout";
import styles from "../../styles/Dashboard.module.scss";
import Folder from "../../Components/Folder";
import { GET } from "../../utils/lib/http";
import { IDBFolder } from "../../utils/lib/intefaces";
import { joinClasses } from "../../utils/lib/joinClasses";

interface IDashboardProps {
  title: string;
}

function Dashboard({ title }: IDashboardProps) {
  const [session, setSession] = useSession();
  const [folders, setFolders] = useState<IDBFolder[]>();
  const tabTitle = title || "Dashboard";
  // useAuthRedirect();

  // Todo: change to getInitialProps
  useEffect(() => {
    const getFolders = async () => {
      const foldersResponse = await GET<IDBFolder[]>("folder");
      setFolders(foldersResponse.data);
    };

    console.log(folders);

    getFolders();
  }, []);

  return (
    <CommonLayout title={tabTitle}>
      <div className={joinClasses("topDiv", styles.main)}>
        {folders?.map((folder, index) => (
          <div key={index} className={styles.folderMain}>
            <span className={styles.folderSurrounding}>
              <Folder color={folder.color} ccsClass={styles.icon}></Folder>
              <div className={styles.folderInfo}>
                <h4>{folder.name}</h4>
                <small>Created on {folder.createdat}</small>
              </div>
            </span>
          </div>
        ))}
      </div>
    </CommonLayout>
  );
}

export default Dashboard;
