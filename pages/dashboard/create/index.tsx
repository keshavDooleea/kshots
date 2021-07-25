import { useSession } from "next-auth/client";
import useAuthRedirect from "../../../utils/hooks/authRedirect";
import Dashboard from "..";
import Modal from "../../../Components/Modal";

export default function Create() {
  const [session, setSession] = useSession();

  //   useAuthRedirect();

  return (
    <>
      <Dashboard title="Create Folder"></Dashboard>
      <Modal returnURL="/dashboard">
        <p>helloooooooo</p>
      </Modal>
    </>
  );
}
