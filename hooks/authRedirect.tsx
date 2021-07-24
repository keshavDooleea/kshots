import { useEffect } from "react";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";

const useAuthRedirect = () => {
  const [session, setSession] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) router.push("/");
  }, [session]);

  return {};
};

export default useAuthRedirect;
