import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CommonLayout from "../../../../../Components/CommonLayout";
import Error from "../../../../../Components/Error";
import { isOnlyNumber } from "../../../../../utils/lib/config";
import { GET } from "../../../../../utils/lib/http";
import { IDBImage } from "../../../../../utils/lib/intefaces";

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

  return (
    <CommonLayout title={"Image"} returnUrl={`/folder/${router.query.id}`}>
      {!error && <>{image?.id}</>}

      {error && <Error message={error} returnURL={`/folder/${router.query.id}`} />}
    </CommonLayout>
  );
};

export default ImageId;