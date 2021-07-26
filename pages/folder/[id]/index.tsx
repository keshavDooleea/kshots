import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CommonLayout from "../../../Components/CommonLayout";
import Error from "../../../Components/Error";
import { isOnlyNumber } from "../../../utils/lib/config";
import { GET } from "../../../utils/lib/http";
import { joinClasses } from "../../../utils/lib/joinClasses";

const FolderId = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;

    const fetchImages = async () => {
      if (isOnlyNumber(id as string)) {
        setError(`Sorry! Folder with id "${id}" can not exist!`);
        return;
      }

      // const response = await GET(`folder/${id}`);
    };

    fetchImages();
  }, [router.isReady]);

  return (
    <CommonLayout title={"efe"}>
      <div className={joinClasses("topDiv")}>{error && <Error message={error} returnURL="/dashboard" />}</div>
    </CommonLayout>
  );
};

export default FolderId;
