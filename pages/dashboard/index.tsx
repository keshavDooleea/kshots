import { useEffect } from "react";
import { getSession, signOut, useSession } from "next-auth/client";
import useAuthRedirect from "../../utils/hooks/authRedirect";
import CommonLayout from "../../Components/CommonLayout";

export default function Dashboard() {
  const [session, setSession] = useSession();

  // useAuthRedirect();

  return <CommonLayout title="Dashboard">helooooo</CommonLayout>;
}
