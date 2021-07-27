import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CommonLayout from "../../../../../Components/CommonLayout";
import Error from "../../../../../Components/Error";
import { getDate, getDecodedBase64, isOnlyNumber } from "../../../../../utils/lib/config";
import { GET } from "../../../../../utils/lib/http";
import { IDBFolder, IDBImage } from "../../../../../utils/lib/intefaces";
import styles from "../../../../../styles/Image.module.scss";
import { faFolder, faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface ImageItemProp {
  itemName: string;
  property: string;
  icon?: IconProp;
  color?: string;
}

const ImageId = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [image, setImage] = useState<IDBImage>();
  const [folder, setFolder] = useState<IDBFolder>();

  useEffect(() => {
    if (!router.isReady) return;
    const { id, imageId } = router.query;

    const fetchImages = async () => {
      if (isOnlyNumber(id as string)) {
        setError(`Sorry! Folder with id "${id}" can not exist!`);
        return;
      }

      if (isOnlyNumber(imageId as string)) {
        setError(`Sorry! Image with id "${imageId}" can not exist!`);
        return;
      }

      const { code, message, data } = await GET<IDBImage>(`folder/${id}/image/${imageId}`);

      if (code === 200) {
        setError("");
        setImage(data);
      } else {
        setError(message);
      }
    };

    const fetchColor = async () => {
      const { code, message, data } = await GET<IDBFolder>(`folder/${id}`);

      if (code === 200) {
        setFolder(data);
        return;
      }

      setError(message);
    };

    fetchColor();
    fetchImages();
  }, [router.isReady]);

  const ImageItem = ({ itemName, property, icon, color }: ImageItemProp) => {
    return property ? (
      <div className={styles.item}>
        <h4>
          {icon && <FontAwesomeIcon icon={icon} className={styles.icon} style={{ color: color ? color : "auto" }} />}
          {itemName}
        </h4>
        <p className="subtitle">{property}</p>
      </div>
    ) : (
      <></>
    );
  };

  return (
    <CommonLayout title={"Image"} returnUrl={`/folder/${router.query.id}`} customBgColor={folder?.color}>
      {!error && (
        <>
          <div className={styles.main}>
            {(image?.title || image?.description) && (
              <div className={styles.left}>
                <ImageItem itemName="Title" property={image?.title as string} icon={faImage} color={folder?.color} />
                <ImageItem itemName="Folder Name" property={folder?.name as string} icon={faFolder} color={folder?.color} />
                <ImageItem itemName="Description" property={image?.description as string} />
              </div>
            )}
            <div className={styles.right}>
              {image && (
                <>
                  <img src={getDecodedBase64(image.src)} alt="Individual screenshot Image" />
                  <small className={styles.enlargeText}>Click to enlarge</small>
                  <h4 className={styles.dateText}>{getDate(image?.createdat as Date)}</h4>
                </>
              )}
            </div>
          </div>
        </>
      )}

      {error && <Error message={error} returnURL={`/folder/${router.query.id}`} />}
    </CommonLayout>
  );
};

export default ImageId;
