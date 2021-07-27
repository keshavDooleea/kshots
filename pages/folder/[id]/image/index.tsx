import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Image = () => {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    router.push(`/folder/${router.query.id}`);
  }, [router.isReady]);

  return <></>;
};

export default Image;
