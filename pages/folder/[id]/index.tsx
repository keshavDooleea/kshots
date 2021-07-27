import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CommonLayout from "../../../Components/CommonLayout";
import Error from "../../../Components/Error";
import { isOnlyNumber } from "../../../utils/lib/config";
import { GET } from "../../../utils/lib/http";
import { IDBImage } from "../../../utils/lib/intefaces";
import { joinClasses } from "../../../utils/lib/joinClasses";

const FolderId = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [images, setImages] = useState<IDBImage[]>();

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;

    const fetchImages = async () => {
      if (isOnlyNumber(id as string)) {
        setError(`Sorry! Folder with id "${id}" can not exist!`);
        return;
      }

      let folderId = id;
      const response = await GET<IDBImage[]>(`image/${folderId}`);

      if (response.code === 200) {
        setError("");
        setImages(response.data);
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
    <CommonLayout title={"Folder Dashboard"} returnUrl={"/dashboard"}>
      <div className={joinClasses("topDiv")}>
        {error && <Error message={error} returnURL="/dashboard" />}
        {!error && (
          <div>
            {images?.map((image, index) => (
              <div key={index}>
                <h1>{image.title}</h1>
                {calcImg(image.src)}
              </div>
            ))}
          </div>
        )}
      </div>
    </CommonLayout>
  );
};

export default FolderId;
