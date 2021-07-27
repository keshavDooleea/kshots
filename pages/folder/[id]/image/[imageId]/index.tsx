import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CommonLayout from "../../../../../Components/CommonLayout";
import Error from "../../../../../Components/Error";
import { getDate, getDecodedBase64, isOnlyNumber } from "../../../../../utils/lib/config";
import { GET } from "../../../../../utils/lib/http";
import { IDBImage } from "../../../../../utils/lib/intefaces";
import styles from "../../../../../styles/Image.module.scss";

interface ImageItemProp {
  itemName: string;
  property: string;
}

const ImageId = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [image, setImage] = useState<IDBImage>();

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

    fetchImages();
  }, [router.isReady]);

  const ImageItem = ({ itemName, property }: ImageItemProp) => {
    return property ? (
      <div className={styles.item}>
        <h4>{itemName}</h4>
        <p className="subtitle">{property}</p>
      </div>
    ) : (
      <></>
    );

    return <></>;
  };

  return (
    <CommonLayout title={"Image"} returnUrl={`/folder/${router.query.id}`}>
      {!error && (
        <>
          <div className={styles.main}>
            {(image?.title || image?.description) && (
              <div className={styles.left}>
                <ImageItem itemName="Title" property={image?.title as string} />
                <ImageItem itemName="Created On" property={getDate(image?.createdat as Date)} />
                <ImageItem itemName="Description" property={image?.description as string} />
              </div>
            )}
            <div className={styles.right}>{image && <img src={getDecodedBase64(image.src)} alt="Individual screenshot Image" />}</div>
          </div>
        </>
      )}

      {error && <Error message={error} returnURL={`/folder/${router.query.id}`} />}
    </CommonLayout>
  );
};

export default ImageId;
