import { useEffect } from "react";
import { getSession, signOut, useSession } from "next-auth/client";
import useAuthRedirect from "../../utils/hooks/authRedirect";
import CommonLayout from "../../Components/CommonLayout";

interface IDashboardProps {
  title: string;
}

export default function Dashboard({ title }: IDashboardProps) {
  const [session, setSession] = useSession();
  const tabTitle = title || "Dashboard";
  // useAuthRedirect();

  return <CommonLayout title={tabTitle}>helooooo</CommonLayout>;
}
