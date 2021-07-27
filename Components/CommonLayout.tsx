import CommonStyles from "../styles/CommonLayout.module.scss";
import { signOut, useSession } from "next-auth/client";
import Head from "../Components/Head";
import { faSignOutAlt, faPlus, faCaretLeft, faPenSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";

interface ICommonProps {
  children: React.ReactNode;
  title: string;
  returnUrl?: string;
  hideBreak?: boolean;
}

interface INavItem {
  name: string;
  icon: any;
  onClick?: () => void;
  reverse: boolean;
}

const CommonLayout = ({ children, title, returnUrl, hideBreak }: ICommonProps) => {
  const [session, setSession] = useSession();
  const router = useRouter();

  const NavItem = ({ name, icon, onClick, reverse }: INavItem) => {
    return (
      <button className={CommonStyles.signOutBtn} onClick={onClick} style={{ flexDirection: reverse ? "row-reverse" : "row" }}>
        {name}
        <FontAwesomeIcon icon={icon} className={CommonStyles.icon} />
      </button>
    );
  };

  const createFolder = async () => router.push("/dashboard/create");
  const uploadImg = async () => router.push(`/folder/${router.query.id}/upload`);
  const editFolder = async () => {
    router.push({
      pathname: "/dashboard/edit",
      query: { id: router.query.id, returnUrl: `/folder/${router.query.id}` },
    });
  };

  return (
    <div className={CommonStyles.body}>
      <Head title={title}></Head>

      <nav className={CommonStyles.nav}>
        <span className={CommonStyles.navLeft}>
          <h4 className="single-line-title">
            {session?.user?.name ? session?.user?.name : session?.user?.email}
            <span></span>
          </h4>
          {session?.user?.image && (
            <div className={CommonStyles.img}>
              <img src={session?.user?.image as string} alt="User's profile picture" loading="lazy" />
            </div>
          )}
        </span>
        <span className={CommonStyles.navRight}>
          {router.pathname !== "/dashboard" && returnUrl && (
            <>
              <NavItem name="Back" icon={faCaretLeft} reverse={true} onClick={() => router.push(returnUrl)} />
              <div className={CommonStyles.break}></div>
            </>
          )}

          {router.pathname === "/folder/[id]" && <NavItem name="Edit Folder" icon={faPenSquare} onClick={editFolder} reverse={false} />}
          {router.pathname === "/folder/[id]" && <NavItem name="Upload Image" icon={faPlus} onClick={uploadImg} reverse={false} />}
          {router.pathname === "/folder/[id]" && <NavItem name="Delete Image" icon={faTrash} reverse={false} />}
          {router.pathname === "/dashboard" && <NavItem name="Create Folder" icon={faPlus} onClick={createFolder} reverse={false} />}

          {!hideBreak && <div className={CommonStyles.break}></div>}

          <NavItem name="Sign Out" icon={faSignOutAlt} onClick={() => signOut({ callbackUrl: "/" })} reverse={false} />
        </span>
      </nav>

      <div className={CommonStyles.main}>{children}</div>
    </div>
  );
};

export default CommonLayout;
