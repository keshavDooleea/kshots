import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CommonLayout from "../../../Components/CommonLayout";
import Error from "../../../Components/Error";
import { isOnlyNumber } from "../../../utils/lib/config";
import { GET } from "../../../utils/lib/http";
import { IDBFolder, IDBImage } from "../../../utils/lib/intefaces";
import { joinClasses } from "../../../utils/lib/joinClasses";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../../styles/FolderDashboard.module.scss";

const FolderId = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [images, setImages] = useState<IDBImage[]>();
  const [folder, setFolder] = useState<IDBFolder>();

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;

    const fetchImages = async () => {
      if (isOnlyNumber(id as string)) {
        setError(`Sorry! Folder with id "${id}" can not exist!`);
        return;
      }

      let folderId = id;
      const imageResponse = await GET<IDBImage[]>(`image/${folderId}`);

      if (imageResponse.code === 200) {
        setError("");
        setImages(imageResponse.data);
      } else {
        setError("Sorry! An error occured while fetching images!");
      }

      const folderResponse = await GET<IDBFolder>(`folder/${folderId}`);

      if (folderResponse.code === 200) {
        setError("");
        setFolder(folderResponse.data);
      } else {
        setError("Sorry! An error occured while fetching current folder!");
      }
    };

    fetchImages();
  }, [router.isReady]);

  const calcImg = (src: string) => {
    // format is decode(realBase64String, 'base64')

    const startIndex = src.indexOf("(") + 1;
    const endIndex = src.indexOf(",");

    const encoded = src.substring(startIndex, endIndex);
    const base64 = `data:image/png;base64,${encoded}`;

    // update image.src object here

    return <img src={base64} alt="Screenshot Image" width={100} />;
  };

  return (
    <CommonLayout title={"Folder Dashboard"} returnUrl={"/dashboard"} showDelete={!folder?.islock as boolean} customBgColor={folder?.color}>
      <div className={styles.folderDashboard}>
        <div className="common-header">
          <span className="folder-name">
            {folder && (
              <>
                <FontAwesomeIcon className="icon" icon={faFolder} style={{ color: folder?.color }} />
                <h4 className="subtitle">{folder?.name}</h4>
              </>
            )}
          </span>
          {images && (
            <small className="subtitle">
              {images.length} {images.length > 1 ? "images" : "image"}
            </small>
          )}
        </div>

        <div className={joinClasses(styles.main)}>
          {!error && (
            <>
              {images?.map((image, index) => (
                <div key={index} className={styles.item}>
                  {/* <h1>{image.title}</h1> */}
                  {calcImg(image.src)}
                </div>
              ))}
            </>
          )}
        </div>
        {images?.length === 0 && (
          <p className="centerAbs">
            Press <strong>Upload Image</strong> to add a screenshot/photo
          </p>
        )}

        {error && <Error message={error} returnURL="/dashboard" />}
      </div>
    </CommonLayout>
  );
};

export default FolderId;
