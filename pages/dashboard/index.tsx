import { useEffect } from "react";
import { signOut, useSession } from "next-auth/client";
import useAuthRedirect from "../../hooks/authRedirect";

export default function Dashboard() {
  const [session, setSession] = useSession();

  useAuthRedirect();

  return (
    <div>
      logged in as {session?.user?.name} {session?.user?.email}
      <br />
      <button onClick={() => signOut({ callbackUrl: "/" })}>Sign Out</button>
    </div>
  );
}
